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
      {/* BACKPACK OF WINGS BUTTON */}
      <div className="z-50 aboutBackground fixed flex top-0 py-6 px-14">
        <div onClick={toggleCollapsible} className="aboutContainer z-50 flex-1">
          <button className={isOpen? "buttonActive" : "buttonInactive"}>
            <h1 className="text-xl mx-1 py-1">
              The Backpack of Wings: Sensory Networks
              {isOpen && (
                <span className="font-mono text-white pl-4">x</span>
              )}
            </h1>
          </button>
        </div>
        {/* IMPRESSUM */}
        <div className={isOpen ? "animateOpacity show" : "animateOpacity"}>
          <div className="flex-2 buttonInactive mx-6">
            <NavLink to="/impressum" onClick={toggleImpressum}>
              <h1 className="text-xl mx-2 py-1">
                Impressum
              </h1>
            </NavLink>
          </div>
        </div>
      </div>
      {/* LIGHTRAY HEADER */}
      <div className={currentURL == "/" ? "dashboardLight show" : "dashboardLight"}>
      </div>
      {/* currentURL === "/" &&  */}

      {/* COLLAPSIBLE */}
      <PanelContent
        style={AboutAnimatedStyle}
        className="gradientDashboard_header fixed w-full top-0 left-0"
      >        <About />
      </PanelContent>
      <div className={isOpen ? "animateAboutOpacity show" : "animateAboutOpacity"}></div>
    </>
  );
}
