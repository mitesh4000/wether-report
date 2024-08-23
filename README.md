hellow dear examinier here is my assignment

you can checkout the demo of assignment here
http://mitesh4000.in:3000/

| Endpoint               | Method | Description                                                                                                                              |
| ---------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| /locations             | GET    | Returns a list of all saved locations.                                                                                                   |
| /locations             | POST   | Adds a new location to the database. The request body should be a JSON object with the following properties: `latitude` and `longitude`. |
| /weather               | GET    | Returns the weather forecast for all saved locations.                                                                                    |
| /weather/:locationName | GET    | Returns the weather forecast for a specific location. Replace `:locationName` with the name of the location.                             |
