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
const http_status_codes_1 = require("http-status-codes");
const openmeteo_1 = require("openmeteo");
const router = express_1.default.Router();
const fatchData = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        latitude: 52.52,
        longitude: 13.41,
        daily: [
            "temperature_2m_max",
            "temperature_2m_min",
            "apparent_temperature_max",
            "sunrise",
            "sunset",
            "daylight_duration",
            "sunshine_duration",
        ],
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = yield (0, openmeteo_1.fetchWeatherApi)(url, params);
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const daily = response.daily();
    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
            temperature2mMax: daily.variables(0).valuesArray(),
            temperature2mMin: daily.variables(1).valuesArray(),
            sunrise: daily.variables(2).valuesArray(),
            sunset: daily.variables(3).valuesArray(),
        },
    };
    for (let i = 0; i < weatherData.daily.time.length; i++) {
        console.log(weatherData.daily.time[i].toISOString(), weatherData.daily.temperature2mMax[i], weatherData.daily.temperature2mMin[i], weatherData.daily.sunrise[i], weatherData.daily.sunset[i]);
    }
});
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fatchData();
    res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({ data: data });
}));
exports.default = router;
