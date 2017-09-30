
var express = require('express');
var bodyParser = require('body-parser');        //解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理
var http = require('http');
var config = require('./config');

var app = express();

console.log('--------app.js-----------');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/callback', require('./callbacks'));
app.use('/login', require('./login'));
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

const server = http.createServer(app);

server.listen(config.port, function listening() {
    console.log('Listening on %d', server.address().port);
});

