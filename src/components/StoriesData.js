import stories from "../json/storiesData.json";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import "../css/animation.css";
// import { useLocation } from "react-router-dom";
import "../css/gradientAnimation.css";
import progressbar from "../img/audio-progressbar-01-black.svg";
// import { Link, Outlet } from 'react-router-dom';
// import CallSanityAPI from "../utilities/CallSanityAPI";
import { useEffect } from "react";

export function StoriesData() {
  // const location = useLocation();
  // let urlLandmark = location.pathname.split("/")[2];
  // let urlStoryNumber = location.pathname.split("/")[3];

  // console.log("loadmemory url: "  + urlLandmark +" "+ urlStoryNumber);


  // call sanity data
  useEffect(() => {
    // CallSanityAPI('*[_type == "landmark"]{url{current}, locationName, country}')
  }, [])


  // check if url has location and story id
  // if not random pick one of 6 && select random Story id
  // 

  const [currentIndex, setCurrentIndex] = useState(0);

  // const goToPrev = () => {
  //   const isFirstStory = currentIndex === 0;
  //   const newIndex = isFirstStory
  //     ? stories.stories.length - 1
  //     : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // };

  const goToNext = () => {
    const isLastStory = currentIndex === stories.stories.length - 1;
    const newIndex = isLastStory ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToStory = (storyIndex) => {
    setCurrentIndex(storyIndex);
  };

  return (
    <>
      <div className="storiesContainerAnimation fixed flex flex-col z-20 w-[35rem] wideScreen:w-[60rem] pt-24 pl-14 pr-12 h-screen">
        {/* <div className=" bg-white shadow-3xl rounded-2xl col-start-1 row-start-2 row-span-4 p-3 mx-6 h-[440px]"> */}
        <div className="flex pb-10">
          <h1 className="flex-1 text-xl wideScreen:text-2xl font-bold">
            {stories.stories[currentIndex].location},
            {stories.stories[currentIndex].country}
          </h1>
          <h1 className="flex-2 text-xl  wideScreen:text-2xl font-bold">1/10 Memories</h1>
        </div>
        {/* STORY TEXT */}
        <p className="noScrollBar gradientStoryOverlay font-sans text-base wideScreen:text-xl wideScreen:leading-8 overflow-y-scroll h-auto pb-32">
          {stories.stories[currentIndex].text}
        </p>
        {/* NEXT BUTTON */}
        <div
          className="font-serif font-bold text-lg wideScreen:text-2xl z-50 w-1/2 cursor-e-resize mt-auto pb-10"
          onClick={goToNext}
        >
          Next Memory &#8594;
        </div>
        {/* AUDIO PROGRESS BAR */}
        <div className="py-4 z-32 progressBar-container">
          <img
            className="object-cover h-[3rem] wideScreen:h-[5rem]"
            src={progressbar}
            alt="progressbar"
          />
        </div>
      </div>
      <div className="px-3">
        {stories.stories.map((story, storyIndex) => (
          <div
            className="bg-white rounded-2xl w-3 h-3 m-6 cursor-pointer"
            key={storyIndex}
            onClick={() => goToStory(storyIndex)}
          >
            <p className="text-white px-5">Location{storyIndex}</p>
          </div>
        ))}
      </div>
      <Outlet />
    </>
  );
}

export default StoriesData;
