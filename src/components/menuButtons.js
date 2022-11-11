import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/menuPanels.css";
import { useLocation } from "react-router-dom";

export default function MenuButtons() {
  const location = useLocation();

  let currentURL = location.pathname.split("/")[1];
  let uploadStoryURL = location.pathname.split("/")[2];
  let URLlength = location.pathname.split("/").length;

  return (
    <>
      {/* LOAD MEMORIES */}
      <NavLink
        className="fixed h-full loadMemoriesBtnContainer gradientLoadMemories z-36 text-lg bg-white w-9"
        to={currentURL === "loadmemory" ? "/" : "/loadmemory"}
      >
        <h1
          className="fixed bottom-5 left-1"
          style={{ writingMode: "vertical-rl" }}
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
        className="fixed h-full right-0 uploadStoryBtnContainer gradientUploadStory z-36 w-9 text-lg bg-white"
        to="/uploadstory"
      >
        <h1
          className="fixed bottom-5 right-1"
          style={{ writingMode: "vertical-rl" }}
        >
          Upload Stories
        </h1>
      </NavLink>

      {/* Right PANEL */}
      <div
        className={
          currentURL === "uploadstory" && uploadStoryURL == undefined
            ? "rightPanel w100"
            : currentURL === "uploadstory" && uploadStoryURL !== undefined
            ? "rightPanel w50"
            : "rightPanel"
        }
      ></div>
    </>
  );
}
