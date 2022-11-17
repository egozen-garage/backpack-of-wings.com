import stories from "../json/storiesData.json";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../css/animation.css";
// import { useLocation } from "react-router-dom";
import "../css/gradientAnimation.css";
import progressbar from "../img/audio-progressbar-01-black.svg";
// import { Link, Outlet } from 'react-router-dom';
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import CallSanityAPI from "../utilities/CallSanityAPI";
import { redirect } from "react-router-dom";
import SanityClient from "../client";



export function StoriesData(props) {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [currentIndex, setCurrentIndex] = useState(0);

  let amountOfMemories = props.memoryIDs.length
  // let memoryContent = CallSanityAPI(`*[_id == "${id}"]`)

  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  useEffect(()=>{
      Promise.all([
          SanityClient.fetch(
            `*[_id == "${id}"]`
          )
      ])
      .then(([sanityData]) => {
              console.log("call story data locally")
              setData(sanityData);
              setIsLoaded(true);
      })
      .catch((err) => {
          setError(err)
      })
  },[id])
  // let memoryContent = null;


  // console.log("memory Content: " + JSON.stringify(memoryContent.data[0].message) )

  // const [memoryId2URL, setMemoryId2URL] = useState(false);

  // let currentMemoryID = props.memoryIDs.data[0]._id
  // console.log("currentMemoryID " + currentMemoryID)
  // const memoryId2URL = props.memoryIDs[0]._id
  // useEffect(() => {

  //   navigate(memoryId2URL)
  // }, [memoryId2URL, navigate])
  // console.log("memory id: " + JSON.stringify(props.memoryIDs[0]._id))


  // const id = "tHeP5c0LRgwgppIjwZnMBZ"
  // let memoryContent = CallSanityAPI(`*[_type == "story" && _id == "${currentMemoryID}"]`)
  // console.log("memory content: " + JSON.stringify(memoryContent))  

  // const goToPrev = () => {
  //   const isFirstStory = currentIndex === 0;
  //   const newIndex = isFirstStory
  //     ? stories.stories.length - 1
  //     : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // };

  useEffect(() => {
    window.onpopstate = e => {
      navigate("/")
    };
  });

  const [storyCounter, setStoryCounter] = useState(1)

  const goToNext = () => {
    setStoryCounter(amountOfMemories === storyCounter ? 1 : storyCounter+1)
    const isLastStory = currentIndex === stories.stories.length - 1;
    const newIndex = isLastStory ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToStory = (storyIndex) => {
    setCurrentIndex(storyIndex);
  };

  if(data){
  return (
    <>
      <div className="storiesContainerAnimation fixed flex flex-col z-20 w-[35rem] wideScreen:w-[60rem] pt-24 pl-14 pr-12 h-screen">
        {/* <div className=" bg-white shadow-3xl rounded-2xl col-start-1 row-start-2 row-span-4 p-3 mx-6 h-[440px]"> */}
        <div className="flex pb-10">
          <h1 className="flex-1 text-xl wideScreen:text-2xl font-bold">
            {stories.stories[currentIndex].location},
            {stories.stories[currentIndex].country}
          </h1>
          <h1 className="flex-2 text-xl  wideScreen:text-2xl font-bold">{storyCounter}/{amountOfMemories} Memories</h1>
        </div>
        {/* STORY TEXT */}
        <p className="noScrollBar gradientStoryOverlay font-sans text-base wideScreen:text-xl wideScreen:leading-8 overflow-y-scroll h-auto pb-32">
          {data[0].message}
          {/* {stories.stories[currentIndex].text} */}
        </p>
        {/* NEXT BUTTON */}
        <div
          className="font-serif font-bold text-lg wideScreen:text-2xl z-50 w-1/2 cursor-e-resize mt-auto pb-5"
          onClick={goToNext}
        >
          <span className="pulsateBlack">
          { storyCounter === amountOfMemories ? "Next Landmark " : "Next Memory "}&#8594;
          </span>
        </div>
        {/* AUDIO PROGRESS BAR */}
        <div className="py-4 z-32 progressBar-container">
          <img
            className="object-cover h-[4rem] wideScreen:h-[5rem]"
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
}

export default StoriesData;
