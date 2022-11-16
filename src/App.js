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
// import CallWeatherData from "./utilities/CallWeatherWind";

// import FetchMapData from "./components/mapbox/service/FetchMapData";
// import { set } from "react-hook-form";

function App() {
  console.log("C App is running");

  return (
    <>
      {/* INTRODUCTORY PAGE */}
        <LandingPage />
        <AboutWindow />

      {/* EVERY OTHER PAGE */}
      <div className="contentWrapper relative grid h-full w-full">

        <MenuButtons />
        
        {/* MAP BACKGROUND*/}
        <div
          className="absolute z-0 w-full h-full"
          style={{ objectFit: "cover" }}
        >
          {/* <div className="fixed z-0 w-full h-full px-7"> */}
          <Mapbox />
          {/* {mapData[3] ? <Mapbox zoomOut={zoomOut} mapData={mapData}/> : (
              <pre>data loading...</pre>
            )} */}
        </div>

        <Routes>
          <Route element={<Home />} path="/" exact />
          <Route element={<UploadStoriesIntro />} path="/uploadstory" exact />
          <Route
            element={<StoryCategory />}
            path="/uploadstory/:landmark"
            exact
          />
          <Route element={<LoadMemories />} path="/loadmemory" />
          <Route element={<LoadMemories />} path="/loadmemory/:landmark" />
          <Route element={<Impressum />} path="/impressum" exact />
          <Route element={<NotFound />} path="*" exact />
        </Routes>
      </div>

      {/* BACK TO DASHBOARD BUTTON */}
      {/* <div className="inline-flex text-sm text-white fixed z-40 bottom-3 right-4 px-9">
        <NavLink className="px-3" to="/">
          <p>Dashboard</p>
        </NavLink>
      </div> */}

      {/* IDLE TIMER */}
      {/* <IdleTimerContainer></IdleTimerContainer> */}
    </>
  );
}

export default App;
