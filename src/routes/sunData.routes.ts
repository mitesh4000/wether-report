import express from "express";
import { StatusCodes } from "http-status-codes";

const router = express.Router();
const fatchData = async () => {
  const url = "https://api.open-meteo.com/v1/forecast";
};

router.get("/", async (req, res) => {
  const data = await fatchData();

  res.status(StatusCodes.ACCEPTED).json({ data: data });
});

export default router;
