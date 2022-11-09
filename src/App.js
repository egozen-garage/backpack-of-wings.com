import { NavLink, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import { LoadMemories } from "./components/LoadMemories";
import { StoryCategory } from "./components/StoryCategory";
import { UploadStoriesIntro } from "./components/UploadStoriesIntro";
import { Impressum } from "./components/Impressum";
import { NotFound } from "./components/NotFound";
import { LandingPage } from "./components/LandingPage";
import Mapbox from "./components/Mapbox";
// import CallSanityAPI from "./utilities/CallSanityAPI";
import MenuButton from "./components/menuButtons";
import AboutWindow from "./components/aboutWindow";
import './css/gradientAnimation.css';
// import CallWeatherData from "./utilities/CallWeatherWind";

function App() {
  const [buttonPopup, setButtonPopup] = useState(true);
  const [zoomOut, setZoomOut] = useState(false);
  const handleZoom = (value) => {
    // 👇️ take parameter passed from Child component
    setZoomOut(value);
    // console.log("handle zoom from child: " + zoomOut);
  };


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
      {/* <CallWeatherData/> */}
      {/* INTRODUCTORY PAGE */}
      <LandingPage
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
      ></LandingPage>
      {/* <CallSanityAPI query={query}/> */}

      {/* PARENT GRID */}
      <div className="ParentGrid wrapper flex justify-between min-h-screen">
        
        <AboutWindow/>
        
        <MenuButton/>

        {/* EVERY OTHER PAGE */}
        <div className="ChildGridContainer relative wrapper-content order-2 grid grid-cols-2 grid-rows-6 grid-flow-col auto-rows-fr w-full">
          {/* MAP BACKGROUND*/}
          <div
            className="absolute z-0 w-full h-full"
            style={{ objectFit: "cover" }}
          >
            {/* <div className="fixed z-0 w-full h-full px-7"> */}

            <Mapbox zoomOut={zoomOut}/>
          </div>

          <Routes>
            <Route  element={ <Home handleZoom={handleZoom} /> }
                    path="/" exact />
            <Route  element={ <UploadStoriesIntro />} 
                    path="/uploadstory" exact />
            <Route  element={ <StoryCategory handleZoom={handleZoom} /> }
                    path="/uploadstory/:landmark" exact />
            <Route  element={ <LoadMemories handleZoom={handleZoom} /> }
                    path="/loadmemories"/>
            <Route  element={<Impressum />} 
                    path="/impressum" exact />
            <Route  element={<NotFound />} 
                    path="*" exact />
          </Routes>
        </div>

        <div className="inline-flex text-sm text-white fixed z-40 bottom-3 right-4 px-9">
          {/* BACK TO DASHBOARD BUTTON */}
          <NavLink className="px-3" to="/" reloadDocument>
            <p>Dashboard</p>
          </NavLink>
        </div>
      </div>

      {/* IDLE TIMER */}
      {/* <IdleTimerContainer></IdleTimerContainer> */}
    </>
  );
}

export default App;
