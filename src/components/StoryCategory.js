// import React from "react";
// import { Story } from "./Story.js";
// import SanityClient from "../client";
// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StoryInputForm from "./StoryInputForm.js";
import { useLocation } from "react-router-dom";
import PortableText from "react-portable-text";
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
                      {_type == "googleMaps" ? 
                        (<div>googleMaps</div>) : 
                      _type == "youtube" ?
                        (<div>youtube</div>) :
                      _type == "imageURL" ?
                        (<div>image</div>) :
                      _type == "blockObj" ?
                        (<div>comment section</div>) :
                      _type == "twitter" ?
                        (<div>twitter feed</div>) :
                        (<div>other Material</div>)
                      } 
                    </div>
                  ))}
                </>
              ) :

              currentLandmark == "dudaimsite" ?
              (
                <>
                  {dudaimsite.materialArray.map(({ _type, placeId, youtubeURL, url, blockContent, tweetURL  }) => (
                     <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 overflow-scroll">
                      {_type == "googleMaps" ? 
                        (<iframe src={placeId}></iframe>) : 
                      _type == "youtube" ?
                        (<iframe src={youtubeURL}></iframe>) :
                      _type == "imageURL" ?
                        (<img src={url}/>) :
                      _type == "blockObj" ?
                      // >>> NEEDS IMPROVEMENT: render img element (watch https://www.youtube.com/watch?v=fKXGTJ0NA5c)
                        (<PortableText content={blockContent}/>) :
                      _type == "twitter" ?
                        (<iframe border="0" frameborder="0" height="250" width="550" src={tweetURL}></iframe>) :
                        (<div>other Material</div>)
                      } 
                    </div>
                  ))}
                </>
              ) :

              currentLandmark == "istanbul" ?
              (
                <>
                  {istanbul.materialArray.map(({ _type }) => (
                    <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                    {_type == "googleMaps" ? 
                      (<div>googleMaps</div>) : 
                    _type == "youtube" ?
                      (<div>youtube</div>) :
                    _type == "imageURL" ?
                      (<div>image</div>) :
                    _type == "blockObj" ?
                      (<div>comment section</div>) :
                    _type == "twitter" ?
                      (<div>twitter feed</div>) :
                      (<div>other Material</div>)
                    } 
                  </div>
                  ))}
                </>
              ) :  

              currentLandmark == "lackova" ?
              (
                <>
                  {lackova.materialArray.map(({ _type }) => (
                    <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                      {_type}
                    </div>
                  ))}
                </>
              ) :  

              currentLandmark == "droemling" ?
              (
                <>
                {droemling.materialArray.map(({ _type }) => (
                  <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                    {_type}
                  </div>
                ))}
              </>
              ) : 

              currentLandmark == "neveeitan" &&
              (                
              <>
                {neveeitan.materialArray.map(({ _type }) => (
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
