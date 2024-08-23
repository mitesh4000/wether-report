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
const saveWetherForcast_1 = __importDefault(require("../utils/saveWetherForcast"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { latitude, longitude, locationName } = req.body;
        const newWeather = new location_modal_1.default({
            latitude,
            longitude,
            locationName,
        });
        yield (0, saveWetherForcast_1.default)(latitude, longitude, locationName);
        yield newWeather.save();
        res
            .status(201)
            .json({ message: "Location added successfully", newWeather });
    }
    catch (error) {
        console.error("Error adding new location:", error);
        res.status(500).send("Unable to add new location");
    }
}));
exports.default = router;
