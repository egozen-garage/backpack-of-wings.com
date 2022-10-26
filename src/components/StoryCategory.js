import React from "react";
import { Story } from "./Story.js";
import SanityClient from "../client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

export function StoryCategory() {
  let { landmark } = useParams()

  // OPERATION TO CHECK IF ON CORRECT PAGE
  if (landmark === 'israel-dudaimsite') {
    console.log("You're on Dudaim Site!")
  } else {
    console.log("You're on another Landmark")
  }

  // SANITY CLIENT > READ OUT API
  // let [sanityData, setSanityData] = useState(null);
  // const querySanityAPI = '*[_type == "landmark"]{"url":url.current}';


  // useEffect(() => {
  //   Promise.all([SanityClient.fetch(querySanityAPI)])
  //     .then(([sanityData]) => {
  //       setSanityData(sanityData);
  //       console.log("Read Sanity Data inside Story Category : " + sanityData[0].url);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      {/* 
      >>>> UPDATE: ASSIGNED A ROUTING TO STORYINTRO AS SEPARATE PAGE <<<<
      <StoryIntro trigger={true}></StoryIntro> 
      */}

      {/* STORIES INPUT TEXT CONTAINER */}
      <Story />

      {/* 
      TO-DO:
      match "uploadstory/:URL" to specific JSON.ITEM.URL 
      if URL == TRUE 
      show JSON.ITEM[].MATERIAL.CONTENT 
      */}

      {/* STORIES MATERIAL CONTAINER */}
      <div className="z-30 row-start-1 row-span-2 col-span-2 my-6">
        <div className="flex overflow-x-scroll scrollbar-hide">
          <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
            material 01
            { landmark }
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
