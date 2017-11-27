var builder = require('botbuilder');
// Some sections have been omitted

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/6486754a-2c49-4c81-9570-3bbaf04d095f?subscription-key=7ef3ebbb4dec46589735b6b131ab9534&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('TransferIntent', function (session, args) {
        //if (!isAttachment(session)) {
            var moneyEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'dollars');

            // Checks if the for entity was found
            if (moneyEntity) {
                session.send('You wish to transfer %s...', moneyEntity.entity);
               // Here you would call a function

            } else {
                session.send("Please try again with different phrasing");
            }
        //}
    }).triggerAction({
        matches: 'TransferIntent'
    });

    bot.dialog('ViewIntent', [
        // Insert delete logic here later
    ]).triggerAction({
        matches: 'ViewIntent'

    });

    bot.dialog('ChangePassword', [
        // Insert delete logic here later
    ]).triggerAction({
        matches: 'ChangePassword'

    });

}