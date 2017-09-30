var express = require('express');
var router = express.Router();
var config = require('./config');
var common = require('./common');
console.log('-----newlogin----');

/*单点登录请求*/
router.get('/sso', function (req, res) {
    //获取登录报文SAMLLoginResponse
    var url = config.pc_backend_api_host
        + '/ResidentShellBackend/samlRequest/login?issueId=' + config.sso.issuerId
        + '&issueIndex=' + config.sso.issuerIndex
        + '&callback=' + config.sso.callback;
    var header = {'ignoreSessionIndex':common.generateCode(16)};
    // var header = {'ignoreSessionIndex':'asdfghjkl1234567'};
    var result = common.rest_api_get(url,header);
    var loginurl = config.uis_sso_url
        + 'SAMLRequest=' + result.SAMLLoginResponse
        + '&RelayState=123';
    console.log(loginurl);
    res.redirect(loginurl);
});

/*单点登出请求*/
router.get('/ssologout', function (req, res) {
    //获取登出报文SAMLLogoutResponse
    // loginservice.ssologout(req, res);
    console.log('------登出--get----');
    var url = config.pc_backend_api_host   // PC后端服务host
        + '/ResidentShellBackend/samlRequest/logout?issuerId=' + config.sso.issuerId
        + '&username=' + req.query.username;
    var header = {'sessionIndex': req.query.sessionIndex};
    console.log(header);
    console.log('------/|\\-----header---------------');
    var result = common.rest_api_get(url, header);
    var logouturl = config.uis_sso_url + 'SAMLRequest=' + result.SAMLLogoutResponse + '&RelayState=123';
    res.redirect(logouturl);   //重定向到登出
});

module.exports = router;
