import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import greetingsRouts from "./routes/greetings.routes";
import sunDataRouts from "./routes/sunData.routes";
import weherRouts from "./routes/wether.routes";

import locationRouts from "./routes/location.routes";
import connectToDb from "./utils/connectToDb";

import checkEnvironmentVariables from "./utils/envVariablesCheck";
const cron = require("node-cron");
dotenv.config();

const app = express();

checkEnvironmentVariables();

const port = process.env.PORT || 3000;
app.use(morgan("dev"));

connectToDb();

cron.schedule(process.env.CRON_SHEDULE, () => {
  console.log("Running scheduled task at midnight...");
});

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "./views"));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", {
    title: "Welcome to My Node.js App",
    message: "Hello, world!",
    greetingsApi:
      process.env.DEPLOYMENT_API_URL! +
      process.env.BASE_API_URL! +
      "/greetings",
    WetherForcastAPI:
      process.env.DEPLOYMENT_API_URL! + process.env.BASE_API_URL! + "/wether",
  });
});

app.get("/add-location", (req, res) => {
  res.render("addLocation");
});

const base_url = process.env.BASE_API_URL;

app.use(`${base_url}/greetings`, greetingsRouts);
app.use(`${base_url}/sundata`, sunDataRouts);
app.use(`${base_url}/wether`, weherRouts);
app.use(`${base_url}/location`, locationRouts);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
