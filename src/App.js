import { NavLink, Routes, Route } from "react-router-dom";
// import { useState, useMemo, useEffect, useRef } from "react";
import Home from "./components/Home";
import { LoadMemories } from "./components/LoadMemories";
import { StoryCategory } from "./components/StoryCategory";
import { UploadStoriesIntro } from "./components/UploadStoriesIntro";
import { Impressum } from "./components/Impressum";
import { NotFound } from "./components/NotFound";
import { LandingPage } from "./components/LandingPage";
import Mapbox from "./components/mapbox";
// import CallSanityAPI from "./utilities/CallSanityAPI";
import MenuButtons from "./components/MenuButtons";
import AboutWindow from "./components/AboutWindow";
import "./css/gradientAnimation.css";
import "./App.css";
import { useEffect, useState } from "react";
import SanityClient from "./client";
// import CallWeatherData from "./utilities/CallWeatherWind";

// import FetchMapData from "./components/mapbox/service/FetchMapData";
// import { set } from "react-hook-form";

function App() {
  console.log("C App is running");

  const [landmarkData, setLandmarkData] = useState(false)
  useEffect(() =>{
    // console.log("C App.js - load landmark data")
    Promise.all([
      SanityClient.fetch(
          `*[_type == "landmark"]`
      )
  ])
  .then(([landmarkData]) => {
      setLandmarkData(landmarkData);
  })
  .catch((err) => {
      // setError(err)
  })
  }, [])

  if (landmarkData) {
  return (
    <>
      {/* INTRODUCTORY PAGE */}
        <LandingPage />
        <AboutWindow />

      {/* EVERY OTHER PAGE */}
      <div className="contentWrapper relative grid h-full w-full">

        { landmarkData ? <MenuButtons landmarkData={landmarkData}/> : "" }
        
        {/* MAP BACKGROUND*/}
        <div
          className="absolute z-0 w-full h-full"
          style={{ objectFit: "cover" }}
        >
          {/* <div className="fixed z-0 w-full h-full px-7"> */}
          <Mapbox />
        </div>

        <Routes>
          <Route element={<Home />} path="/" exact />
          <Route element={<UploadStoriesIntro />} path="/uploadstory" exact />
          {/* <Route
            element={landmarkData ? <StoryCategory landmarkData={landmarkData} /> : ""}
            path="/uploadstory/:landmark"
            exact
          /> */}
          <Route element={<LoadMemories />} path="/loadmemory/:landmark" /> 
          <Route element={<LoadMemories />} path="/loadmemory/:landmark/:id" />
          <Route element={<Impressum />} path="/impressum" exact />
          <Route element={<NotFound />} path="*" exact />
        </Routes>
      </div>

      <div className="inline-flex text-sm text-white fixed z-40 bottom-3 right-4 px-9">
        {/* BACK TO DASHBOARD BUTTON */}
        <NavLink className="px-3" to="/">
          <p>Dashboard</p>
        </NavLink>
      </div>

      {/* IDLE TIMER */}
      {/* <IdleTimerContainer></IdleTimerContainer> */}
    </>
  );
        }
}

export default App;
