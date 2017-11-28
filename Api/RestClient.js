var request = require('request');

exports.getExchangeData = function getData(url, session, callback){

    request(url, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body,session);
        }
    });
};