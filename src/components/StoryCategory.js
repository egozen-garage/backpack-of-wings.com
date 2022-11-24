// import React from "react";
// import { Story } from "./Story.js";
// import SanityClient from "../client";
// import { useId } from "react";
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

  return (
    <div className="uploadStories-Wrapper uploadStoriesContainerAnimation fixed flex flex-col top-0 pt-4 z-30 right-0 h-screen w-[35rem] xl:w-[50rem] wideScreen:w-[80rem]">
      <div className="ml-auto mr-[4.5rem] lg:mr-auto lg:ml-0 pl-3 pb-2">
        <button 
          type="button" 
          onClick={() => {navigate("/uploadstory")}} 
          style={backButtonStyle} 
          className={backButtonClass} >
                  &#8592; 
                  about Jonas
        </button>
      </div>
      {/* STORIES MATERIAL CONTAINER */}
      <h1 className="px-8 text-xl wideScreen:text-2xl font-bold">{singleLandmarkData.locationType + ", " + singleLandmarkData.locationName}</h1>
      {/* <div className="gradientMaterialOverlay mt-3 mb-10 pl-[0.4rem] pr-[3rem]"> */}

      { singleLandmarkData ? <MaterialContent singleLandmarkData={singleLandmarkData}/> : "" }
      {/* <MaterialContent singleLandmarkData={singleLandmarkData}/> */}

      {/* STORIES INPUT TEXT CONTAINER */}
      <StoryInputForm currentLandmark={landmark} landmarkData={landmarkData}/>
      {/* <Story /> */}
    </div>
  );
}
