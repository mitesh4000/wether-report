"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Priority = exports.Status = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var Status;
(function (Status) {
    Status["ToDo"] = "To do";
    Status["InReview"] = "Under review";
    Status["InProgress"] = "In progress";
    Status["Finished"] = "Finished";
})(Status || (exports.Status = Status = {}));
var Priority;
(function (Priority) {
    Priority["High"] = "High";
    Priority["Low"] = "Low";
    Priority["Medium"] = "Medium";
})(Priority || (exports.Priority = Priority = {}));
const taskSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: Object.values(Status) },
    priority: { type: String, enum: Object.values(Priority) },
    deadline: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
});
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
