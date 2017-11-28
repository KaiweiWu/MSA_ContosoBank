var rest = require('../API/Restclient');
var builder = require('botbuilder');


/*exports.displayCurrencyComparison = function getCurrencyData(currencyEntity, session){
    var url ='https://api.fixer.io/latest?symbols=' + currencyEntity[0] + ',' + currencyEntity[1];
    rest.getCurrencyData(url,session,displayCurrency);
}*/

exports.displayCurrency = function getExchangeData(session){
    var url ='https://openexchangerates.org/api/latest.json?app_id=5deb0687deab4609922956518527fa53';
    rest.getExchangeData(url,session,displayCurrency);
}

function displayCurrency(message, session) {
    var attachment = [];
    var json = JSON.parse(message);
    

    for (var i in json.rates) {
        var card = new builder.HeroCard(session)
            .title(json.rates[i]);
        attachment.push(card);

    }

    var message = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachment);
    session.send(message);
}