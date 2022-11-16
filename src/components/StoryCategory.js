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

  let hama = landmark[0]
  let dudaimsite = landmark[1]
  let istanbul = landmark[2]
  let lackova = landmark[3]
  let droemling = landmark[4]
  let neveeitan = landmark[5]
  // let queryLandmark = CallSanityAPI(`*[_type == "landmark" && url.current == "${landmark}"]`);
  // let landmarkContent = queryLandmark.data[0];
  
  console.log("storyCategory > current Landmark:" + currentLandmark)
  console.log("storyCatergory > landmark data: " + landmark[0].url.current )
  console.log("storyCatergory > materials of landmark : " + JSON.stringify(hama.materialObj.materialArray.length) )
  // console.log("storyCatergory > materials array of landmark : " + materialArray)

  // console.log("Current URL for Sanity: " + currentLandmark)
  // console.log("Sanity API 2:" + JSON.stringify(landmarkContent.country))

  // console.log("Sanity storyCatergory - API data: " + JSON.stringify(data))
  // console.log("Sanity storyCatergory - API error: " + error)
  // console.log("Sanity storyCatergory - API isloaded: " + isLoaded)
  // console.log("Sanity show iFrameCompiler:" + data.material.length)
  return (
      <div className="uploadStories-Wrapper uploadStoriesContainerAnimation fixed flex flex-col top-0 pt-4 z-30 right-0 h-screen w-[50rem] wideScreen:w-[80rem]">

        {/* STORIES MATERIAL CONTAINER */}
        <div className="gradientMaterialOverlay my-10 pl-[0.4rem]">
          <div className="flex overflow-x-scroll scrollbar-hide">
            {
              currentLandmark == "hama" ?
              (
                <>
                  {hama.materialObj.materialArray.map(({ _type }) => (
                    <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                      {_type}
                    </div>
                  ))}
                </>
              ) :

              currentLandmark == "dudaimsite" ?
              (
                <>
                  {dudaimsite.materialObj.materialArray.map(({ _type }) => (
                    <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                      {_type}
                    </div>
                  ))}
                </>
              ) :

              currentLandmark == "istanbul" ?
              (
                <>
                  {istanbul.materialObj.materialArray.map(({ _type }) => (
                    <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                      {_type}
                    </div>
                  ))}
                </>
              ) :  

              currentLandmark == "lackova" ?
              (
                <>
                  {lackova.materialObj.materialArray.map(({ _type }) => (
                    <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                      {_type}
                    </div>
                  ))}
                </>
              ) :  

              currentLandmark == "droemling" ?
              (
                <>
                {droemling.materialObj.materialArray.map(({ _type }) => (
                  <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                    {_type}
                  </div>
                ))}
              </>
              ) : 

              currentLandmark == "neveeitan" &&
              (                
              <>
                {neveeitan.materialObj.materialArray.map(({ _type }) => (
                  <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                    {_type}
                  </div>
                ))}
              </>)
            }
          </div>
        </div>

        {/* STORIES INPUT TEXT CONTAINER */}
        <StoryInputForm currentLandmark={currentLandmark}/>
        {/* <Story /> */}
      </div>
  );
}
