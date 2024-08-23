import express from "express";
import Locations from "../models/location.modal";
import Weather from "../models/wether.modal";

const router = express.Router();

interface LocationData {
  location: string;
  forecast: any[];
}

router.get("/", async (req, res) => {
  try {
    const locations = await Locations.find();
    const data: LocationData[] = [];

    for (const location of locations) {
      const weatherReport = await Weather.find({
        locationName: location.locationName,
      })
        .sort({ time: -1 })
        .limit(5);

      if (weatherReport.length !== 0) {
        data.push({
          location: location.locationName,
          forecast: weatherReport,
        });
      }
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching location data:", error);
    return res.status(500).send("Unable to retrieve location data");
  }
});

export default router;
