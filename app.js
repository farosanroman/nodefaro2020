const express=require('express');
const app=express();
const config = require('./shared/config'); 
var twitter = require('./shared/twitter.js');
var mail = require('./shared/mail.js');
var sms = require('./shared/sms.js');
var geojson = require('./shared/geojson.js');
//const SQL = require('./shared/sqlmodule');
//queries=require('./shared/queries');
//node app.js   <<<<<<<<<
//oJo Application Settings WEBSITE_NODE_DEFAULT_VERSION 6.9.1  oJo oJo

app.use(express.json())
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.send(200);
    }
    else {
        next();
    }
};


app.use(allowCrossDomain);
app.get('/',(req,res)=>{
  res.send("NodeFaro v0.0.2")
  //var ppa=queries.f();
  //console.log(ppa)
  var defensores=[
      {cedula:"V3664204",celular:"04126340692",mail:"ppazpurua@gmail.com",twt:"pazpurua"},
      {cedula:"V3664204",celular:"04126340692",mail:"ppazpurua@gmail.com",twt:"pazpurua"},
    ]
});
app.get('/parroquias',(req,res)=>{
  var criteria=""
  geojson.getPARROQUIAS(criteria, function (err, results) {
    //res.end(results);     
    res.end(JSON.stringify(results));
    })
  
});
app.get('/mailverify',(req,res)=>{
  console.log("aaaaaaaa")
  //var criteria = { "mail": request.query.mail, "cedula": request.query.cedula };
  var criteria={ "mail": "ppazpurua@gmail.com", "cedula": "V33332" };
  mail.mailverify(criteria, function (err, results) {
      res.end(JSON.stringify(results));
  })
  
});
app.get('/mailverify2', function (request, response) {
 // var criteria = { "mail": request.query.mail, "cedula": request.query.cedula };
  var criteria=""
  response.end(JSON.stringify({id:1}));
  // mail.mailverify(criteria, function (err, results) {
  //     response.end(JSON.stringify(results));
  // })

}),
app.get('/verifyMAIL2', function (request, response) {
    var criteria = { "id": "123@@asd" }
    //var id = "45031619"
    //de pazpurua a poliflash
    //morocho64
    mail.verify(criteria, function (err, results) {
        
        response.end(JSON.stringify(results));
    })
});
app.get('/getUSER', function (criteria, response) {
    var criteria={"key":7,"cedula":"V3664204","celular":"4126340692","mail":"ppazpurua@gmail.com","twt":"pazpurua","mensaje":"Prueba de Concepto SMS, TWT, MAIL"}
   
    //var criteria = { "id": 123 }
    //var id = "45031619"
    //de pazpurua a poliflash
    //morocho64
    var screen_name=criteria.twt
    //screen_name='pazpurua'
    twitter.getUSER(screen_name, function (err, results) {
        var id_str=results.id_str
        console.log(id_str)
        response.end(JSON.stringify(results));
    })
});

  
app.get('/SendMAILSMSTWT', function (criteria, response) {
   var criteria={"key":7,"cedula":"V3664204","celular":"4126340692","mail":"ppazpurua@gmail.com","twt":"pazpurua","encabezado":"Prueba de Concepto II","mensaje":"Prueba de Concepto SMS, TWT, MAIL"}
    //var criteria={"key":7,"cedula":"V888888","celular":"4142863817","mail":"franciscojcastrom@gmail.com","twt":"fcastrom","mensaje":"Te esperan 8.000 observadore"}
    //var criteria={"key":7,"cedula":"V888888","celular":"4264020509","mail":"gboyerizo@gmail.com","twt":"gboyerizo","mensaje":"Te esperan 8.000 observadore"}
   
    var res=[]
    
    mail.SendGrid(criteria, function (err, resultsmail) {
      res.push(resultsmail)
      //sms.SendSMS(criteria, function (err, results) {
      //  res.push(results);
      var screen_name=criteria.twt;
      twitter.getUSER(screen_name, function (err, resultstwt) {
         console.log("resultstwt")
         console.log(resultstwt)
         console.log("resultstwt")
         
           var id_str=resultstwt.id_str
          console.log(id_str)
          res.push(resultstwt)
          var recipientid={recipient_id:id_str,texto:criteria.mensaje}
          if (recipientid!='0'){
             twitter.send_direct_message(recipientid, function (err, resultsdm) {
                res.push(resultsdm)
                response.end(JSON.stringify(res));
             })
          }else{
            response.end(JSON.stringify(res));
          }
         
      })
      
 //})
})//send grid

      
  }); 
  app.get('/GetUsername', function (criteria, response) {
    var criteria={"key":7,"cedula":"V3664204","celular":"4126340692","mail":"ppazpurua@gmail.com","twt":"pazpurua","encabezado":"Prueba de Concepto II","mensaje":"Prueba de Concepto SMS, TWT, MAIL"}
     //var criteria={"key":7,"cedula":"V888888","celular":"4142863817","mail":"franciscojcastrom@gmail.com","twt":"fcastrom","mensaje":"Te esperan 8.000 observadore"}
     //var criteria={"key":7,"cedula":"V888888","celular":"4264020509","mail":"gboyerizo@gmail.com","twt":"gboyerizo","mensaje":"Te esperan 8.000 observadore"}
    
     var res=[]
     
       var screen_name=criteria.twt;
       twitter.getUSER(screen_name, function (err, resultstwt) {
          console.log("resultstwt")
          console.log(resultstwt)
          console.log("resultstwt")
          
            var id_str=resultstwt.id_str
           console.log(id_str)
           res.push(resultstwt)
           var recipientid={recipient_id:id_str,texto:criteria.mensaje}
           if (recipientid!='0'){
            response.end(JSON.stringify(resultstwt));
           }else{
             response.end(JSON.stringify(res));
           }
          
       })
       

       
   }); 
 
  app.post('/SendMAILSMSTWT', function (request, response) {
    //var criteria={"key":7,"cedula":"V3664204","celular":"4126340692","mail":"ppazpurua@gmail.com","twt":"pazpurua","mensaje":"Prueba de Concepto SMS, TWT, MAIL"}
    var criteria=request.body;
    
    
    var res=[]
    
          mail.SendGrid(criteria, function (err, resultsmail) {
            res.push(resultsmail)
            //sms.SendSMS(criteria, function (err, results) {
            //  res.push(results);
            /*
            var screen_name=criteria.twt;
            twitter.getUSER(screen_name, function (err, resultstwt) {
               console.log("resultstwt")
               console.log(resultstwt)
               console.log("resultstwt")
               
                 var id_str=resultstwt.id_str
                console.log(id_str)
                res.push(resultstwt)
                var recipientid={recipient_id:id_str,texto:criteria.mensaje}
                if (recipientid!='0'){
                   twitter.send_direct_message(recipientid, function (err, resultsdm) {
                      res.push(resultsdm)
                      response.end(JSON.stringify(res));
                   })
                }
               
            })
            */
            
       //})
     })//send grid
    
      
  });      
app.get('/SendSMS', function (request, response) {
   // var criteria={"key":7,"cedula":"V3664204","celular":"4126340692","mail":"ppazpurua@gmail.com","twt":"pazpurua","mensaje":"Prueba de Concepto 2 SMS, TWT, MAIL"}
    var criteria={"key":7,"cedula":"V888888","celular":"4142863817","mail":"franciscojcastrom@gmail.com","twt":"@fcastrom","encabezado":"ENVAZEADII XXX","mensaje":"Te esperan 80.000 observadore"}
   
    sms.SendSMS(criteria, function (err, results) {
         console.log("app")
         console.log(results)
          response.end(JSON.stringify(results));
     })
      
  });
app.get('/SendGrid', function (request, response) {
    var criteria={"key":7,"cedula":"V3664204","celular":"4126340692","mail":"ppazpurua@gmail.com","twt":"pazpurua","encabezado":"ENVAZEADII XXX","mensaje":"Prueba de Concepto SMS, TWT, MAIL"}
   
  mail.SendGrid(criteria, function (err, results) {
       console.log("finn")
        response.end(JSON.stringify(results));
   })
    
});
app.get('/DM', function (request, response) {
   // var criteria = { "recipient_id": "45031619", "text": "Sr/Srta millenial. Se quiere unir a este futurista grupo de activismo politico?" }
    //160334298
  var id = "45031619"
    
    // id = "92530391"//cartaya
    
   // id = "51886687"//francisco castro
    //id = "1018815783873449985"//poliflsh
    //id="791737378083921921"; //faro tweet
    var T = "Sr/Srta millenial. Se quiere unir a este futurista grupo de activismo politico?\nEn Libertador\n🙋‍https://twitter.com/messages/compose?recipient_id=45031619&welcome_message_id=1101849099102552068";
    T = {
      "event": {
          "type": "message_create",
          "message_create": {
              "target": {
                  "recipient_id": 45031619
              },
              "message_data": {
                  "text": "La cedula V3678737 corresponde al Elector Ramon Jose Gomez Arriaga.\n Vota en el Colegio Simon Bolivar\n  del Estado Miranda, Municipio Baruta, Parroquia Las Minas ",
                  "quick_reply": {
                      "type": "options",
                      "options": [

                          {
                              "label": "✔️CORRECTO y 👍CONFORME",
                              "description": "Esta correocto y estoy conforme con mi centro de votación",
                              "metadata": "GUAIDO4"
                          },
                          {
                              "label": "✔️CORRECTO e 🤚INCONFORME",
                              "description": "Estoy registrado pero quiero mudarme a otro centro de votación",
                              "metadata": "GUAIDO4"
                          },
                          {
                              "label": "❌INCORRECTO",
                              "description": "No es mi centro de votacion tradicional",
                              "metadata": "GUAIDO4"
                          },
                          {
                              "label": "✔️CORRECTO y vivo en el 🌐EXTERIOR",
                              "description": "Estoy registrado pero quiero registrarme en otro centro de votación",
                              "metadata": "GUAIDO4"
                          },
                          {
                              "label": "\uD83D\uDC48 Volver",
                              "description": "Volver",

                              "metadata": "GUAIDO"
                          }
                      ]
                  }
              }
          }
      }
  };
        var criteria={recipient_id:id,texto:T}
        for (i = 0; i < 5; i++) { 
          twitter.send_direct_message(criteria, function (err, results) {
            
            response.end(JSON.stringify(results));
        })
        }
        
    
});
const port=process.env.PORT || 4730
app.listen(port,()=>console.log(`Listening on Port ${port}...`));