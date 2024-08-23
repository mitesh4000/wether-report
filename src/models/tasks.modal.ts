import mongoose from "mongoose";

export enum Status {
  ToDo = "To do",
  InReview = "Under review",
  InProgress = "In progress",
  Finished = "Finished",
}

export enum Priority {
  High = "High",
  Low = "Low",
  Medium = "Medium",
}

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: Object.values(Status) },
  priority: { type: String, enum: Object.values(Priority) },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
