
console.log('--------config.js-----------');

var config = {
    port: 8060,
    uis_sso_url: 'https://is.ecitizen-dev.sipac.gov.cn/samlsso?',
    pc_backend_api_host: 'http://resident-shell-backend.ecitizen-dev.sipac.gov.cn', //PC后端服务host
    app_backend_api_host: 'http://resident-app-backend.ecitizen-dev.sipac.gov.cn/ResidentAppBackend',//手机后端服务host
    aas_mobile_news_host: 'http://10.10.12.46:8088', //新闻服务host
    sso:{
        // issuerId:'AAS_JTEST',
        issuerId:'appEntFYTest3_v1.0.0',
        issuerIndex:'490822719',
        callback:'http://10.10.12.180:8060/callback/sso'
    },
};

module.exports = config;
