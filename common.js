var request = require('sync-request');
var config = require('./config.js');
function debug(method, url, headers, result, body){
    if(config.debug) {
        console.log('【' + method + ' ' + url + '】:');
        switch (method) {
            case 'GET':
            case 'DELETE':
                var index = url.indexOf('?');
                index == -1 ? console.log('【query】: null') : console.log('【query】: ' + url.substring(index + 1));
                break;
            case 'POST':
            case 'PUT':
                console.log('【body】: ' + JSON.stringify(body));
                break;
        }
        console.log('【headers】: ' + JSON.stringify(headers));
        console.log('【result】: ' + JSON.stringify(result));
    }
}
module.exports.rest_api_get = function (url, headers) {
    try {
        var jsonString = request('GET', url, {'headers': headers});
        var result = JSON.parse(jsonString.body.toString('utf8'));
        result.statusCode = jsonString.statusCode;
        debug('GET', url, headers,result);
        return result;
    } catch (e) {
        console.log(e);
        return {'result': false, 'message': '接口调用失败'};
    } finally {

    }
}

module.exports.rest_api_del = function (url, headers) {
    try {
        var jsonString = request('DELETE', url, {'headers': headers});
        var result = JSON.parse(jsonString.body.toString('utf8'));
        result.statusCode = jsonString.statusCode;
        debug('DELETE', url, headers, result);
        return result;
    } catch (e) {
        console.log(e);
        return {'result': false, 'message': '接口调用失败'};
    } finally {

    }
}


module.exports.rest_api_post = function (url, headers, postdata) {
    try {
        var jsonString = request('POST', url, {headers: headers, json: postdata});
        var result = JSON.parse(jsonString.body.toString('utf8'));
        result.statusCode = jsonString.statusCode;
        debug('POST', url, headers, result, postdata);
        return result;
    } catch (e) {
        console.log(e);
        return {'result': false, 'message': '接口调用失败'};
    } finally {

    }
}
module.exports.rest_api_put = function (url, headers, postdata) {
    try {
        var jsonString = request('PUT', url, {headers: headers, json: postdata});
        var result = JSON.parse(jsonString.body.toString('utf8'));
        result.statusCode = jsonString.statusCode;
        debug('PUT', url, headers, result,  postdata);
        return result;
    } catch (e) {
        console.log(e);
        return {'result': false, 'message': '接口调用失败'};
    } finally {

    }
}
/*module.exports.getToken(){
  var url = 'http://api.wingconn.net/token?grant_type=client_credentials';
  var b = new Buffer(config.client_id + ':' + config.client_secret, 'base64');
  var client_id_secret = b.toString();
  var headers = {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + client_id_secret};
  var result = module.exports.rest_api_post(url, headers);
  console.log(result);
}*/

module.exports.trim = function (str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

module.exports.generateCode = function (len) {
    len = len || 8;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var code = '';
    for (i = 0; i < len; i++) {
        code += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return code;
}