import { StoriesData } from "./StoriesData.js";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { useEffect } from "react";
import CallSanityAPI from "../utilities/CallSanityAPI";
import { useEffect, useState, useCallback, useRef } from "react";
import SanityClient from "../client";


export function LoadMemories() {
  console.log("Loadmemories - parent") 
  const navigate = useNavigate()
  // function Redirect2Story(storyId){ navigate(storyId)}
  const { landmark, id } = useParams()
  // const memoryIDs = CallSanityAPI(`*[_type == "story" && landmark == "${landmark}"]{_id}`)

  // const [trackerNewLandmark, setTrackerNewLandmark] = useState(0)
  // const [counterTrackerNewLandmark, setCounterTrackerNewLandmark] = useState(1)

  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  useEffect(()=>{
      Promise.all([
          SanityClient.fetch(
            `*[_type == "story" && landmark == "${landmark}"]{_id}`
          )
      ])
      .then(([sanityData]) => {
              console.log("Loadmemories - call story data locally")
              setData(sanityData);
              setIsLoaded(true);
                // navigate(sanityData[0]._id)
              
              // setTrackerNewLandmark(1)
      })
      .catch((err) => {
          setError(err)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[landmark])

  // const [trackerNewLandmark, setTrackerNewLandmark] = useState(0)
  // const [counterTrackerNewLandmark, setCounterTrackerNewLandmark] = useState(1)
  // if(!memoryIDs.isLoaded){
  //   console.log("Loadmemories - waiting for new Story ID")
  // } else (
  //   console.log("Loadmemories - waiting for new Story ID : incoming")
  // )

  // const memoryIDs = useCallback(() => {
  //   return CallSanityAPI(`*[_type == "story" && landmark == "${landmark}"]{_id}`)
  // }, [landmark])
  // add shuffle to memory IDs

  console.log("Loadmemories -  data: " + JSON.stringify(data) )


 
  useEffect(() => {
    if(data){
        if(!id){
          navigate(data[0]._id)
          console.log("Loadmemories - landmark: " + landmark)
      }
    }
  }, [id, data, navigate, landmark])

  
  // useEffect(() =>{
  //   const landmarkOptions = ["istanbul", "droemling", "lackova", "hama", "neveeitan", "dudaimsite"]
  //   const randomNumber = Math.floor(Math.random() * 6);
  //   navigate(landmarkOptions[randomNumber])
  // }, [navigate])
  // check if url has location and story id
  // if not random pick one of 6 && select random Story id
  // 

  if(data && id){
    console.log("Loadmemories - load child ")
  return (
    <>
      { data ? <StoriesData memoryIDs={data} /> : "" }
      {/* <div class="pt-3 loadMemories col-start-2 row-start-2 row-span-3 px-9">
                <h1>Load Memories</h1>
                <Link to={'/loadmemories/'+ id }>Location { id }</Link>
                <br />
                <Link to="/loadmemories/2">Neve Eitan, Israel</Link>
                <br />  
                <Link to="/loadmemories/3">Hama, Syria and Hatay, Turkey</Link> 
            </div>
            <Outlet />  */}

      {/* LEFT PANEL */}
      {/* <div className="leftPanel move"></div> */}

    </>
  );
          }

}

export default LoadMemories;
