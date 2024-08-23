import express from "express";
import Locations from "../models/location.modal";
import saveWeatherData from "../utils/saveWetherForcast";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { latitude, longitude, locationName } = req.body;

    const newWeather = new Locations({
      latitude,
      longitude,
      locationName,
    });
    await saveWeatherData(latitude, longitude, locationName);
    await newWeather.save();

    res
      .status(201)
      .json({ message: "Location added successfully", newWeather });
  } catch (error) {
    console.error("Error adding new location:", error);
    res.status(500).send("Unable to add new location");
  }
});

export default router;
