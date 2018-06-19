/**
 * activity
 * @type {es}
 * Created by yuhua.li
 */
var request_promise = require('request-promise');
let $url = require('../../utils/urls');
let $logger = require('../../utils/logger');
let $code = require('../../utils/code');

let $modelConfig = require('../../utils/modelConfig');
let ServiceBehaviorManager = require("../serviceBehavior/serviceBehaviorManager");

module.exports = {
    queryActivity(req, res) {
        let body = req.query;
        let province = body.province;
        let city = body.city;

        if(body.src && body.pageIndex && body.pageSize && body.province && body.city && body.startDate && body.endDate) {
            if(body.province) {
                province = encodeURI(body.province);
            }

            if(body.city) {
                city = encodeURI(body.city);
            }

            let url = $url.query_activity + "?src=" + body.src + "&province=" + province
                + "&city=" + city + "&sge=" + body.startDate + "&sle=" + body.endDate + "&pi=" + body.pageIndex + "&ps=" + body.pageSize;

            let options = {
                "method": "GET",
                "uri": url,
                "json": true,
                "headers": {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };

            request_promise(options)
                .then((result) => {
                    if(result.errcode == 200) {

                        // validate if the uid is exists, create behavior, otherwise create an new user then create behavior
                        let params = {
                            service_id: $modelConfig.IVN_ACTIVITY.key,
                            name: $modelConfig.IVN_ACTIVITY.value,
                            behavior_type: 0,
                            keyword: JSON.stringify(body),
                        }

                        ServiceBehaviorManager.createServiceBehavior(params, body.uid)
                            .then(uid => {
                                res.json({code: $code.SUCCESS, msg: 'success', content: Object.assign(result.result, {uid: uid})});
                            })
                            .catch(function (err) {
                                $logger.error('method: query_activity成功后，创建用户行为失败, msg: ' + err);
                                res.json({code: $code.SUCCESS, msg: 'success', content: Object.assign(result.result, {uid: !!body.uid ? body.uid : ""})});
                            });

                    } else {
                        $logger.error('method: query_activity, msg: ' + result.errmsg);
                        res.json({code: $code.FALSE, errmsg: "获取活动信息失败", data: ""});
                    }
                })
                .catch(function (err) {
                    $logger.error('method: query_activity, msg: ' + err);
                    res.json({code: $code.INTERNAL_SERVER_ERROR, msg: 'failed', err: err.message});
                });
        } else {
            $logger.warn('method: query_activity, msg: 请求信息不完整');
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请求信息不完整", data: ""});
        }
    },

    getActivity(req, res) {
        let body = req.params;

        if(body.src && body.eid) {
            let url = $url.get_activity + "?src=" + body.src + "&eid=" + body.eid;

            let options = {
                "method": "GET",
                "uri": url,
                "json": true,
                "headers": {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };

            request_promise(options)
                .then((result) => {

                    if(result.errcode == 200) {
                        res.json({code: $code.SUCCESS, msg: 'success', content: result.result});
                    } else {
                        $logger.error('method: get_activity, msg: ' + result.errmsg);
                        res.json({code: $code.QUERY_MYSQL_FALSE, errmsg: "获取运单信息失败", data: ""});
                    }
                })
                .catch(function (err) {
                    $logger.error('method: get_activity, msg: ' + err.message);
                    res.json({code: $code.INTERNAL_SERVER_ERROR, msg: 'failed', err: err.message});
                });

        } else {
            $logger.warn('method: get_activity, msg: 请求信息不完整');
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请求信息不完整", data: ""});
        }
    }
};

