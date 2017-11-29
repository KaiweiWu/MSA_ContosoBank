var request = require('request');

exports.getExchangeData = function getData(url, session, callback){

    request.get(url, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body,session);
        }
    });
};

exports.getBalances = function getData(url, session, username, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, username);
        }
    });
};

exports.postNewAccount = function getData(url, username, balance){
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        },
        json: {
            "username" : username,
            "savings" : balance
        }
      };
      
      request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        }
        else{
            console.log(error);
        }
      });
};

exports.postQnAResults = function getData(url, session, question, callback){
  var options = {
      url: url,
      method: 'POST',
      headers: {
          'Ocp-Apim-Subscription-Key': '54a763c4160c4abb834ae7588b3adab1',
          'Content-Type':'application/json'
      },
      json: {
          "question" : question
      }
    };

    request(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
          callback(body, session, question);
      }
      else{
          console.log(error);
      }
    });
};