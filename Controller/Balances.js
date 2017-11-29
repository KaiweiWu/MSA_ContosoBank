var rest = require('../API/Restclient');

exports.showBalances = function getBalances(session, username){
    var url = 'http://bankbot2.azurewebsites.net/tables/Bankbot';
    rest.getBalances(url, session, username, handleBalanceResponse)
};

function handleBalanceResponse(message, session, username) {
    var balanceResponse = JSON.parse(message);
    var balanceArray = [];
    for (var index in balanceResponse) {
        var usernameReceived = balanceResponse[index].username;
        var savingsBalance = balanceResponse[index].savings;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            balanceArray.push(savingsBalance);
        }        
    }
    
    // Print all favourite foods for the user that is currently logged in
    session.send("%s, your bank balance is: %s", username, balanceArray);                
    
}

exports.sendNewAccount = function postNewAccount(session, username, balance){
    var url = 'http://bankbot2.azurewebsites.net/tables/Bankbot';
    rest.postNewAccount(url, username, balance);
};

exports.transferMoney = function updateBalance(session, amount, username, recipient){
    var url  = 'http://bankbot2.azurewebsites.net/tables/Bankbot';

    rest.getBalances(url, session, username, function(message, session, username){
     var balances = JSON.parse(message);

        for(var i in balances) {

            if (balances[i].username === username) {
                var updatedVal = balances[i].savings - parseInt(amount.slice(2));

                rest.updateBalance(url,session,username,updatedVal,balances[i].id,handleResponse)

            }
        }
    });

    rest.getBalances(url, session, recipient, function(message, session, recipient){
    var balances = JSON.parse(message);

        for(var i in balances) {

            if (balances[i].username === recipient) {
                var updatedVal = balances[i].savings + parseInt(amount.slice(2));

                rest.updateBalance(url,session,recipient,updatedVal,balances[i].id,handleResponse)

            }
        }
    });
};

function handleResponse(body, session, amount, username, recipient){
        console.log('Done');
}