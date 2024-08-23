"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const greetings_routes_1 = __importDefault(require("./routes/greetings.routes"));
const sunData_routes_1 = __importDefault(require("./routes/sunData.routes"));
const wether_routes_1 = __importDefault(require("./routes/wether.routes"));
const location_routes_1 = __importDefault(require("./routes/location.routes"));
const connectToDb_1 = __importDefault(require("./utils/connectToDb"));
const envVariablesCheck_1 = __importDefault(require("./utils/envVariablesCheck"));
const cron = require("node-cron");
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, envVariablesCheck_1.default)();
const port = process.env.PORT || 3000;
app.use((0, morgan_1.default)("dev"));
(0, connectToDb_1.default)();
cron.schedule(process.env.CRON_SHEDULE, () => {
    console.log("Running scheduled task at midnight...");
});
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "./views"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.render("index", {
        title: "Welcome to My Node.js App",
        message: "Hello, world!",
        greetingsApi: process.env.DEPLOYMENT_API_URL +
            process.env.BASE_API_URL +
            "/greetings",
        WetherForcastAPI: process.env.DEPLOYMENT_API_URL + process.env.BASE_API_URL + "/wether",
    });
});
app.get("/add-location", (req, res) => {
    res.render("addLocation");
});
const base_url = process.env.BASE_API_URL;
app.use(`${base_url}/greetings`, greetings_routes_1.default);
app.use(`${base_url}/sundata`, sunData_routes_1.default);
app.use(`${base_url}/wether`, wether_routes_1.default);
app.use(`${base_url}/location`, location_routes_1.default);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
