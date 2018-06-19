'use strict';

let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    username: {type: String, default: ''},
    number: {type: String, default: ''},
    id: Number,
    plate_no: {type: String, default: ''},
    city: {type: String, default: ''},
    model: {type: String, default: ''},
    vehicle_type: {type: String, default: ''},
    VIN: {type: String, default: ''},
    engine_no: {type: String, default: ''},
    inspection_date: Date,
    is_insure: {type: Number, default: 0}, // 0 unknown
    create_time: Date,
    update_time: { type: Date, default: Date.now },
    violation_id: Schema.Types.ObjectId,
    bill: {},
    uid: Schema.Types.ObjectId
})

vehicleSchema.index({id: 1});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle
