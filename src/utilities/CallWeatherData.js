import { useState, useEffect } from "react";
import sanityClient from "../client";


export async function CallWeatherData() {
    
    const [weatherData, setWeatherData] = useState(null);
    // test Sanity connection
    useEffect(() => {
          sanityClient
              .fetch(
                  `*[_type == "weatherData"]{
            temp, pressure, humidity, wind_speed, wind_deg, sunrise, sunset
          }[0]`
              )
              .then((data) => setWeatherData(data))
              .catch(console.error);
      }, []);
    console.log("Weather Data json: " + JSON.stringify(weatherData))
  
    return weatherData
}
