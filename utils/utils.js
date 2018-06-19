/**
 * Common
 * Created by yuhua.li
 */
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

let md5 = require('md5');
const CONFIG = require("./constant");


function S4() { 
    return (((1 + Math.random()) * 0x10000)|0).toString(16).substring(1);
}
        
const utils = {
    createUid: function() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },

    createToken: function(phone_num, timetamp) {
        return md5(CONFIG.PRODUCT_SDK_SECRET + ":" + phone_num + ":" + timetamp);
    },

    generateToken: function(userId) {
        let token = jwt.sign({ id: userId }, CONFIG.TOKEN_SECRET, {
            expiresIn: 365 * 24 * 60 * 60 * 1000// expires in one year
        });

        return token;
    }
}

module.exports = utils
