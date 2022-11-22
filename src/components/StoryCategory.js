// import React from "react";
// import { Story } from "./Story.js";
// import SanityClient from "../client";
import { useId } from "react";
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

    { singleLandmarkData ? <MaterialContent singleLandmarkData={singleLandmarkData}/> : "" }
    {/* <MaterialContent singleLandmarkData={singleLandmarkData}/> */}

      {/* STORIES MATERIAL CONTAINER */}
      {/* <div className="gradientMaterialOverlay my-10 pl-[0.4rem]">
        <div className="flex overflow-x-scroll overflow-y-hidden scrollbar-hide">
          {singleLandmarkData ? (
            <MaterialContent singleLandmarkData={singleLandmarkData}/>
          ) : ("")}
        </div>
      </div> */}

      {/* STORIES INPUT TEXT CONTAINER */}
      <StoryInputForm currentLandmark={landmark} />
      {/* <Story /> */}
      
    </div>
  );
}
