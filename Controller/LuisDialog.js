var builder = require('botbuilder');
var currency = require('./Currency');
var balance = require('./Balances');
var qna = require('./QnAMaker');
// Some sections have been omitted

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/6486754a-2c49-4c81-9570-3bbaf04d095f?subscription-key=7ef3ebbb4dec46589735b6b131ab9534&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('TransferIntent', [
        function (session, args, next) {
            var moneyEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'dollars');

            if (moneyEntity) {
                session.send('You wish to transfer %s...', moneyEntity.entity);
                session.conversationData["amount"] = moneyEntity.entity;
                next();

            } else {
                session.send("Please try again with different phrasing");
            }
            
        },
        function (session, args, next) {
            session.dialogData.args = args || {};
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");
            } else {
                next();
            }
        },
        function (session, results, next) {

            if (results.response) {
                session.conversationData["username"] = results.response;
            }

            builder.Prompts.text(session, "Enter the recipient for this transfer");
        },
        function (session, results, next) {
            if (results.response) {
                session.conversationData["recipient"] = results.response;
            }
            session.send("We can now proceed...");

        }
    ]).triggerAction({
        matches: 'TransferIntent'
    });

    bot.dialog('ViewIntent', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            //if (!isAttachment(session)) {

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Retrieving bank balance");
                balance.showBalances(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            //}
        }
    ]).triggerAction({
        matches: 'ViewIntent'
    });

    bot.dialog('ChangePassword', [
        // Insert delete logic here later
    ]).triggerAction({
        matches: 'ChangePassword'

    });

    bot.dialog('RegisterAccount', [
        function (session, args, next) {
            session.dialogData.args = args || {};        

            builder.Prompts.text(session, "Enter a username to setup your account.");                
            next(); 
            
        },
        function (session, results, next) {

            if (results.response) {
                session.conversationData["username"] = results.response;
            }
    
            session.send('Creating a new account for you...');
            balance.sendNewAccount(session, session.conversationData["username"], 0); // <-- LINE WE WANT
            session.send('Done!');
        }
    ]).triggerAction({
        matches: 'RegisterAccount'

    });

    bot.dialog('ViewCurrency', function (session, args) {
        //if (!isAttachment(session)) {
            var currencyEntity = builder.EntityRecognizer.findAllEntities(args.intent.entities, 'currency');

            // Checks if the for entity was found
            if (currencyEntity.length == 2) {
                session.send('Checking specified currency rates...');
                currency.displayCurrencyComparison(currencyEntity, session);

            } else {
                session.send('Showing sample currency rates...');
                currency.displayCurrency(session);
            }
        //}
    }).triggerAction({
        matches: 'ViewCurrency'

    });

    bot.dialog('QnA', [
        function (session, args, next) {
            session.dialogData.args = args || {};
            builder.Prompts.text(session, "What is your question?");
        },
        function (session, results, next) {
            qna.talkToQnA(session, results.response);
        }
    ]).triggerAction({
         matches: 'QnA'
    });

}