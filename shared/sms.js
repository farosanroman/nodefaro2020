var request = require("request");
//var messages = require('./messages');
var config = require('./config'); 

var Sms = {
SendSMS: function (criteria, callback) {
    var fecha = new Date();
	fecha.setHours(fecha.getHours() - 4);
	var fjson = fecha.toJSON()
var sms=
{
    "celular": criteria.celular,
    "cedula":criteria.cedula,
    "mensaje":criteria.mensaje,
     "fecha": fjson,
    "fechaenvio":""
}


var url = "https://f18.azurewebsites.net/api/SmsMensajePost?code=vMa3mlCfOi8bQA4szedK8yK9g12ykawfQlYk4cE2COwCcsVxNPk4lA==";
        
        

        // Configure the request
        var options = {
            url: url,
            method: 'POST',
            //json: true,
            headers: {
                'content-type': 'application/json'
            },
           
            body: JSON.stringify(sms)
        }
        //console.log(options)
        request(options, function (error, res, smsmensaje) {
            //console.log(error)
            //console.log(flag)
            if (error) {
                callback(error);
            } else {
                smsmensaje=JSON.parse(smsmensaje)
                
                callback(null, smsmensaje);
            }
        })

    },
  
    
}


    
module.exports = Sms;
