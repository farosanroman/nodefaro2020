var request = require("request");
//var messages = require('./messages'); 

var config = require('./config'); 
       // var gsilva = "160334298"
       // var pazpurua = "45031619"
       // var aleta ="936962492823232512"
var twitter_oauth = {
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    token: config.access_token,
    token_secret: config.access_token_secret
}
var Twt = {
   
    getUSER: function (screen_name, callback) {
        //screen_name = screen_name.replace(/@/g, "");
        var request_options = {
            url: 'https://api.twitter.com/1.1/users/lookup.json?screen_name=' + screen_name,
            oauth: twitter_oauth,
            json: true,
            headers: {
                'content-type': 'application/json'
            },
        }
        var ppa = 1
        // POST request to send Direct Message
        request.get(request_options, function (error, response, user) {
            console.log(user)
            var twt;
            var code = 1;
            if (user.errors == undefined) {
                code = 1;
            } else {
                code = user.errors[0].code;//17
            }
            //var twitterJSON = JSON.parse(user)
            if (error) {
                callback(error);
            } else {
                if (code == 17) {
                    twt = { "tipo": "twitter","id_str":"0", "numero": "@" + screen_name, "valid": false, "principal": false, "verificado": true, "screen_name": "", "name": "Twitter No Existe", "location": "", "image": "images/twitter.jpg", "following": false,"can_dm":false, "target": config.screen_name }
                    callback(null, twt);
                } else {
                    twt = { "tipo": "twitter","id_str":user[0].id_str, "numero": "@" + screen_name, "valid": true, "principal": true, "verificado": true, "screen_name": screen_name, "name": user[0].name, "location": user[0].location, "image": user[0].profile_image_url_https, "following": false,"can_dm":false, "target": config.screen_name}

                    var request_options2 = {
                        url: 'https://api.twitter.com/1.1/friendships/show.json?source_screen_name=' + screen_name + '&target_screen_name=pazpurua',
                        oauth: twitter_oauth,
                        json: true,
                        headers: {
                            'content-type': 'application/json'
                        },
                    }
                    request.get(request_options2, function (error, response, amigos) {
                        console.log("amigos...................")
                        console.log(amigos)
                        
                        var flagfollowing = amigos.relationship.source.following;
                        twt.following = flagfollowing;  
                        twt.can_dm=amigos.relationship.source.can_dm;
                        callback(null, twt);
                    })
                    //twt = { "tipo": "twitter", "numero": screen_name, "valid": false, "principal": false, "verificado": true, "screen_name": "", "name": "", "location": "", "image": "" }

                }

            }

        })
    },
    getSCREEN_NAME:function (username,callback){

    
    },
    send_direct_message: function (criteria, callback) {
        var dm = {
            "event": {
                "type": "message_create",
                "message_create": {
                    "target": {
                        "recipient_id": criteria.recipient_id
                    },
                    "message_data": {
                        "text": criteria.texto,

                    }
                }
            }
        }
        var request_options = {
            url: 'https://api.twitter.com/1.1/direct_messages/events/new.json',

            oauth: twitter_oauth,
            json: true,
            headers: {
                'content-type': 'application/json'
            },
            body: dm
        }


        // POST request to send Direct Message
        request.post(request_options, function (error, response, body) {
            if (error) {
                console.log("ERROR en twitter.send_direct_message" + error)
                callback(error);
            } else {
                console.log("OK DM" + JSON.stringify(body))
                callback(null, body);
            }

            
        })
    },
}
    module.exports = Twt;