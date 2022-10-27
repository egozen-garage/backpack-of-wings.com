import React from "react";
import { useState } from "react";
import progressbar from "../img/audio-progressbar-01-white.svg";
import "../css/gradientAnimation.css";
import AudioPlayer from "../utilities/AudioPlayer.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SanityClient from "../client";

export function StoryIntro() {
  // >>>TOGGLE STATE DEFINING VISIBILITY OF STORYINTRO<<<
  // const [visible,setVisible] = useState(true);

  let navigate = useNavigate();
  const querySanityAPI = '*[_type == "landmark"]{"url":url.current}';
  let [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    Promise.all([SanityClient.fetch(querySanityAPI)])
      .then(([sanityData]) => {
        setSanityData(sanityData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

//   let urlVariable = sanityData[0].url;
//   console.log(urlVariable);

  return (
    <>
      {/* {visible === true && __INSERT-CODE-HERE-4-VISIBLE-TOGGLE__ } */}
      <div className="flex-col items-center justify-center uploadStories-container gradientBackground fixed z-40 h-screen w-screen">
        <div className="text-white text-xl fixed w-screen top-1/4  pr-[3.7rem]">
          {/* INTRODUCTION TO JONAS */}
          <div className="px-40">
            <p className="py-4">Hello, I am Jonas.</p>
            <p className="py-2">
              In the middle of June 2013, I was born in Drömling, Germany. I
              received a backpack from humans after my first four weeks of
              existence, and it is still on my back.{" "}
            </p>
            <p className="py-2">The backpack helps me to send data.</p>
            <p className="py-2">
              Do you want to listen to the soundscape where I am?
            </p>
          </div>

          {/* AUDIO PROGRESS BAR */}
          <div className="py-20 progressBar-container">
            <img
              className="flex items-center w-screen px-12"
              src={progressbar}
              alt="progressbar"
            />
          </div>

          {/* NEXT BUTTON */}
          <button
            className="z-50 fixed skipBtn px-4 py-2 ml-40 border-white border-solid border-2 rounded-xl"
            onClick={() => navigate("/uploadstory/" + sanityData[0].url)}
          >
            <p>Skip &#10142;</p>
          </button>

          <AudioPlayer></AudioPlayer>
        </div>
      </div>
    </>
  );
}

export default StoryIntro;
