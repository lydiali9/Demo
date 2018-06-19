let path = '/api';

module.exports = {
    // activity
    query_activity: path + '/activity/query',
    get_activity: path + '/activity/get/:eid/:src',

    // expressage
    get_expressage: path + '/expressage/query',

    // reputation
    get_reputation: path + '/reputation/getReputation',
    get_pub_permissions_name: path + '/reputation/getPubPermissionsName',

    // vehicle violation
    get_vehicle_violation: path + '/vehicle/get',
    add_vehicle: path + '/vehicle/add',
    update_vehicle: path + '/vehicle/update',
    delete_vehicle: path + '/vehicle/delete',
    query_vehicle_count: path + '/vehicle/count',
    get_vehicle_by_id: path + '/vehicle/get/id',

    // code
    get_code: path + '/code/get',

    // area
    query_area: path + '/area/query',

    // user
    login: path + '/user/login',
    get_user: path + '/user/get',
    update_user: path + '/user/update',

    // service bebavior
    get_service_behavior: path + '/service_bebavior/get',

    // services
    query_service: path + '/service/query',

    // common
    img_upload: path + '/common/upload',
};