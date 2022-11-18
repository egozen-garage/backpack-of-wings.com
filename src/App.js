import { NavLink, Routes, Route } from "react-router-dom";
// import { useState, useMemo, useEffect, useRef } from "react";
import Home from "./components/Home";
import { LoadMemories } from "./components/LoadMemories";
import { StoryCategory } from "./components/StoryCategory";
import { UploadStoriesIntro } from "./components/UploadStoriesIntro";
import { Impressum } from "./components/Impressum";
import { NotFound } from "./components/NotFound";
import { LandingPage } from "./components/LandingPage";
import { StoriesData } from "./components/StoriesData"
import Mapbox from "./components/mapbox";
// import CallSanityAPI from "./utilities/CallSanityAPI";
import MenuButtons from "./components/MenuButtons";
import AboutWindow from "./components/AboutWindow";
import "./css/gradientAnimation.css";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import SanityClient from "./client";
// import CallWeatherData from "./utilities/CallWeatherWind";

// import FetchMapData from "./components/mapbox/service/FetchMapData";
// import { set } from "react-hook-form";

function App() {
  console.log("C App is running");

  const [landmarkData, setLandmarkData] = useState(false)
  const [storyIds, setStoryIds] = useState(null)
  useEffect(() =>{
    // console.log("C App.js - load landmark data")
    Promise.all([
      SanityClient.fetch(
          `*[_type == "landmark"]`
      ),
      SanityClient.fetch(
          `*[_type == "story"]{_id, landmark}`
      )
  ])
  .then(([landmarkData, storyIds]) => {
      setLandmarkData(landmarkData);
      // sort story id and landmarks
      const droemling = {"total":-1, "ids": []}
      const lackova = {"total":-1, "ids": []}
      const istanbul = {"total":-1, "ids": []}
      const hama = {"total":-1, "ids": []}
      const neveeitan = {"total":-1, "ids": []}
      const dudaimsite = {"total":-1, "ids": []}
      for(const x in storyIds){
        if(storyIds[x].landmark === "droemling"){ 
          droemling.total = droemling.total + 1
          droemling.ids.push(storyIds[x]) 
        }
        if(storyIds[x].landmark === "lackova"){ 
          lackova.total = lackova.total + 1
          lackova.ids.push(storyIds[x]) 
        }
        if(storyIds[x].landmark === "istanbul"){ 
          istanbul.total = istanbul.total + 1
          istanbul.ids.push(storyIds[x]) 
        }
        if(storyIds[x].landmark === "hama"){ 
          hama.total = hama.total + 1
          hama.ids.push(storyIds[x]) 
        }
        if(storyIds[x].landmark === "neveeitan"){ 
          neveeitan.total = neveeitan.total + 1
          neveeitan.ids.push(storyIds[x]) 
        }
        if(storyIds[x].landmark === "dudaimsite"){ 
          dudaimsite.total = dudaimsite.total + 1
          dudaimsite.ids.push(storyIds[x]) 
        }
      }
      // const droemling = {"droemling":[]}
      // const lackova = {"lackova":[]}
      // const istanbul = {"istanbul":[]}
      // const hama = {"hama":[]}
      // const neveeitan = {"neveeitan":[]}
      // const dudaimsite = {"dudaimsite":[]}
      // for(const x in storyIds){
      //   if(storyIds[x].landmark === "droemling"){ droemling.droemling.push(storyIds[x]) }
      //   if(storyIds[x].landmark === "lackova"){ lackova.lackova.push(storyIds[x]) }
      //   if(storyIds[x].landmark === "istanbul"){ istanbul.push(storyIds[x]) }
      //   if(storyIds[x].landmark === "hama"){ hama.hama.push(storyIds[x]) }
      //   if(storyIds[x].landmark === "neveeitan"){ neveeitan.hama.push(storyIds[x]) }
      //   if(storyIds[x].landmark === "dudaimsite"){ dudaimsite.hama.push(storyIds[x]) }
      // }
      // setStoryIds({droemling, lackova, istanbul, hama, neveeitan, dudaimsite})
      setStoryIds([droemling, lackova, istanbul, hama, neveeitan, dudaimsite])
  })
  .catch((err) => {
      // setError(err)
  })
  }, [])

  if(storyIds){
    console.log("story ids : " + JSON.stringify(storyIds[3].ids[0].landmark))
  }
  
  if (landmarkData) {
  return (
    <>
      {/* INTRODUCTORY PAGE */}
        <LandingPage />
        <AboutWindow />

      {/* EVERY OTHER PAGE */}
      <div className="contentWrapper relative grid h-full w-full">

        { landmarkData ? <MenuButtons landmarkData={landmarkData} storyIds={storyIds}/> : "" }
        
        {/* MAP BACKGROUND*/}
        <div
          className="absolute z-0 w-full h-full"
          style={{ objectFit: "cover" }}
        >
          {/* <div className="fixed z-0 w-full h-full px-7"> */}
          <Mapbox storyIds={storyIds} />
        </div>

        <Routes>
          <Route element={<Home />} path="/" exact />
          <Route element={<UploadStoriesIntro />} path="/uploadstory" exact />
          <Route
            element={landmarkData ? <StoryCategory landmarkData={landmarkData} /> : ""}
            path="/uploadstory/:landmark"
            exact
          />
          {/* <Route element={<LoadMemories />} path="/loadmemory/:landmark" />  */}
          <Route element={<StoriesData storyIds={storyIds} />} path="/loadmemory/:landmark/:id" />
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
}

export default App;
