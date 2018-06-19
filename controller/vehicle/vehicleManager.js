/**
 * vehicle
 * @type {es}
 * Created by yuhua.li
 */
var request_promise = require('request-promise');
const puppeteer = require('puppeteer');
var cheerio = require('cheerio');

let $url = require('../../utils/urls');
let $logger = require('../../utils/logger');
let $code = require('../../utils/code');
let VehicleModel = require('../../models/vehicle/vehicle');

let $modelConfig = require('../../utils/modelConfig');
let ServiceBehaviorManager = require("../serviceBehavior/serviceBehaviorManager");

/*function getVehicleViolation(data) {
    return new Promise(function (resolve, reject) {
        let url = $url.get_vehicle_violation;
        let body = data._doc;

        let options = {
            "method": "POST",
            "uri": url,
            "body": {
                "car_no": body.plate_no ? body.plate_no.toString() : "",
                "channel": "baidu",
                "engine": body.engine_no ? body.engine_no.toString() : "",
                "vin": body.VIN ? body.VIN.toString() : "",
                "t": "1528440492727",
                "md5": "1e425d866a35134d2f6f59746ca5645b",
                "car_type": "02",
                "formid": null,
                "access_token": ""

            },
            "json": true
        };

        request_promise(options)
            .then((result) => {

                if(result.code == 0) {
                    if(result.data && result.data.Records && result.data.code && result.data.mesg) {
                        delete result.data.Records;
                        delete result.data.code;
                        delete result.data.mesg;
                    }
                    resolve(result.data);
                } else {
                    $logger.warn('method: query_vehicle, msg: 获取车辆违章信息失败');
                    reject("获取车辆违章信息失败");
                }
            })
            .catch(function (err) {
                $logger.error('method: query_vehicle, msg: ' + err.message);
                reject(err.message);
            });
    });
}*/

function getViolationCount(body) {
    return new Promise(function (resolve, reject) {
        let url = $url.get_violation_html + "?carno=" + body.plate_no + "&vin=" +
            body.VIN + "&engine=" + body.engine_no + "&car_type=" + body.vehicle_type;

        puppeteer.launch({headless: true})
            .then(async browser => {
                const page = await browser.newPage();
                await page.goto(url);
                let html = await page.content();

                const result = await page.evaluate(() => {
                    let fine = document.querySelector('.s4s-body > div.s4s-car-info > div.s4s-car-illegal > span:nth-child(1)').innerText;
                    let point = document.querySelector('.s4s-body > div.s4s-car-info > div.s4s-car-illegal > span:nth-child(2)').innerText;
                    let total = document.querySelector('.s4s-body > div.s4s-car-info > div.s4s-car-illegal > span:nth-child(3)').innerText;

                    return {
                        fine: fine,
                        point: point,
                        total: total
                    };
                });

                $logger.info('method: get_violation_count, msg: 爬取物流信息成功， result:' + result);

                await page.close();
                return resolve(result);
            })
            .catch(function (err) {
                $logger.error('method: get_violation_count, msg: ' + err.message);
                reject(err.message);
            });
    });
}

function getViolation(body) {
    return new Promise(function (resolve, reject) {

        let url = $url.get_violation_html + "?carno=" + body.plate_no + "&vin=" +
            body.VIN + "&engine=" + body.engine_no + "&car_type=" + body.vehicle_type;

        puppeteer.launch({headless: true})
            .then(async browser => {
                const page = await browser.newPage();
                await page.goto(url);
                let html = await page.content();

                let VIN = body.VIN;
                let engine_no = body.engine_no;
                let vehicle_type = body.vehicle_type;
                let plate_no = body.plate_no;

                const result = await page.evaluate(() => {
                    let data = [];
                    let elements = document.querySelectorAll('.s4s-illegal-item .s4s-illegal-list-body');

                    for (var element of elements){
                        let address = element.querySelector(".s4s-illegal-addr").innerText;
                        let occTime = element.querySelector(".s4s-illegal-time > div > div:nth-child(1) > span:nth-child(2)").innerText;
                        let reason = element.querySelector(".s4s-illegal-bd > div.s4s-illegal-bd-txt").innerText;
                        let fine = element.querySelector(".s4s-illegal-bd-number > span:nth-child(2)").innerText;
                        let point = element.querySelector(".s4s-illegal-bd-number > span:nth-child(1)").innerText;
                        let violationCode = element.querySelector(".s4s-illegal-time > div > div:nth-child(2) > span:nth-child(2)").innerText;

                        data.push({
                            address: address,
                            occTime: occTime,
                            reason: reason,
                            fine: fine,
                            point: point,
                            violationCode: violationCode
                        });
                    }

                    return data;
                });

                let data = {
                    VIN: VIN,
                    engine_no: engine_no,
                    vehicle_type: vehicle_type,
                    plate_no: plate_no,
                    Records: result
                }
                $logger.info('method: get_violation, msg: 爬取物流信息成功， result:' + data);

                await page.close();
                return resolve(data);
            })
            .catch(function (err) {
                $logger.error('method: query_violation, msg: ' + err.message);
                reject(err.message);
            });
    });
}

module.exports = {

    getVehicle(req, res) {
        let body = req.query;

        if(body.vehicle_type && body.engine_no && body.VIN && body.plate_no) {

            getViolation(body)
                .then((result) => {

                    if(!!result) {
                        // validate if the uid is exists, create behavior, otherwise create an new user then create behavior
                        let params = {
                            service_id: $modelConfig.IVN_VIOLATION.key,
                            name: $modelConfig.IVN_VIOLATION.value,
                            behavior_type: 1,
                            keyword: JSON.stringify(body),
                        }

                        ServiceBehaviorManager.createServiceBehavior(params, body.uid)
                            .then(uid => {
                                res.json({code: $code.SUCCESS, msg: 'success', content: Object.assign(result, {uid: uid})});
                            })
                            .catch(function (err) {
                                $logger.error('method: get_violation成功后，创建用户行为失败, msg: ' + err);
                                res.json({code: $code.SUCCESS, msg: 'success', content: Object.assign(result, {uid: !!body.uid ? body.uid : ""})});
                            });

                    } else {
                        $logger.error('method: get_vehicle, msg: 获取车辆违章信息失败');
                        res.json({code: $code.FALSE, msg: "获取车辆违章信息失败", data: ""});
                    }
                })
                .catch(function (err) {
                    $logger.error('method: get_vehicle, msg: ' + err);
                    res.json({code: $code.FALSE, msg: 'failed', err: err});
                });
        } else {
            $logger.warn('method: get_vehicle, msg: 请求信息不完整');
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请求信息不完整", data: ""});
        }
    },

    addVehicle(req, res) {
        let body = req.body;

        if(body.vehicle_type && body.plate_no && body.VIN && body.engine_no && body.uid) {
            // validate if the vehicle is exists
            let params = {
                vehicle_type: body.vehicle_type,
                uid: body.uid,
                plate_no: body.plate_no,
                VIN: body.VIN,
                engine_no: body.engine_no
            }
            VehicleModel.findOne(params, function (err, result){
                if(!result) {
                    // save the data of vehicle
                    VehicleModel.create(params, function(error, docs){
                        if(err) {
                            $logger.error('method: add_vehicle, msg: 添加车辆失败');
                            res.json({code: $code.FALSE, errmsg: "添加车辆失败", data: ""});
                        } else {
                            res.json({code: $code.SUCCESS, msg: '添加车辆成功', content: docs});
                        }
                    });
                } else {
                    $logger.warn('method: add_vehicle, msg: ' + body.plate_no + ' 车辆已经添加');
                    res.json({code: $code.REPETITION, errmsg: "此车辆已经添加", data: ""});
                }
            });
        } else {
            $logger.warn('method: add_vehicle, msg: 请求信息不完整');
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请求信息不完整", data: ""});
        }
    },

    updateVehicle(req, res) {
        let body = req.body;

        if(body.vehicle_type && body.plate_no && body.VIN && body.engine_no && body.uid && body._id) {
            // validate if the vehicle is exists
            let params = {
                vehicle_type: body.vehicle_type,
                plate_no: body.plate_no,
                VIN: body.VIN,
                engine_no: body.engine_no
            }
            VehicleModel.findById(body._id, function (err, result){
                if(result) {
                    // update the data of vehicle
                    VehicleModel.update({_id: body._id, uid: body.uid}, params, function(error, docs){
                        if(err) {
                            $logger.error('method: update_vehicle, msg: 修改车辆失败' + err);
                            res.json({code: $code.FALSE, errmsg: "修改车辆失败", data: ""});
                        } else {
                            res.json({code: $code.SUCCESS, msg: '修改车辆成功', content: docs});
                        }
                    });
                } else {
                    $logger.warn('method: update_vehicle, msg: id为' + body._id + '的车辆不存在');
                    res.json({code: $code.NO_EXIST, errmsg: "此车辆不存在或已被删除", data: ""});
                }
            });
        } else {
            $logger.warn('method: update_vehicle, msg: 请求信息不完整');
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请求信息不完整", data: ""});
        }
    },

    deleteVehicle(req, res) {
        let body = req.body;

        if(body._id && body.uid) {
            // validate if the vehicle is exists

            VehicleModel.findById(body._id, function (err, result){
                if(result) {
                    // update the data of vehicle
                    VehicleModel.remove({_id: body._id, uid: body.uid}, function(error, docs){
                        if(err) {
                            $logger.error('method: delete_vehicle, msg: 删除车辆失败' + err);
                            res.json({code: $code.FALSE, errmsg: "删除车辆失败", data: ""});
                        } else {
                            res.json({code: $code.SUCCESS, msg: '删除车辆成功', content: docs});
                        }
                    });
                } else {
                    $logger.warn('method: delete_vehicle, msg: id为' + body._id + '的车辆不存在');
                    res.json({code: $code.NO_EXIST, errmsg: "此车辆不存在或已被删除", data: ""});
                }
            });
        } else {
            $logger.warn('method: delete_vehicle, msg: 请求信息不完整');
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请求信息不完整", data: ""});
        }
    },

    queryVehicleCount(req, res) {
        let body = req.query;

        if(body.uid) {
            // search if there are any vehicles.
            VehicleModel.find({ uid: body.uid }, function (err, results) {
                if(err) {
                    $logger.error('method: query_vehicle, msg: 该用户尚未添加车辆');
                    res.json({code: $code.NO_EXIST, msg: '该用户尚未添加车辆', content: {}});
                } else {
                    let content = [];

                    results.forEach(function(result) {
                        console.log(result);
                        getViolationCount(result)
                            .then(function(data) {
                                let fields = {
                                    fine: data.fine,
                                    point: data.point,
                                    total: data.total,
                                }
                                let vehicle = result && result._doc ? result._doc : {};
                                content.push(Object.assign(vehicle, fields));
                                res.json({code: $code.SUCCESS, msg: '查询车辆违章信息成功', content: content});
                            })
                            .catch(function (err) {
                                $logger.error('method: query_vehicle, msg: 根据用户添加车辆查询相关违章信息失败');
                                res.json({code: $code.REQUEST_DATA_ERR, msg: err, data: ""});
                            });
                    });
                }
            });
        } else {
            $logger.warn('method: query_vehicle, msg: 请求信息不完整');
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请求信息不完整", data: ""});
        }
    },

    getVehicleById(req, res) {
        let body = req.query;

        if(body.id) {
            VehicleModel.findById(body.id, function (err, result) {
                if(err) {
                    $logger.error('method: get_vehicle_by_id, msg: The vehicle does not exists');
                    res.json({code: $code.NO_EXIST, msg: 'The vehicle does not exists', content: {}});
                } else {
                    res.json({code: $code.SUCCESS, msg: '查询车辆信息成功', content: result});
                }
            });
        } else {
            $logger.warn('method: get_vehicle_by_id, msg: 请求信息不完整');
            res.json({code: $code.QUERY_MYSQL_FALSE, msg: "请求信息不完整", data: ""});
        }
    }
};
