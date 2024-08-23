import axios from "axios";
import Weather from "../models/wether.modal";
import connectToDb from "./connectToDb";

async function saveWeatherData(
  lat: number,
  long: number,
  locationName: string
) {
  try {
    await connectToDb();
    const response = await axios.get(
      `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${long}&apikey=u1Tl0b7e6eJm3LGJwTHdZd16TkHn0aqp`
    );

    console.log(lat, long);
    const weatherData = response.data.timelines.daily;

    const weatherDocs = weatherData.slice(-5).map((data: any) => {
      return new Weather({
        time: data.time,
        values: data.values,
        location: { latitude: lat, longitude: long },
        locationName: locationName,
      });
    });

    weatherDocs.forEach(
      (element: {
        time: string;
        values: string;
        location: { latitude: number; longitude: number };
      }) => {
        console.log(element.location);
      }
    );

    await Weather.insertMany(weatherDocs);

    return;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
//saveWeatherData(22.3008, 73.2043);

export default saveWeatherData;
