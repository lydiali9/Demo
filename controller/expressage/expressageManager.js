/**
 * express
 * @type {es}
 * Created by yuhua.li
 */
let request_promise = require('request-promise');
let $url = require('../../utils/urls');
let $logger = require('../../utils/logger');
let $code = require('../../utils/code');

let $modelConfig = require('../../utils/modelConfig');
let ServiceBehaviorManager = require("../serviceBehavior/serviceBehaviorManager");

module.exports = {
    getExpressage(req, res) {
        let body = req.query;

        if (body.num) {
            var url = $url.get_expressage + "?appid=4001&com=&nu=" + body.num + "&vcode=&token=&_=1525687115970";

            let options = {
                "method": "GET",
                "uri": url,
                "json": true,
                "headers": {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Cookie': 'BAIDUID=F9CD8D368696624EF2F9C448BE4C8A81:FG=1; BIDUPSID=F9CD8D368696624EF2F9C448BE4C8A81; PSTM=1516274010; BD_UPN=123353; BDUSS=3ctQ0dRclVEQXpUdEFvZFc5SUVaM3hVc2FTSTNvN2wxeFFqMjVjS3hsc1NHUXBiQUFBQUFBJCQAAAAAAAAAAAEAAAB1y3FSTHlkaWFMaTA5MDEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABKM4loSjOJad; __cfduid=d23f8c0cd2373763ea7bc182b02a9f1e91524887055; H_PS_PSSID=1459_26351_21085_22159; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; BD_CK_SAM=1; PSINO=7; BD_HOME=1; H_PS_645EC=5e56U%2FiqDjSwOBVrVHhVfDpqfNisEcvT2EfXmJRy7YTFjhdSgjVz9q38uMSfJeVNpfTc; WWW_ST=1525687124328',
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/63.0.3239.84 Chrome/63.0.3239.84 Safari/537.36'
                }
            };

            request_promise(options)
                .then((result) => {
                    if(result.status == "0") {
                            let info = result.data && result.data.info && result.data.info.context ? result.data.info.context : '';
                            let company = result.data && result.data.company ? result.data.company : '';

                            // validate if the uid is exists, create behavior, otherwise create an new user then create behavior
                            let params = {
                                service_id: $modelConfig.IVN_EXPRESS.key,
                                name: $modelConfig.IVN_EXPRESS.value,
                                behavior_type: 1,
                                keyword: JSON.stringify(body),
                            }

                            ServiceBehaviorManager.createServiceBehavior(params, body.uid)
                                .then(uid => {
                                    res.json({code: $code.SUCCESS, msg: 'success', content: {"context": info, 'company': company, uid: uid}});
                                })
                                .catch(function (err) {
                                    $logger.error('method: query_activity成功后，创建用户行为失败, msg: ' + err);
                                    res.json({code: $code.SUCCESS, msg: 'success', content: {"context": info, 'company': company, uid: !!body.uid ? body.uid : ""}});
                                });
                    } else {
                        $logger.error('method: get_expressage, msg: 无法获取当前运单号信息');
                        res.json({code: $code.FALSE, msg: "无法获取当前运单号信息", data: ""});
                    }
                })
                .catch(function (err) {
                    $logger.error('method: get_expressage, msg: ' + err);
                    res.json({code: $code.INTERNAL_SERVER_ERROR, msg: 'failed', err: err});
                });
        } else {
            $logger.warn('method: get_expressage, msg: 请求信息不完整');
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请求信息不完整", data: ""});
        }
    }
}

