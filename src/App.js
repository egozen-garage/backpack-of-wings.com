import { NavLink, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import { LoadMemories } from "./components/LoadMemories";
import { StoryCategory } from "./components/StoryCategory";
import { StoryIntro } from "./components/StoryIntro";
import { Impressum } from "./components/Impressum";
import { NotFound } from "./components/NotFound";
import { LandingPage } from "./components/LandingPage";
import { About } from "./components/About";
import Mapbox from "./components/Mapbox";
// import CallWeatherData from "./utilities/CallWeatherWind";

function App() {
  const [buttonPopup, setButtonPopup] = useState(true);
  const [aboutPopup, setAboutPopup] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);
  const handleZoom = (value) => {
    // 👇️ take parameter passed from Child component
    setZoomOut(value);
    console.log("handle zoom from child: " + zoomOut);
  };

  return (
    <>
      {/* <CallWeatherData/> */}
      {/* INTRODUCTORY PAGE */}
      <LandingPage
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
      ></LandingPage>
      {/* <CallSanityAPI query={query}/> */}

      {/* PARENT GRID */}
      <div className="ParentGrid wrapper flex justify-between min-h-screen">
        {/* ABOUT WINDOW */}
        <div className="aboutContainer bg-white fixed z-40 shadow-3xl rounded-2xl bottom-10 left-20 w-2/5 p-2">
          <button onClick={() => setAboutPopup(true)}>
            <h1>Backpack of Wings</h1>
          </button>
          <About trigger={aboutPopup} setTrigger={setAboutPopup}></About>
        </div>

        {/* LOAD MEMORIES */}
        <NavLink
          className="loadMemoriesBtnContainer z-40 flex items-center text-lg bg-white shadow-2xl w-8 order-1"
          to="/loadmemories"
        >
          <h1 className="" style={{ writingMode: "vertical-rl" }}>
            Load Memories
          </h1>
        </NavLink>

        {/* UPLOAD STORIES */}
        <NavLink
          className="uploadStoryBtnContainer z-40 w-8 flex items-center text-lg bg-white shadow-2xl order-3"
          to="/uploadstory"
        >
          <h1 className="" style={{ writingMode: "vertical-rl" }}>
            Upload Stories
          </h1>
        </NavLink>

        {/* EVERY OTHER PAGE */}
        <div className="ChildGridContainer relative wrapper-content z-30 order-2 grid grid-cols-2 grid-rows-6 grid-flow-col auto-rows-fr w-full">
          {/* MAP BACKGROUND*/}
          <div
            className="absolute z-0 w-full h-full"
            style={{ objectFit: "cover" }}
          >
            {/* <div className="fixed z-0 w-full h-full px-7"> */}
            <Mapbox zoomOut={zoomOut} />
          </div>

          <Routes>
            <Route element={<Home handleZoom={handleZoom} />} path="/" exact />
            <Route element={<StoryIntro />} path="/uploadstory" exact />
            <Route
              element={<StoryCategory handleZoom={handleZoom} />}
              path="/uploadstory/:landmark"
              exact
            />
            <Route
              element={<LoadMemories handleZoom={handleZoom} />}
              path="/loadmemories"
            />
            <Route element={<Impressum />} path="/impressum" exact />
            <Route element={<NotFound />} path="*" exact />
          </Routes>
        </div>

        <div className="inline-flex text-sm text-white fixed z-40 bottom-3 right-4 px-9">
          {/* BACK TO DASHBOARD BUTTON */}
          <NavLink className="px-3" to="/" reloadDocument>
            <p>Dashboard</p>
          </NavLink>

          {/* IMPRESSUM */}
          <NavLink className="px-3" to="/impressum">
            <p>Impressum</p>
          </NavLink>
        </div>
      </div>

      {/* IDLE TIMER */}
      {/* <IdleTimerContainer></IdleTimerContainer> */}
    </>
  );
}

export default App;
