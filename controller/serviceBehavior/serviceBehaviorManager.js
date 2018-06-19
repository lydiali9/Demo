/**
 * activity
 * @type {es}
 * Created by yuhua.li
 */
let $url = require('../../utils/urls');
let $logger = require('../../utils/logger');
let $code = require('../../utils/code');

let ServiceBehaviorModel = require('../../models/serviceBehavior/serviceBehavior');
var UserModel = require('../../models/user/user');

function createBehavior(fields) {
    return new Promise(function (resolve, reject) {
        ServiceBehaviorModel.create(fields, function (err, doc) {
            if (err) {
                $logger.error('method: create_service_behavior, msg: 创建用户行为失败，' + err + " time:" + new Date());
                reject(err);
            } else {
                $logger.info('method: create_service_behavior, msg: 创建用户行为成功；' + " time:" + new Date());
                resolve(doc);
            }
        });
    });
}

module.exports = {
    createServiceBehavior(params, uid) {
        return new Promise(function (resolve, reject) {
            if(!!uid) {
                let fields = Object.assign(params, {uid: uid});

                createBehavior(fields)
                    .then(doc => {
                        resolve(uid);
                    })
                    .catch(function (err) {
                        resolve(uid);
                    });
            } else {
                UserModel.create({"type": 0}, function(err, user) {
                    if(err) {
                        $logger.error('method: query_activity create_user, msg: ' + err);
                    } else {
                        let userId = user._doc._id;
                        let fields = Object.assign(params, {uid: userId});

                        createBehavior(fields)
                            .then(doc => {
                                resolve(userId);
                            })
                            .catch(function (err) {
                                reject(err);
                            });
                    }
                });
            }
        });
    },

    getServiceBehavior(req, res) {
        let body = req.query;

        if(body.uid) {
            let content = [];
            let ids = [];

            ServiceBehaviorModel.find({uid: body.uid})
                .where({uid: body.uid})
                .sort({'create_time': -1})
                // .limit(3)
                .exec(function(err, docs) {
                    if(!docs) {
                        $logger.error('method: get_service_behavior, msg: ' + err);
                        res.json({code: $code.FALSE, errmsg: "fail", content: ""});
                    } else {
                        docs.forEach(item => {
                            let result = item._doc ? item._doc : {};
                            let service_id = item._doc && item._doc.service_id ? item._doc.service_id.toString() : '';

                            if(!ids.includes(service_id)) {
                                content.push(result);
                                ids.push(service_id);
                            }
                        });
                        res.json({code: $code.SUCCESS, msg: 'success', content: content});
                    }
                })
        } else {
            $logger.warn('method: get_service_behavior, msg: 请求信息不完整');
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请求信息不完整", data: ""});
        }
    }
};

