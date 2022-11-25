import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SanityClient from "../client";

export default function Carousel(props) {
  const storyCounter = props.storyCounter
  const location = useLocation();
  const currentLandmark = location.pathname.split("/")[2];

  // define states
  const [storyArray, setStoryArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [varWidth, setVarWidth] = useState("100")
  const [isMobile, setIsMobile] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // to fetch all stories of current location
  useEffect(() => {
    Promise.all([
      SanityClient.fetch(
        `*[_type == "story" && landmark == "${currentLandmark}"]`
      ),
    ])
      .then(([sanityData]) => {
        console.log("call storyArray locally");
        setStoryArray(sanityData);
        // setIsLoaded(true);
      })
      .catch((err) => {
        // setError(err)
      });
  }, [currentLandmark]);

  // hooks next button by assigning storyCounter to update activeIndex var 
  useEffect(() => {
    setActiveIndex((storyCounter-1));
  }, [storyCounter])

  // NEXT - PREVIOUS button functions
  // function onNextClick() {
  //   if (activeIndex < storyArray.length - 1) {
  //     setActiveIndex(activeIndex + 1);
  //   } else {
  //     setActiveIndex(0);
  //   }
  // }

  // function onPrevClick() {
  //   if (activeIndex > 0) {
  //     setActiveIndex(activeIndex - 1);
  //   } else {
  //     setActiveIndex(storyArray.length - 1);
  //   }
  // }

  // read current window width
  useEffect(() => {
    window.addEventListener("resize", (event) => {
      setWindowWidth(window.innerWidth);
    });
  }, [])

  // assign to variable varWdith
  useEffect(() => {
    if (windowWidth < 480 ) {
      setIsMobile(true)
    }
    // laptop width
    if (windowWidth >= 480 && windowWidth < 1800 ) {
      setVarWidth("27"); 
      setIsMobile(false)
    }
    // wide screen width
    if (windowWidth >= 1800 ) {
      setVarWidth("50"); 
      setIsMobile(false)
    }
  }, [windowWidth])
  

  // Carousel Style attributes
  let containerStyle = {
    display: "flex",
    // width: `${varWidth}${widthUnit}`,
    overflow: "hidden",
    zIndex: '1000'
  };

  // let buttonStyle = {
  //   width: "50px",
  // };

  let slideContainerStyle = {
    transform: `translateX(${isMobile? activeIndex * - (window.innerWidth / 18) : activeIndex * - varWidth}rem)`,
    transition: "0.2s",
    position: "relative",
    display: "flex",
    margin: "0",
    padding: "0",
  };

  let listItemStyle = {
    width: `${isMobile ? window.innerWidth / 18 : varWidth}rem`,
    listStyle: "none",
    /*font-size: 112px;*/
    color: "black",
    padding: "0 4px 0 4px",
  };

  return (
    <>
      {/* PREVIOUS - BACK BUTTONS */}
      {/* <div style={buttonStyle}>
        <button onClick={onPrevClick}>◀</button>
        <button onClick={onNextClick}>▶</button>
      </div> */}
      <div className="container" style={containerStyle}>
        
        <div style={slideContainerStyle}>
          {storyArray.map((data) => (
            <p style={listItemStyle} key={data._id}>
              {data.message}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
