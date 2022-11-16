// import React from "react";
// import { Story } from "./Story.js";
// import SanityClient from "../client";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import StoryInputForm from "./StoryInputForm.js";
// import CallSanityAPI from "../utilities/CallSanityAPI"
import { useLocation } from "react-router-dom";
// import CallSanityAPI from "../utilities/CallSanityAPI"
import "../css/gradientAnimation.css";
import "../css/animation.css";

export function StoryCategory() {
  const location = useLocation()
  let currentLandmark = location.pathname.split("/")[2];
  console.log("storyCatergory: " + currentLandmark)
  

  // let { landmark } = useParams()
  // NEEDS FIXING! API IN ARRAY CANT BE RETURNED AS PROPER VALUE
  // const { data, error, isLoaded } = CallSanityAPI( '*[_type == "landmark" && url.current == "' + landmark + '"]' );

  // console.log("storyCatergory - API data: " + JSON.stringify(data))
  // console.log("storyCatergory - API error: " + error)
  // console.log("storyCatergory - API isloaded: " + isLoaded)
  // console.log("show iFrameCompiler:" + data.material.length)
  return (
    <>
      {/* 
      >>>> UPDATE: ASSIGNED A ROUTING TO STORYINTRO AS SEPARATE PAGE <<<<
      <StoryIntro trigger={true}></StoryIntro> 
      */}
      <div className="uploadStories-Wrapper uploadStoriesContainerAnimation fixed flex flex-col top-0 pt-4 z-30 right-0 h-screen w-[50rem] wideScreen:w-[80rem]">

        {/* STORIES MATERIAL CONTAINER */}
        <div className="flex-1 gradientMaterialOverlay my-10 pl-[0.4rem]">
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
