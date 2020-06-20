var request = require("request");
//var messages = require('./messages');
var config = require('./config'); 

var Mail = {
SendGrid: function (criteria, callback) {
//console.log(criteria)
var ppa=1;
var mail=
{"id":"V3664204*11",
"message":{"personalizations":
     [
          {"to":[{"email":criteria.mail}]}
     ],
"from":{"email":"defensoresdelademocracia2018@gmail.com"},
"subject":"📣 "+criteria.encabezado,
"content":[{"type":"text/plain","value":criteria.mensaje}]
}
}
console.log(JSON.stringify(criteria.key+" "+criteria.mail+"\n"))
//var url = "https://f19.azurewebsites.net/api/SendGrid?code=dvmuzUodqLRqz4pJ4k17k0fpgDGZUu49adRciM7QxbABL6gQ84VsnA==";
var url="https://geofaro.azurewebsites.net/api/SendGrid?code=e8AEs0bJiFz17aYkazsayrsaoVdrtArxrnpsw8BjaEgKhVIwTYBJHQ=="
          // Configure the request
        var options = {
            url: url,
            method: 'POST',
            //json: true,
            headers: {
                'content-type': 'application/json'
            },
           
            body: JSON.stringify(mail)
        }
        //console.log(options)
        request(options, function (error, res, flag) {
         //  console.log("ppa")
            //console.log(JSON.stringify(flag))
            if (error) {
                callback(error);
                console.log("error")
         
            } else {
               // callback(null, JSON.parse(flag));
               callback(null, {"flag":1})
               console.log("ok")
         
            }
        })

    },
    verify:function(mail,callback){
        var CloudmersiveValidateApiClient = require('cloudmersive-validate-api-client');
 
        var defaultClient = CloudmersiveValidateApiClient.ApiClient.instance;
         
        // Configure API key authorization: Apikey
        var Apikey = defaultClient.authentications['8af20ca2-3637-4466-8020-dec91d76eaf6'];
        //Apikey.apiKey = "8af20ca2-3637-4466-8020-dec91d76eaf6";
        callback(null, {flak:"ok"})
    }
    
}


    
module.exports = Mail;




/*
module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
  
    var message=req.body.message
    context.log(JSON.stringify(req.body.message))
    var message2 = {
         "personalizations": [ { "to": [ { "email": "ppazpurua@gmail.com" } ] } ],
        from: { email: "ppazpurua@gmail.com" },        
        subject: "Azure news",
        content: [{
            type: 'text/plain',
            value: 'Hola'
        }]
    };

    context.done(null, message);

}
 headers: {
                'content-type': 'application/json'
            },
{
      "name": "$return",
      "type": "sendGrid",
      "direction": "out",
      "apiKey": "APIKEYFARO"
    }
*/