import React from "react";
import { useState } from "react";
import progressbar from "../img/audio-progressbar-02-black.svg";
import "../css/gradientAnimation.css";
import AudioPlayer from "../utilities/AudioPlayer.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SanityClient from "../client";
import "../css/gradientAnimation.css";

export function UploadStoriesIntro() {
  // >>>TOGGLE STATE DEFINING VISIBILITY OF STORYINTRO<<<
  // const [visible,setVisible] = useState(true);

  // TEMPORARY > UNCOMMENT TO STOP API REQUEST
  let navigate = useNavigate();
  // const querySanityAPI = '*[_type == "landmark"]{"url":url.current}';
  // let [sanityData, setSanityData] = useState(null);

  // useEffect(() => {
  //   Promise.all([SanityClient.fetch(querySanityAPI)])
  //     .then(([sanityData]) => {
  //       setSanityData(sanityData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

//   let urlVariable = sanityData[0].url;
//   console.log(urlVariable);

  return (
    <>
      {/* {visible === true && __INSERT-CODE-HERE-4-VISIBLE-TOGGLE__ } */}
      <div className="uploadStories-container gradientBackground top-0 fixed h-screen w-screen z-30 overflow-scroll py-20">
        <div className="text-xl w-screen top-16  pr-[3.7rem]">
          {/* INTRODUCTION TO JONAS */}
          <div className="text-2xl px-8">
            <p className="font-serif py-4">Hello, I am Jonas.</p>
            <p className="font-serif py-2">
              I’m a white stork with a backpack, and this is my story. Hope my story helps you to imagine being me. Here is my story:{" "}
            </p>
            <p className="font-serif py-2">In the middle of June of 2013, I was born in Drömling, Germany. I received a backpack from humans after my first four weeks of existence, and it is still on my back. When cold winds blew, I had to learn how to fly using the wind relative to my own body in order to go to Africa with my companions. On the first long flight, I was nervous and just followed other older friends. They guided me to locations where we can easily fill up on energy, such as in human-made areas. After several years of harsh flight experience, sometimes I take the lead of our flight group. Plus, we definitely don't need to fly to Africa to survive the winter. We have found a better place, where our food is piled up like a mountain for 24 hours. Just peck it up, stop foraging. Some of us were against this motto like my son Håljer. He was born last year, and is now in Uganda. I did the same when I was a teenager, so I understand his decision. As an adult, I really love this new trending area though. During the stay in this place, I always keep in mind that I will return to my hometown to meet my partner and take care of my home in spring. We are actually a long distance couple. While she used to travel west through Spain during the winter, I would like to fly the opposite route from Germany to Israel. Despite staying at another location in winter, we never missed our first date spot every spring. As of now, we have 7 children. Every autumn some of them choose my partner’s route, and the others fly over my route. It's not a competition of how many children followed me or my partner. Most of the time, we fly in other flight groups. If we had luck, we could see each other. A year ago, I lost two children - X6F89 and X6V90. One was sacrificed by a sea eagle, and one died on an electrical power line. I hope they are flying somewhere in paradise.</p>
            <p className="font-serif py-2">The backpack helps me to send data.</p>
            <p className="font-serif py-2">
              Do you want to listen to the soundscape where I am?
            </p>
          </div>

          {/* AUDIO PROGRESS BAR */}
          <div className="py-5 z-40 progressBar-container fixed bottom-0">
            <img
              className="flex items-center w-screen pl-4 pr-12"
              src={progressbar}
              alt="progressbar"
            />
          </div>
          <div className="gradientPlayer z-20 fixed bottom-0 w-full h-36"></div>

          {/* NEXT BUTTON */}
          <button
            className="z-50 fixed skipBtn px-4 py-2 ml-40 border-black border-solid border-2 rounded-xl"
            // TEMPORARY SOLUTION > ADD SHUFFLE TO URL ITEM ARRAY
            onClick={() => navigate("/uploadstory/israel-dudaimsite")}
          >
            <p>Skip &#10142;</p>
          </button>

          {/* <AudioPlayer></AudioPlayer> */}
        </div>
      </div>
    </>
  );
}

export default UploadStoriesIntro;
