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
const axios_1 = __importDefault(require("axios"));
const wether_modal_1 = __importDefault(require("../models/wether.modal"));
const connectToDb_1 = __importDefault(require("./connectToDb"));
function saveWeatherData(lat, long, locationName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, connectToDb_1.default)();
            const response = yield axios_1.default.get(`https://api.tomorrow.io/v4/weather/forecast?location=${lat},${long}&apikey=u1Tl0b7e6eJm3LGJwTHdZd16TkHn0aqp`);
            console.log(lat, long);
            const weatherData = response.data.timelines.daily;
            const weatherDocs = weatherData.slice(-5).map((data) => {
                return new wether_modal_1.default({
                    time: data.time,
                    values: data.values,
                    location: { latitude: lat, longitude: long },
                    locationName: locationName,
                });
            });
            weatherDocs.forEach((element) => {
                console.log(element.location);
            });
            yield wether_modal_1.default.insertMany(weatherDocs);
            return;
        }
        catch (error) {
            console.error("Error fetching weather data:", error);
        }
    });
}
//saveWeatherData(22.3008, 73.2043);
exports.default = saveWeatherData;
