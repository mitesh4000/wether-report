"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const Tasks_routes_1 = __importDefault(require("./routes/Tasks.routes"));
const greetings_routes_1 = __importDefault(require("./routes/greetings.routes"));
const sunData_routes_1 = __importDefault(require("./routes/sunData.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, morgan_1.default)("dev"));
//if (!process.env.MONGODB_URI) {
//  console.error("Environment variable MONGODB_URI is not provided");
//  process.exit(1);
//}
mongoose_1.default
    .connect(process.env.MONGODB_URI ||
    "mongodb+srv://rango:wUDPbtLUp7ZDQZQr@cluster0.2bxued0.mongodb.net/Task_management_db?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/users", users_routes_1.default);
app.use("/tasks", Tasks_routes_1.default);
app.use("/greetings", greetings_routes_1.default);
app.use("/sundata", sunData_routes_1.default);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
