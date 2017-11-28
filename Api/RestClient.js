var request = require('request');

exports.getCurrencyData = function getData(url, session, callback){

    request.get(url ,function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body,session);
        }
    });
};
