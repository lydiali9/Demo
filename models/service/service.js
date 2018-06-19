'use strict';

let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    id: Number,
    key: {type: String, default: ''},
    name: {type: String, default: ''},
    behavior_type: {type: Number, default: 0}, // 0 scan 1 search
    keyword: {},
    create_time: { type: Date, default: Date.now },
    update_time: { type: Date, default: Date.now },
    uid: Schema.Types.ObjectId
})

serviceSchema.index({id: 1});
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service
