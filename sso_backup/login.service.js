var config = require('./config');
var common = require('./common');
console.log('--------login.service.js-----------');

var login = {
    /*sso单点登录*/
    sso: function (req, res) {
        //获取登录报文SAMLLoginResponse
        console.log('------进入单点登录---------');
        var url = config.pc_backend_api_host  // PC后端服务host
            + '/ResidentShellBackend/samlRequest/login?issueId=' + config.sso.issuerId
            + '&issueIndex=' + config.sso.issuerIndex
            + '&callback=' + config.sso.callback;   // 后端
        console.log(url)
        console.log('------/|\\-----url---------------');
        var header = {'ignoreSessionIndex': common.generateCode(16)};
        console.log(header);
        console.log('------/|\\-----header---------------');
        var result = common.rest_api_get(url, header);
        console.log(result);
        console.log('------/|\\-----result---------------')
        var loginurl = config.uis_sso_url
            + 'SAMLRequest=' + result.SAMLLoginResponse   //SAML请求
            + '&RelayState=123';  // 中继状态
        console.log(loginurl);
        console.log('-------/|\\----loginurl---------------')
        res.redirect(loginurl)  //重定向到登录
    },
    /*sso单点登出 */
    ssologout: function (req, res) {
        //获取登出报文SAMLLogoutResponse
        console.log('------进入sso单点登出---------');
        var url = config.pc_backend_api_host   // PC后端服务host
            + '/ResidentShellBackend/samlRequest/logout?issuerId=' + config.sso.issuerId
            + '&username=' + req.query.username;
        var header = {'sessionIndex': req.query.sessionIndex};
        console.log(url);
        console.log('------/|\\-----url---------------');
        var result = common.rest_api_get(url, header);
        var logouturl = config.uis_sso_url + 'SAMLRequest=' + result.SAMLLogoutResponse + '&RelayState=123';
        res.redirect(logouturl);   //重定向到登出
    }
}

module.exports = login;