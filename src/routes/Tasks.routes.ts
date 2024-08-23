import express from "express";
import Task from "../models/tasks.modal";

const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.post("/", async (req, res) => {
  try {
    const newtask = await Task.create(req.body);
    if (newtask) {
      res.json({ data: newtask });
    }
  } catch (error) {
    res.json({ err: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStatus = req.body.status;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status: updatedStatus },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;
