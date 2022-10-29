import React from "react"
import { NavLink } from "react-router-dom"

export default function menuButton(){
    return (
        <>
        <NavLink
          className="loadMemoriesBtnContainer gradientLoadMemories z-45 flex items-center text-lg bg-white w-8 order-1"
          to="/loadmemories"
        >
          <h1 className="" style={{ writingMode: "vertical-rl" }}>
            Load Memories
          </h1>
        </NavLink>

        {/* UPLOAD STORIES */}
        <NavLink
          className="uploadStoryBtnContainer gradientUploadStory z-45 w-8 flex items-center text-lg bg-white order-3"
          to="/uploadstory"
        >
          <h1 className="" style={{ writingMode: "vertical-rl" }}>
            Upload Stories
          </h1>
        </NavLink>
        </>
    )
}

