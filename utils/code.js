/**
 * Created by yuhua.li on 2018-06-04.
 */

const code = {
    SUCCESS: 200,               // OK
    FALSE: 400,                 // bad request
    NO_EXIST: 401,              // validate if the date is exists
    NO_AUTHENTICATE: 402,       // Failed to authenticate token
    NO_TOKEN: 403,              // no token provided
    INTERNAL_SERVER_ERROR: 500, // internal server error
    NO_FOUND: 404,              // not found
    NEED_LOGIN: 102,            // 需要登录
    IMAGE_UPLOAD_FALSE: 103,    // 图片上传异常
    QUERY_MYSQL_FALSE: 104,     // 数据库查询异常
    OPERATE_MYSQL_FALSE: 105,   // 数据库操作异常
    OPERATE_REDIS_FALSE: 106,   // redis操作异常
    REPETITION: 107,            // 数据重复
    REQUEST_DATA_ERR:108,       // 请求数据错误
}

module.exports = code