'use strict';

let express = require('express');
let $api = require('../api');

let $activity = require('../controller/activity/activityManager');
let $exprssage = require('../controller/expressage/expressageManager');
let $reputation = require('../controller/reputation/reputationManager');
let $vehicle = require('../controller/vehicle/vehicleManager');
let $user = require('../controller/user/userManager');
let $common = require('../controller/common/common');
let $servicebehavior = require('../controller/serviceBehavior/serviceBehaviorManager');
let $service = require('../controller/service/serviceManager');
let verifyToken = require('../utils/verifyToken');

let router = express.Router();

// activity
router.get($api.query_activity, $activity.queryActivity);
router.get($api.get_activity, $activity.getActivity);

// expressage
router.get($api.get_expressage, $exprssage.getExpressage);

// reputation
router.post($api.get_reputation, $reputation.getReputation);
router.post($api.get_pub_permissions_name, $reputation.getPubPermissionsName);

// vehicle
router.get($api.get_vehicle_violation, $vehicle.getVehicle);
router.post($api.add_vehicle, $vehicle.addVehicle);
router.post($api.update_vehicle, $vehicle.updateVehicle);
router.post($api.delete_vehicle, $vehicle.deleteVehicle);
router.get($api.query_vehicle_count, $vehicle.queryVehicleCount);
router.get($api.get_vehicle_by_id, $vehicle.getVehicleById);

// code
router.get($api.get_code, $user.getCode);

// area
router.get($api.query_area, $common.queryArea);

// user
router.post($api.login, $user.login);
router.get($api.get_user, verifyToken, $user.getUser);
router.post($api.update_user, verifyToken, $user.updateUser);

 // service behavior
router.get($api.get_service_behavior, $servicebehavior.getServiceBehavior);

// service
router.get($api.query_service, $service.queryService);

// common
router.get($api.img_upload, $common.imgUpload);

module.exports = router;