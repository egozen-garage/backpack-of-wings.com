// import React from "react";
// import { Story } from "./Story.js";
// import SanityClient from "../client";
// import { useId } from "react";
import { useParams } from "react-router-dom";
import StoryInputForm from "./StoryInputForm.js";
import { MaterialContent } from "./MaterialContent.js";

import "../css/gradientAnimation.css";
import "../css/animation.css";

export function StoryCategory(props) {
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

  return (
    <div className="uploadStories-Wrapper uploadStoriesContainerAnimation fixed flex flex-col top-0 pt-4 z-30 right-0 h-screen w-[50rem] wideScreen:w-[80rem]">


      {/* STORIES MATERIAL CONTAINER */}
      <h1 className="px-8 text-xl wideScreen:text-2xl font-bold">{singleLandmarkData.locationType + ", " + singleLandmarkData.locationName}</h1>
      {/* <div className="gradientMaterialOverlay mt-3 mb-10 pl-[0.4rem] pr-[3rem]"> */}

      { singleLandmarkData ? <MaterialContent singleLandmarkData={singleLandmarkData}/> : "" }
      {/* <MaterialContent singleLandmarkData={singleLandmarkData}/> */}

      {/* STORIES INPUT TEXT CONTAINER */}
      <StoryInputForm currentLandmark={landmark} />
      {/* <Story /> */}
      
    </div>
  );
}
