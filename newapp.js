
var express = require('express');
var app = express();
var http = require('http');
var config = require('./config');

var bodyparser = require('body-parser');
app.use(bodyparser.json());  //添加json解析器
app.use(bodyparser.urlencoded({    extended: false}));
//extended为false表示使用querystring来解析数据，这是URL-encoded解析器

app.use('/callback', require('./callbacks'));

app.use('/login', require('./newlogin'));

const server = http.createServer(app);

server.listen(config.port, function () {
    console.log('Listening on %d', server.address().port);
});
