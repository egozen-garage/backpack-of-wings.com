import { React, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import { About } from "./About";
import styled from "styled-components";

import "../css/gradientAnimation.css";
import "../css/animation.css";


const PanelContent = styled(animated.div)`
  color: black;
  overflow: scroll;
  z-index: 49;
`;


export default function AboutWindow() {
  const location = useLocation();
  let currentURL = location.pathname;

  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapsible = () => {
    setIsOpen((prevState) => !prevState);
  };

  const AboutAnimatedStyle = useSpring({
    height: isOpen ? "100vh" : "0",
  });

  console.log("toggleeCollapsible is: " + isOpen)

  return (
    <>
      <div className="z-60 mobileHorizontal:z-60 aboutBackground fixed flex flex-wrap top-0 pb-6 px-0 mobileHorizontal:px-12 wideScreen:px-16 mt-0 sm:mt-2 wideScreen:mt-4">

        {/* BACKPACK OF WINGS BUTTON */}
        <button onClick={toggleCollapsible} className="flex-1 my-0">
          <div className={isOpen? "buttonActive" : "buttonInactive white"}>
            <h1 className="flex flex-wrap text-[0.95rem] xs:text-[1rem] mobileHorizontal:text-md tablet:text-xl w-full min-w-[15rem] mx-1 py-1">
              <span className="ml-auto pr-2 float-right">The Backpack of Wings:</span><span className="mr-auto float-left">Sensory Networks</span>
            </h1>
            {isOpen && (
              <span className="font-mono text-s tablet:text-xl text-white pl-2 tablet:pl-2 pr-1 py-1 mt-0 tablet:mt-[1px] ml-auto">x</span>
            )}
          </div>
        </button>

        {/* IMPRESSUM */}
        <div className={isOpen ? "animateOpacity show" : "animateOpacity"}>
          <div className="flex-2 buttonInactive white my-0 mobileHorizontal:my-4 mx-4 mobileHorizontal:mx-6">
            <NavLink to="/impressum" onClick={toggleCollapsible}>
              <h1 className="text-[0.95rem] xs:text-[1rem] mobileHorizontal:text-md tablet:text-xl mx-2 py-1">
                Impressum
              </h1>
            </NavLink>
          </div>
        </div>

      </div>

      {/* LIGHTRAY HEADER */}
      <div className={currentURL === "/" ? "dashboardLight show" : "dashboardLight"}>
      </div>

      {/* COLLAPSIBLE */}
      <PanelContent
        style={AboutAnimatedStyle}
        className="gradientAboutPageOverlay noScrollBar gradientDashboard_header fixed w-full top-0 left-0"
      >        <About />
      </PanelContent>
      <div className={isOpen ? "animateAboutOpacity show" : "animateAboutOpacity"}></div>
    </>
  );
}
