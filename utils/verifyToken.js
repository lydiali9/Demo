var jwt = require('jsonwebtoken');
const config = require("./constant");
let $logger = require('./logger');
let $code = require('./code');

function verifyToken(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        $logger.error('method: verify_token, msg: No token provided');
        res.json({code: $code.NO_TOKEN, msg: "No token provided", data: ""});
    } else {
        jwt.verify(token, config.TOKEN_SECRET, function (err, decoded) {
            if (err) {
                $logger.error('method: verify_token, msg: No token provided');
                res.json({code: $code.NO_AUTHENTICATE, msg: "Failed to authenticate token", data: ""});
            }

            // if everything good, save to request for use in other routes
            req.decoded = decoded;
            next();
        });
    }
}
module.exports = verifyToken;