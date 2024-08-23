"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requiredEnvVariables = ["DEPLOYMENT_API_URL", "BASE_API_URL"];
function checkEnvironmentVariables() {
    if (!process.env.DEPLOYMENT_API_URL) {
        console.error("Error: ".concat("DEPLOYMENT_API_URL", " is not set."));
        throw new Error("$\"DEPLOYMENT_API_URL\" is required.");
    }
    if (!process.env.BASE_API_URL) {
        console.error("Error: BASE_API_URL is not set.");
        throw new Error("BASE_API_URL is required.");
    }
    if (!process.env.CRON_SHEDULE || !process.env.CRON_SHEDULE) {
        console.error("Error: CRON_SCHEDULE_IS_NOT_PROVIDED is not set.");
        throw new Error("BASE_API_URL is required.");
    }
    if (!process.env.IPINFO_API_KEY) {
        console.error("Error: IPINFO_API_KEY is not provided.");
        throw new Error("IPINFO_API_KEY is required.");
    }
    console.log("All required environment variables are set.");
}
exports.default = checkEnvironmentVariables;
