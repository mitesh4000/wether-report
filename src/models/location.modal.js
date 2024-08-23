"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
// Define the Location Schema
var locationSchema = new mongoose.Schema({
    locationName: {
        type: String,
        required: true,
        trim: true,
    },
    latitude: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= -90 && value <= 90;
            },
            message: function (props) { return "".concat(props.value, " is not a valid latitude!"); },
        },
    },
    longitude: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= -180 && value <= 180;
            },
            message: function (props) { return "".concat(props.value, " is not a valid longitude!"); },
        },
    },
}, {
    timestamps: true,
});
var Locations = mongoose.model("Locations", locationSchema);
exports.default = Locations;
