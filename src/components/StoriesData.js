import { useState, useEffect } from "react";
import { useParams, useLocation, Outlet, useNavigate } from "react-router-dom";
import SanityClient from "../client";

import AudioPlayer from "../utilities/AudioPlayer";
import stories from "../json/storiesData.json";

import "../css/animation.css";
import "../css/gradientAnimation.css";


export function StoriesData(props) {
  const { landmark, id } = useParams()
  const location = useLocation();
  const currentLandmark = location.pathname.split("/")[2];
  console.log("StoriesData > current Landmark:" + currentLandmark);

  const navigate = useNavigate()
  
  const [currentIndex, setCurrentIndex] = useState(0);

  // let memoryContent = CallSanityAPI(`*[_id == "${id}"]`)

  const [storyIds, setStoryIds] = useState(null)
  const [firstId, setFirstId] = useState(false)
  useEffect(() => {
    console.log("call Sanity to check amout of storys")
    Promise.all([
      SanityClient.fetch(
        `*[_type == "story" && landmark == "${landmark}"]{_id}`
      )
  ])
  .then(([sanityData]) => {
      setStoryIds(sanityData);
      setFirstId(true)
      setStoryCounter(1)
  })
  .catch((err) => {
  })
  }, [landmark])


  const [newStoryIds, setNewStoryIds] = useState(null)
  if(storyIds && firstId){
    setFirstId(false)
    // console.log("amount of id entries: " + JSON.stringify(storyIds))
    var temNewStoryIds = storyIds.filter(function(record) {
      return record['_id'] !== id;
    });
    setNewStoryIds(temNewStoryIds)
    console.log("new amount of id entries: " + JSON.stringify(newStoryIds))
  }

  // let amountOfMemories = storyIds.length
  // let amountOfMemories = props.storyIds.length

  const [data, setData] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [error, setError] = useState(null);
  useEffect(()=>{
      Promise.all([
          SanityClient.fetch(
            `*[_id == "${id}"]`
          )
      ])
      .then(([sanityData]) => {
              console.log("call story data locally")
              setData(sanityData);
              // setIsLoaded(true);
      })
      .catch((err) => {
          // setError(err)
      })
  },[id])
  // let memoryContent = null;


  console.log("memory Content: " + JSON.stringify(data) )

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
  }, [navigate]);

  const [storyCounter, setStoryCounter] = useState(1)

  const goToNext = () => {
    setStoryCounter(storyIds.length === storyCounter ? 1 : storyCounter+1)
    if(storyIds.length === storyCounter){
      const landmarkNumber =  landmark === "droemling" ? 0 : 
                              landmark === "lackova" ? 1 :
                              landmark === "istanbul" ? 2 :
                              landmark === "hama" ? 3 :
                              landmark === "neveeitan" ? 4 :
                              landmark === "dudaimsite" ? 5 : 0
      const randomNumber = [{"landmark_id": 0}, {"landmark_id": 1}, {"landmark_id": 2}, {"landmark_id": 3}, {"landmark_id": 4}, {"landmark_id": 5}]
      var newRandomNumber = randomNumber.filter(function(record) {
        return record['landmark_id'] !== landmarkNumber;
      });
      let shuffledNumbers = newRandomNumber
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
      console.log("random numbers array: " + JSON.stringify(shuffledNumbers))
      const randomNumber2SelectNewLandmark = Math.floor(Math.random() * 4)
      const newId = props.storyIds[shuffledNumbers[randomNumber2SelectNewLandmark].landmark_id].ids[0]._id
      const newLandmark = props.storyIds[shuffledNumbers[randomNumber2SelectNewLandmark].landmark_id].ids[0].landmark
      const newUrlEndpoint = "/loadmemory/" + newLandmark + "/" + newId
      navigate(newUrlEndpoint)
      
      
      // generate new link with new landmark
      // const newUrlEndpoint = props.storyIds[shuffledNumbers[Math.floor(Math.random() * 4)].landmark_id]._id

    } else {
      // switch to next Story of same Landmark
      navigate("/loadmemory/" + landmark + "/" + newStoryIds[storyCounter-1]._id)
    }

    // const isLastStory = currentIndex === stories.stories.length - 1;
    // const newIndex = isLastStory ? 0 : currentIndex + 1;
    // setCurrentIndex(newIndex[storyCounter-1]);
    // navigate(newStoryIds[])
  };

  const goToStory = (storyIndex) => {
    setCurrentIndex(storyIndex);
  };

  if(data && storyIds){
  return (
    <>
      <div className="storiesContainerAnimation fixed flex flex-col z-20 w-[35rem] wideScreen:w-[60rem] pt-24 pl-14 pr-12 h-screen">
        {/* <div className=" bg-white shadow-3xl rounded-2xl col-start-1 row-start-2 row-span-4 p-3 mx-6 h-[440px]"> */}
        <div className="flex pb-10">
          <h1 className="flex-1 text-xl wideScreen:text-2xl font-bold">
            {stories.stories[currentIndex].location},
            {stories.stories[currentIndex].country}
          </h1>
          <h1 className="flex-2 text-xl  wideScreen:text-2xl font-bold">{storyCounter}/{storyIds.length} Memories</h1>
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
          { storyCounter === storyIds.length ? "Next Landmark " : "Next Memory "}&#8594;
          </span>
        </div>
        {/* SOUNDSCAPE PLAY WAVEFORM */}
        <AudioPlayer></AudioPlayer>
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
