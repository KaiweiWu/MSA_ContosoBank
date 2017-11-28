var rest = require('../API/Restclient');
var builder = require('botbuilder');


/*exports.displayCurrencyComparison = function getCurrencyData(currencyEntity, session){
    var url ='https://api.fixer.io/latest?symbols=' + currencyEntity[0] + ',' + currencyEntity[1];
    rest.getCurrencyData(url,session,displayCurrency);
}*/

exports.displayCurrency = function getCurrencyData(session){
    var url ='https://api.fixer.io/latest?base=NZD';
    rest.getCurrencyData(url,session,displayCurrency);
}

function displayCurrency(message, session) {
    var attachment = [];
    var json = JSON.parse(message);
    
    for (var i in json.rates) {
        attachment.push(json.rates[i]);
    }
    session.send(attachment);
}