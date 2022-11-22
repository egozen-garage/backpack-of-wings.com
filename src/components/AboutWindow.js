import React from "react";
import { NavLink } from "react-router-dom";
import { About } from "./About";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "../css/gradientAnimation.css";
import "../css/animation.css";
import { useLocation } from "react-router-dom";


export default function AboutWindow() {
  const location = useLocation();
  let currentURL = location.pathname;
  console.log("show current URL navigation : " + currentURL)

  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapsible = () => {
    setIsOpen((prevState) => !prevState);
  };
  const [impressumIsOpen, setImpressumIsOpen] = useState(false);
  console.log("impressumIsOpen " + impressumIsOpen)
  const toggleImpressum = () => {
    setImpressumIsOpen((prevImpressumState) => !prevImpressumState);
  }
  const AboutAnimatedStyle = useSpring({
    height: isOpen ? "100vh" : "0",
  });
  const PanelContent = styled(animated.div)`
    color: black;
    overflow: scroll;
    z-index: 49;
  `;

  return (
    <>
      <div className="z-50 aboutBackground fixed flex flex-wrap top-0 pb-6 px-14">

        {/* BACKPACK OF WINGS BUTTON */}
        <button onClick={toggleCollapsible} className="flex-1 mt-5">
          <div className={isOpen? "buttonActive" : "buttonInactive"}>
            <h1 className="flex flex-wrap text-lg tablet:text-xl min-w-[12rem] mx-1 py-1">
              <span className="mx-auto pr-2">The Backpack of Wings:</span><span className="mx-auto">Sensory Networks</span>
            </h1>
            {isOpen && (
              <span className="font-mono text-lg tablet:text-xl text-white pl-2 pr-1 py-1 mt-[1px] ml-auto">x</span>
            )}
          </div>
        </button>

        {/* IMPRESSUM */}
        <div className={isOpen ? "animateOpacity show" : "animateOpacity"}>
          <div className="flex-2 buttonInactive mx-0 mobileHorizontal:mx-6 mt-5">
            <NavLink to="/impressum" onClick={toggleImpressum}>
              <h1 className="text-xl mx-2 py-1">
                Impressum
              </h1>
            </NavLink>
          </div>
        </div>

      </div>

      {/* LIGHTRAY HEADER */}
      <div className={currentURL === "/" ? "dashboardLight show" : "dashboardLight"}>
      </div>
      {/* currentURL === "/" &&  */}

      {/* COLLAPSIBLE */}
      <PanelContent
        style={AboutAnimatedStyle}
        className="noScrollBar gradientDashboard_header fixed w-full top-0 left-0"
      >        <About />
      </PanelContent>
      <div className={isOpen ? "animateAboutOpacity show" : "animateAboutOpacity"}></div>
    </>
  );
}
