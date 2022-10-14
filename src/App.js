import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import sanityClient from "./client";

function App() {
  // test Sanity connection
  const [weatherData, setWeatherData] = useState(null);
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


  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Home/>} path='/' exact/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
