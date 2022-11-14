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
// import CallWeatherData from "./utilities/CallWeatherWind";

// import FetchMapData from "./components/mapbox/service/FetchMapData";
// import { set } from "react-hook-form";

function App() {
  console.log("C App is running");

  // call sanity data

  // const [landmarkData, setLandmarkData] = useState(null)
  // const callLandmarkData = () => {
  // const { data, error, isLoaded } = CallSanityAPI(
  //   '*[_type == "landmark" ]{"url":url.current, "country":country, "locationType": locationType, "locationName": locationName, "latitude":latitude, "longitude":longitude}'
  // );
  //  console.log("landmark: " + data)
  //  setLandmarkData(data);
  // }
  // callLandmarkData();

  return (
    <>
      {/* INTRODUCTORY PAGE */}
      {/* <LandingPage/> */}

      <AboutWindow />

      {/* EVERY OTHER PAGE */}
      <div className="ChildGridContainer relative wrapper-content order-2 grid grid-cols-2 grid-rows-6 grid-flow-col auto-rows-fr w-full">

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

export default App;
