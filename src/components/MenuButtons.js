import React from "react";
import { NavLink } from "react-router-dom";
import "../css/menuPanels.css";
import { useLocation } from "react-router-dom";

export default function MenuButtons(props) {
  const location = useLocation();

  // const storyIds = props.storyIds

  let currentURL = location.pathname.split("/")[1];
  let uploadStoryURL = location.pathname.split("/")[2];
  // let URLlength = location.pathname.split("/").length;

  // SELECT RANDOM URL
  const randomNumber = Math.floor(Math.random() * 5)
  const urlLandmark = props.storyIds[randomNumber].ids[0].landmark
  const amountOfIds = props.storyIds[randomNumber].ids.length
  const storyId = props.storyIds[randomNumber].ids[Math.floor(Math.random() * amountOfIds)]._id
  const urlEndpoint = "/loadmemory/" + urlLandmark + "/" + storyId
  
  // console.log("random url endpoint - menu" + JSON.stringify(urlEndpoint))
  // console.log("menuButton: " + landmark)
  // console.log("menu random url: " + urlLandmark + "/" + storyId)

  return (
    <>
      {/* LOAD MEMORIES */}
      <NavLink
        className="fixed button bottom-0 mobileHorizontal:bottom-0 h-10 mobileHorizontal:h-full w-full mobileHorizontal:w-9 wideScreen:w-12 loadMemoriesBtnContainer gradientLoadMemories z-36 text-lg wideScreen:text-2xl"
        to={currentURL === "loadmemory" ? "/" : urlEndpoint }
      >
        <h1
          className="fixed bottom-0 mobileHorizontal:bottom-5 px-4 mobileHorizontal:px-[1.2rem] wideScreen:px-[0.4rem] mb-2 mobileHorizontal:mb-0 wideScreen:mb-6 transformRotatePos w-auto"
          // style={{ writingMode: "vertical-rl" }}
        >
          Load Memories
        </h1>
      </NavLink>

      {/* LEFT PANEL */}
      <div
        className={
          currentURL === "loadmemory" ? "leftPanel w50" : "leftPanel"
        }
      ></div>

      {/* RIGHT PANEL: UPLOAD STORIES */}
      <NavLink
        className="fixed button hidden mobileHorizontal:block h-full right-0 uploadStoryBtnContainer gradientUploadStory z-36 text-lg wideScreen:text-2xl w-9 wideScreen:w-12"
        to="/uploadstory"
      >
        <h1
          className="fixed bottom-5 right-1 wideScreen:right-[0.4rem] "
          style={{ writingMode: "vertical-rl" }}
        >
          Upload Stories
        </h1>
      </NavLink>

      {/* Right PANEL */}
      <div className="">
        <div
          className={
            currentURL === "uploadstory" && uploadStoryURL === undefined
              ? "rightPanel w100"
              : currentURL === "uploadstory" && uploadStoryURL !== undefined
              ? "rightPanel w50"
              : "rightPanel"
          }
        ></div>
      </div>
    </>
  );
}
