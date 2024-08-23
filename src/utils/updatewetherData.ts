import Locations from "../models/location.modal";
import connectToDb from "./connectToDb";
import saveWeatherData from "./saveWetherForcast";

const updateWetherData = async () => {
  await connectToDb();
  const locations = await Locations.find();

  for (const location of locations) {
    saveWeatherData(
      location.latitude,
      location.longitude,
      location.locationName
    );
    console.log("yo");
  }
};

updateWetherData();
