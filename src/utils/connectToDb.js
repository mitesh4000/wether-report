"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var connectToDb = function () {
    mongoose_1.default
        .connect(process.env.MONGODB_URI ||
        "mongodb+srv://rango:wUDPbtLUp7ZDQZQr@cluster0.2bxued0.mongodb.net/Wether?retryWrites=true&w=majority&appName=Cluster0")
        .then(function () { return console.log("MongoDB connected"); })
        .catch(function (err) { return console.error("MongoDB connection error:", err); });
};
exports.default = connectToDb;
