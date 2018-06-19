/**
 * reputation
 * @type {es}
 * Created by yuhua.li
 */
let https    = require('https');
let cheerio = require('cheerio');
let request = require('request');

var fetch = function (url) {
    console.log('Processing', url);
    return new Promise(function (resolve, reject) {
        https.get(url, function (res) {
            var body = "";
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                resolve(body);
            })
        });
    });
};

module.exports = {
    getReputation(req, res) {
        let body = req.body;

        if(body.keyword) {
            let url = "https://www.creditchina.gov.cn/api/credit_info_search?keyword=" + encodeURI(body.keyword) + "&templateId=&page=1&pageSize=10000";

            fetch(url)
                .then(function (result) {
                    $ = cheerio.load(result);
                    res.json({code: $code.SUCCESS, msg: "SUCCESS", data: result});
                }).catch(function (err) {
                throw err;
            });
        } else {
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请输入关键字", data: ""});
        }
    },

    getPubPermissionsName(req, res) {
        let body = req.body;

        if(body.encryStr) {
            let url = "https://www.creditchina.gov.cn/api/credit_info_detail?encryStr=" + encodeURI(body.encryStr);

            setTimeout(function () {
                fetch(url)
                    .then(function (result) {
                        $ = cheerio.load(result);
                        res.json({code: $code.SUCCESS, msg: "SUCCESS", data: result});
                    }).catch(function (err) {
                    throw err;
                });
            }, 10 * 1000);
        } else {
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请求信息不完整", data: ""});
        }
    }
}

