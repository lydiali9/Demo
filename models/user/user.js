'use strict';

let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, default: ''},
    id: Number,
    password: {type: String, default: ''},
    type: {type: Number, default: 0},
    group: [],
    server_limit: [],
    desc: {type: String, default: ''},
    nickname: {type: String, default: ''},
    age: {type: Number, min: 13, max: 80, default: -1}, // -1 unknown
    sex: {type: Number, default: 0},
    email: {type: String, default: ''},
    id_crad: {type: String, default: ''},
    home_address: {type: String, default: ''},
    company_address: {type: String, default: ''},
    create_time: Date,
    update_time: { type: Date, default: Date.now },
    headphoto: {type: String, default: ''},
    number: {type: String, default: ''},
    wechat: {type: String, default: ''},
    weibo: {type: String, default: ''},
    QQ: {type: String, default: ''},
    is_deleted: {type: Number, default: 0}
})

userSchema.index({id: 1});
const User = mongoose.model('User', userSchema);

module.exports = User
