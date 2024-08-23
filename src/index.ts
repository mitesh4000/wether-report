import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import taskRouts from "./routes/Tasks.routes";
import greetingsRouts from "./routes/greetings.routes";
import sunDataRouts from "./routes/sunData.routes";
import usersRoutes from "./routes/users.routes";
import connectToDb from "./utils/connectToDb";
import checkEnvironmentVariables from "./utils/envVariablesCheck";
const cron = require("node-cron");
dotenv.config();

const app = express();

checkEnvironmentVariables();

const port = process.env.PORT || 3000;
app.use(morgan("dev"));
//if (!process.env.MONGODB_URI) {
//  console.error("Environment variable MONGODB_URI is not provided");
//  process.exit(1);
//}

connectToDb();

cron.schedule(process.env.CRON_SHEDULE, () => {
  console.log("Running scheduled task at midnight...");
  // saceWetherData();
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
  });
});
const base_url = process.env.BASE_API_URL;

app.use(`${base_url}/users`, usersRoutes);
app.use(`${base_url}/tasks`, taskRouts);
app.use(`${base_url}/greetings`, greetingsRouts);
app.use(`${base_url}/sundata`, sunDataRouts);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
