// import React from "react";
// import { Story } from "./Story.js";
// import SanityClient from "../client";
// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StoryInputForm from "./StoryInputForm.js";
import { useLocation } from "react-router-dom";
import CallSanityAPI from "../utilities/CallSanityAPI";
import "../css/gradientAnimation.css";
import "../css/animation.css";

export function StoryCategory(props) {
  const location = useLocation();
  let currentLandmark = location.pathname.split("/")[2];
  let landmark = props.landmarkData
  // let queryLandmark = CallSanityAPI(`*[_type == "landmark" && url.current == "${landmark}"]`);
  // let landmarkContent = queryLandmark.data[0];
  
  console.log("storyCatergory - landmark data: " + props.landmarkData[0].url.current )
  // console.log("Current URL for Sanity: " + currentLandmark)
  // console.log("Sanity API 2:" + JSON.stringify(landmarkContent.country))

  // console.log("Sanity storyCatergory - API data: " + JSON.stringify(data))
  // console.log("Sanity storyCatergory - API error: " + error)
  // console.log("Sanity storyCatergory - API isloaded: " + isLoaded)
  // console.log("Sanity show iFrameCompiler:" + data.material.length)
  return (
    <> 
      <div className="uploadStories-Wrapper uploadStoriesContainerAnimation fixed flex flex-col top-0 pt-4 z-30 right-0 h-screen w-[50rem] wideScreen:w-[80rem]">

        {/* STORIES MATERIAL CONTAINER */}
        <div className="gradientMaterialOverlay my-10 pl-[0.4rem]">
          <div className="flex overflow-x-scroll scrollbar-hide">
            <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
              {/* {data._type} */}
            </div>
            <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
              material 02
            </div>
            <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
              material 03
            </div>
            <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
              material 04
            </div>
            <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
              material 05
            </div>
            <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
              material 06
            </div>
          </div>
        </div>

        {/* STORIES INPUT TEXT CONTAINER */}
        <StoryInputForm currentLandmark={currentLandmark}/>
        {/* <Story /> */}
      </div>

    </>
  );
}
