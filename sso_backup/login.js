'use strict';

var express = require('express');
var router = express.Router();
// var config = require('./config');
var loginservice = require('./login.service');

console.log('--------login.js-----------');

//单点登录请求
router.get('/sso',function (req,res) {
    console.log('-------login.js--单点登录请求---------');
    loginservice.sso(req,res);
});

//单点登出请求
router.get('/ssologout',function(req,res){
    console.log('-------login.js--单点登出请求---------');
    loginservice.ssologout(req,res);
});

module.exports = router;
