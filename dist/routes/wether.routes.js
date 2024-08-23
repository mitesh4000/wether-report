"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_modal_1 = __importDefault(require("../models/location.modal"));
const wether_modal_1 = __importDefault(require("../models/wether.modal"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locations = yield location_modal_1.default.find();
        const data = [];
        for (const location of locations) {
            const weatherReport = yield wether_modal_1.default.find({
                locationName: location.locationName,
            })
                .sort({ time: -1 })
                .limit(5);
            if (weatherReport.length !== 0) {
                data.push({
                    location: location.locationName,
                    forecast: weatherReport,
                });
            }
        }
        res.json(data);
    }
    catch (error) {
        console.error("Error fetching location data:", error);
        return res.status(500).send("Unable to retrieve location data");
    }
}));
exports.default = router;
