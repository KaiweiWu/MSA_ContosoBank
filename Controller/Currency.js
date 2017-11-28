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
    var json = JSON.parse(message);

    var currencyRates = json.rates;
    var currencyItems = [];
    var currencyView = ["AUD", "NZD", "USD", "HKD", "BSD"]
    
    for(var i = 0; i < currencyView.length; i++){
        var currencyItem = {};
        currencyItem.title = currencyView[i];
        currencyItem.value = currencyRates[currencyView[i]].toString();
        currencyItems.push(currencyItem);
    }
    

session.send(new builder.Message(session).addAttachment({
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "0.5",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "Currency rate sample",
                            "size": "large"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Your selected currency"
                        }
                    ]
                },
                {
                    "type": "Container",
                    "spacing": "none",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "auto",
                                    "items": [
                                        {
                                            "type": "FactSet",
                                            "facts": currencyItems
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }));
}