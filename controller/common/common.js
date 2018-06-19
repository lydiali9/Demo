/**
 * Common
 * Created by yuhua.li
 */
var request_promise = require('request-promise');
let $url = require('../../utils/urls');
let $logger = require('../../utils/logger');
let $code = require('../../utils/code');

let areaList = require('../../prototype/data');

module.exports = {
    queryArea(req, res) {
        res.json({code: $code.SUCCESS, msg: 'success', content: areaList});
    },

    imgUpload(req, res) {
       /* if() {
            let options = {
                "method": "POST",
                "uri": url,
                body: {
                    some: 'payload'
                },
                "json": true,
                "headers": {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };

            request_promise(options)
                .then((result) => {
                })
                .catch(function (err) {
                    $logger.error('method: login, msg: ' + err.message);
                    res.json({code: $code.FALSE, msg: 'failed', err: err.message});
                });
        } else {
            $logger.error('method: login, msg: 请求信息不完整');
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请求信息不完整", data: ""});
        }*/
    }

}