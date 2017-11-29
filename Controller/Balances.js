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