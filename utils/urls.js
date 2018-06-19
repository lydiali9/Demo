const https = "https://";
const http = "http://";

module.exports = {
    // expressage
    get_expressage: https + 'sp0.baidu.com/9_Q4sjW91Qh3otqbppnN2DJv/pae/channel/data/asyncqury',

    // activity
    query_activity: http + 'openapi.huodongxing.com/v1/act/flist',
    get_activity: http + 'openapi.huodongxing.com/v1/act/detail',

    // vehicle
    get_vehicle_violation: https + 'mys4s.cn/v3/violation/web/query',
    get_violation_html: https + 'mys4s.cn/static/vio/index.html#/',

    // code
    get_code: 'http://192.168.1.238:8087/user/get_code',
    register: 'http://192.168.1.238:8087/user/register'
};