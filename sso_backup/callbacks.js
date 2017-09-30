var express = require('express');
var router = express.Router();
var config = require('./config');
var common = require('./common');
console.log('--------callback.js-----------');


router.post('/sso', function (req, res) {     // 向 ‘/sso’ 提交要被处理的数据
    console.log('--------callbacks.js-- router.post /sso ---------');
    var sendobj = {};
    var SAMLResponse = req.body.SAMLResponse;   //登录报文 SAMLLoginResponse  SAML响应
    var relayState = req.body.RelayState;     // RelayState 包含用户尝试访问的 WebApp1 应用程序的编码网址
    var userid = req.body.uid;                //用户id
    sendobj.path = 'login';      //登录
    sendobj.userid = userid;
    sendobj.relayState = relayState;
    if (SAMLResponse && userid && relayState) {
        var decodeResponse = new Buffer(SAMLResponse, 'base64').toString();  //基于base64 编码转为二进制数据字符串化
        if (decodeResponse.indexOf('Success') > 0) {   // 报文 用户id 获取成功
            var username = decodeResponse.match(/<saml2\:NameID [^>]*>(.*)<\/saml2\:NameID>/i)[1];   //正则 处理
            var sessionIndex = decodeResponse.match(/SessionIndex="(.*)"/i)[1];
            // var sessionIndex = '123456789';
            console.log(sessionIndex)
            console.log('-/|\\--sessionIndex--')
            //获取用户基本信息
            var uresult = getuserprofile(sessionIndex, userid);  //  根据userid获取用户基本信息
            if (uresult.result && uresult.code == 200) {
                console.log('获取成功')
                sendobj.userinfo = uresult.response;     //  获取成功
            }
            sendobj.username = username;             //存储
            sendobj.sessionIndex = sessionIndex;
            sendobj.result = true;
        } else {
            sendobj.result = false;
        }
    } else {
        sendobj.result = false;
    }
    console.log('-\\|/-发送信息--')
    console.log(sendobj);
    console.log('-/|\\--发送信息--')
    // 判断clientid，发送用户会话和基本信息
    /* var clients = global.clients;    // ???????????????????????????????????????
     for(var i in clients){
       if(clients[i].id == relayState && clients[i].ws.readyState == WebSocket.OPEN){
         clients[i].ws.send(JSON.stringify(sendobj));      //  发送用户会话和基本信息
         break;
       }
     }*/
    res.end('');
})

//登出 ??????????????????????????????????????????
router.post('/ssologout', function (req, res) {
    // console.log(req.body);
    console.log('------登出------');
    var sendobj = {};
    var SAMLResponse = req.body.SAMLResponse;
    var relayState = req.body.RelayState;
    sendobj.path = 'logout';  //登出
    sendobj.relayState = relayState;
    if (SAMLResponse && relayState) {
        var decodeResponse = new Buffer(SAMLResponse, 'base64').toString();
        console.log(decodeResponse)
        console.log('-/|\\--decodeResponse--');
        var status = decodeResponse.match(/status:(.*)"/i)[1];
        console.log(status);
        console.log('-/|\\--status--');
        sendobj.result = status == 'Success' ? true : false;
    } else {
        sendobj.result = false;
    }
    //判断clientid，发送用户会话和基本信息
    /* var clients = global.clients;
     for(var i in clients){
         if(clients[i].id == relayState && clients[i].ws.readyState == WebSocket.OPEN){
             clients[i].ws.send(JSON.stringify(sendobj));
             break;
         }
     }*/
    console.log('-\\|/-发送信息--');
    console.log(sendobj);
    console.log('-/|\\--发送信息--');
    res.end('');
});

/*根据userid获取用户基本信息*/
/*原callback.service.js中内容*/
function getuserprofile(sessionIndex) {
    var url = config.app_backend_api_host + '/user/phoneAndEmail';
    var headers = {'sessionIndex': sessionIndex};
    var result = common.rest_api_get(url, headers);
    return result;
}

module.exports = router;

