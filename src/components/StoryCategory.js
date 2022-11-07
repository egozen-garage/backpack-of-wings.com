import React from "react";
// import { Story } from "./Story.js";
// import SanityClient from "../client";
// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StoryInputForm from "./StoryInputForm.js";
import CallSanityAPI from "../utilities/CallSanityAPI"

export function StoryCategory({handleZoom}) {
  handleZoom(true);
  let { landmark } = useParams()
  // NEEDS FIXING! API IN ARRAY CANT BE RETURNED AS PROPER VALUE
  const { data, error, isLoaded } = CallSanityAPI( '*[_type == "landmark" && url.current == "' + landmark + '"]' );

  console.log("storyCatergory - API data: " + JSON.stringify(data))
  console.log("storyCatergory - API error: " + error)
  console.log("storyCatergory - API isloaded: " + isLoaded)
  // console.log("show iFrameCompiler:" + data.material.length)
  return (
    <>
      {/* 
      >>>> UPDATE: ASSIGNED A ROUTING TO STORYINTRO AS SEPARATE PAGE <<<<
      <StoryIntro trigger={true}></StoryIntro> 
      */}

      {/* STORIES INPUT TEXT CONTAINER */}
      <StoryInputForm/>
      {/* <Story /> */}

      {/* STORIES MATERIAL CONTAINER */}
      <div className="z-30 row-start-1 row-span-2 col-span-2 my-6">
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
    </>
  );
}
