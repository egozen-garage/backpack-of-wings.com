// import React from "react";
// import { Story } from "./Story.js";
// import SanityClient from "../client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import StoryInputForm from "./StoryInputForm.js";
import { MaterialContent } from "./MaterialContent.js";
import { useNavigate } from "react-router-dom";

import "../css/gradientAnimation.css";
import "../css/animation.css";

export function StoryCategory(props) {
  const navigate = useNavigate()
  const { landmark } = useParams();
  let landmarkData = props.landmarkData;

  const data = () => {
    let tempData;
    for (const x in landmarkData) {
      if (landmark === landmarkData[x].url.current) {
        tempData = landmarkData[x];
      }
    }
    return tempData;
  };

  const singleLandmarkData = data();

  // const backButtonClass = "hover:bg-backpackPink p-1 px-2 mr-10 float-left outline outline-1 w-auto rounded-[2rem] font-serif font-bold"
  const backButtonClass = "button text-xs wideScreen:text-sm font-serif"
  const backButtonStyle = {
    // backgroundColor: "rgba(240, 180, 252, 0.5)",
  }

  const [hideMobileLandmarkMenu, setHideMobileLandmarkMenu] = useState(true)


  return (
    // <div className="uploadStories-Wrapper uploadStoriesContainerAnimation fixed flex flex-col top-0 pt-4 z-30 right-0 h-screen w-[35rem] xl:w-[50rem] wideScreen:w-[80rem]">
    <div className="uploadStories-Wrapper uploadStoriesContainerAnimation fixed flex flex-col top-0 pt-4 z-30 right-0 h-screen w-full sm:w-[35rem] xl:w-[50rem] wideScreen:w-[80rem]">
      <div className="sm:inline hidden  ml-auto mr-[4.5rem] lg:mr-auto lg:ml-0 pl-3 pb-2">
        <button 
          type="button" 
          onClick={() => {navigate("/uploadstory")}} 
          style={backButtonStyle} 
          className={backButtonClass} >
                  &#8592; 
                  about Jonas
        </button>
      </div>


      <div className="mt-20 mb-8 sm:hidden inline font-serif text-xl font-bold w-11/12   left-0 right-0 bg-transparent " name="landmarkSelector" id="landmarkSelector" >
        <div className="flex flex-nowrap ">
          <button onClick={() => {navigate("/uploadstory"); }}className="button text-sm ">about Jonas</button>
          <button onClick={() => setHideMobileLandmarkMenu(!hideMobileLandmarkMenu)} type="button" className=" button text-sm place-content-right">Select location</button>
        </div>
        { hideMobileLandmarkMenu ? "" :
            <div className="pb-300">
              <button type="button" className="button w-full place-content-center" onClick={() => {navigate("/uploadstory/droemling"); setHideMobileLandmarkMenu(true)}}>Bird Sanctuary, Drömling</button>
              <button type="button" className="button w-full place-content-center" onClick={() => {navigate("/uploadstory/lackova"); setHideMobileLandmarkMenu(true)}} >Grazing Land, Lacková</button>
              <button type="button" className="button w-full place-content-center" onClick={() => {navigate("/uploadstory/istanbul"); setHideMobileLandmarkMenu(true)}}>Landfill, Istanbul</button>
              <button type="button" className="button w-full place-content-center" onClick={() => {navigate("/uploadstory/hama"); setHideMobileLandmarkMenu(true)}}>Agricultural Land, Al-Hamah</button>
              <button type="button" className="button w-full place-content-center" onClick={() => {navigate("/uploadstory/neveeitan"); setHideMobileLandmarkMenu(true)}}>Fishpond, Neve Eitan</button>
              <button type="button" className="button w-full place-content-center mb-[500px]" onClick={() => {navigate("/uploadstory/dudaimsite"); setHideMobileLandmarkMenu(true)}}>Landfill, Asad Duda'im Site</button>
            </div>
        }
      </div>


      {/* STORIES MATERIAL CONTAINER */}
      <h1 className="px-8 text-xl wideScreen:text-2xl font-bold">{singleLandmarkData.locationType + ", " + singleLandmarkData.locationName}</h1>


      { singleLandmarkData ? <MaterialContent singleLandmarkData={singleLandmarkData}/> : "" }
      {/* <MaterialContent singleLandmarkData={singleLandmarkData}/> */}

      {/* STORIES INPUT TEXT CONTAINER */}
      <StoryInputForm currentLandmark={landmark} landmarkData={landmarkData}/>
      {/* <Story /> */}
    </div>
  );
}
