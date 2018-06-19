/**
 * crawler
 * @type {es}
 * Created by yuhua.li
 */
var request_promise = require('request-promise');
let $url = require('../../utils/urls');
let $utils = require('../../utils/utils');
let $logger = require('../../utils/logger');
let $code = require('../../utils/code');
var UserModel = require('../../models/user/user');
const CONFIG = require("../../utils/constant");

function createUser(number) {
    return new Promise(function (resolve, reject) {
        UserModel.create({"number": number, nickname: '派娱乐User'}, function (err, user) {
            if (err) {
                $logger.error('method: get_code, msg: 获取验证码成功后，保存用户信息失败');
                reject(err);
            } else {
                // generate a token
                let token = $utils.generateToken(user._id);
                console.log(token);
                let doc = user._doc ? user._doc : {};
                resolve(Object.assign(doc, {token: token}));
            }
        });
    });
}

function updateUser(number, password) {
    UserModel.update({"number": number}, {password: password}, function (err, result) {
        if (err) {
            $logger.error('method: login, msg: 登录后更新密码失败');
            return handleError(err);
        }
    });
}

module.exports = {
    getCode(req, res) {
        let body = req.query;

        if(body.number && body.type) {
            let url = $url.get_code;
            let timetamp = new Date().getTime();

            let options = {
                "uri": url,
                "qs": {
                    "tk": $utils.createToken(body.number, timetamp),
                    "product_id": CONFIG.PRODUCT_SDK_ID,
                    "phone_num": body.number,
                    "timestamp": timetamp,
                    "type": parseInt(body.type),
                    "ver": CONFIG.CMS_VERSION
                },
                "headers": {
                    'User-Agent': 'Request-Promise',
                    'content-type': 'application/json;charset=UTF-8'
                }
            };

            request_promise(options)
                .then(data => {
                    let result = JSON.parse(data);
                    console.log(result);
                    if(result.code == 200) {
                        res.json({code: $code.SUCCESS, msg: 'success', content: result});
                    } else {
                        $logger.error('method: get_code, msg: ' + result.message);
                        res.json({code: $code.QUERY_MYSQL_FALSE, errmsg: result.message, data: ""});
                    }
                })
                .catch(function (err) {
                    $logger.error('method: get_code, msg: ' + err.message);
                    res.json({code: $code.INTERNAL_SERVER_ERROR, msg: 'failed', err: err.message});
                });
        } else {
            $logger.error('method: get_code, msg: 请求信息不完整');
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请求信息不完整", data: ""});
        }
    },

    login(req, res) {
        let body = req.body;

        if(body.number && body.code) {
            let url = $url.register;
            let timetamp = new Date().getTime();

            let options = {
                "uri": url,
                "qs": {
                    "tk": $utils.createToken(body.number, timetamp),
                    "product_id": CONFIG.PRODUCT_SDK_ID,
                    "phone_num": body.number,
                    "verification_code": body.code,
                    "timestamp": timetamp,
                    "ver": CONFIG.CMS_VERSION
                },
                "headers": {
                    'User-Agent': 'Request-Promise',
                    'content-type': 'application/json;charset=UTF-8'
                }
            };

            request_promise(options)
                .then(data => {
                    let result = JSON.parse(data);

                    if(result.code == 200) {
                        UserModel.findOne({number: body.number}, function(err, user) {
                            if(!user) {
                                createUser(body.number)
                                    .then(doc => {
                                        res.json({code: $code.SUCCESS, msg: 'success', content: doc});
                                    })
                                    .catch(function (err) {
                                        $logger.error('method: login create_user, msg: ' + err.message);
                                        res.json({code: $code.FALSE, msg: 'failed', err: err.message});
                                    });
                            } else {
                                let token = $utils.generateToken(user._id);
                                let doc = user._doc ? user._doc : {};
                                res.json({code: $code.SUCCESS, msg: 'success', content: Object.assign(doc, {token: token})});
                            }
                        });
                    } else {
                        $logger.error('method: login, msg: ' + result.message);
                        res.json({code: $code.QUERY_MYSQL_FALSE, errmsg: result.message, data: ""});
                    }
                })
                .catch(function (err) {
                    $logger.error('method: login, msg: ' + err.message);
                    res.json({code: $code.FALSE, msg: 'failed', err: err.message});
                });
        } else {
            $logger.error('method: login, msg: 请求信息不完整');
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请求信息不完整", data: ""});
        }
    },

    getUser(req, res) {
        let body = req.query;

        if(body.uid) {
            UserModel.findById(body.uid, function(err, data) {
                if(!!data) {
                    res.json({code: $code.SUCCESS, msg: 'success', content: data._doc});
                } else {
                    $logger.warn('method: get_user, msg: id为' + body.uid + '的用户不存在或被删除');
                    res.json({code: $code.NO_EXIST, msg: "该用户不存在", data: ""});
                }
            });
        } else {
            $logger.error('method: get_user, msg: 请求信息不完整');
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请求信息不完整", data: ""});
        }
    },

    updateUser(req, res) {
        let body = req.body;

        if(body.uid) {
            UserModel.findById(body.uid, function(err, data) {
                if(!!data) {
                    // update user
                    let userItems = data._doc;
                    let params = {
                        "headphoto": body.headphoto ? body.headphoto : userItems.headphoto,
                        "nickname": body.nickname ? body.nickname : userItems.nickname,
                        "sex": body.sex ? body.sex : userItems.sex,
                        "age": body.age ? body.age : userItems.age
                    };

                    UserModel.update({"_id": body.uid}, params, function(error, user) {
                        if(error) {
                            $logger.warn('method: upload_user, msg: ' + error);
                            res.json({code: $code.FALSE, msg: "更新用户信息失败", data: ""});
                        } else {
                            res.json({code: $code.SUCCESS, msg: 'success', content: {}});
                        }
                    });

                } else {
                    $logger.warn('method: upload_user, msg: id为' + body.uid + '的用户不存在或被删除');
                    res.json({code: $code.NO_EXIST, msg: "该用户不存在", data: ""});
                }
            });
        } else {
            $logger.error('method: upload_user, msg: 请求信息不完整');
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请求信息不完整", data: ""});
        }
    }
};
