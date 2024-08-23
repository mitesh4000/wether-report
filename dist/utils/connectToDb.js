"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDb = () => {
    mongoose_1.default
        .connect(process.env.MONGODB_URI ||
        "mongodb+srv://rango:wUDPbtLUp7ZDQZQr@cluster0.2bxued0.mongodb.net/Wether?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.error("MongoDB connection error:", err));
};
exports.default = connectToDb;
