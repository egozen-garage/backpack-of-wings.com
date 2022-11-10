import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { About } from "./About";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "../css/gradientAnimation.css";
import "../css/animation.css";

export default function AboutWindow() {
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
    z-index: 35;
  `;

  return (
    <>
      {/* BACKPACK OF WINGS BUTTON */}
      <div className="z-45 aboutBackground fixed flex top-0 py-6 px-14">
        <div onClick={toggleCollapsible} className="aboutContainer z-40 flex-1">
          <button className={isOpen? "buttonActive" : "buttonInactive"}>
            <h1 className="text-xl mx-1 py-1">
              Backpack of Wings: Sensory Networks
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
              <h1 className="text-xl mx-4 py-1">
                Impressum
              </h1>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="z-30 gradientDashboard_header fixed h-36 w-full"></div>

      {/* COLLAPSIBLE */}
      <PanelContent
        style={AboutAnimatedStyle}
        className="gradientDashboard_header fixed w-full"
      >        <About />
      </PanelContent>
      <div className={isOpen ? "animateAboutOpacity show" : "animateAboutOpacity"}></div>
    </>
  );
}
