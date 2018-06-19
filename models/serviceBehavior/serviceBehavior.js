'use strict';

let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceBehaviorSchema = new Schema({
    id: Number,
    service_id: Schema.Types.ObjectId,
    name: {type: String, default: ''},
    behavior_type: {type: Number, default: 0}, // 0 scan 1 search
    keyword: {},
    create_time: { type: Date, default: Date.now },
    update_time: { type: Date, default: Date.now },
    uid: Schema.Types.ObjectId
})

serviceBehaviorSchema.index({id: 1});
const Servicebehavior = mongoose.model('Servicebehavior', serviceBehaviorSchema);

module.exports = Servicebehavior
