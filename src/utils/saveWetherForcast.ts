import axios from "axios";
import Weather from "../models/wether.modal";
import connectToDb from "./connectToDb";

async function saveWeatherData(lat: number, long: number) {
  try {
    await connectToDb();
    const response = await axios.get(
      `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${long}&apikey=u1Tl0b7e6eJm3LGJwTHdZd16TkHn0aqp`
    );

    const weatherData = response.data.timelines.daily;

    const weatherDocs = weatherData
      .slice(-5)
      .map((data: any) => new Weather(data));

    await Weather.insertMany(weatherDocs);

    console.log(`${weatherDocs.length} documents inserted`);
    return;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// saveWeatherData();

export default saveWeatherData;
