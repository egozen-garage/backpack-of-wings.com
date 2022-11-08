import React from "react";
import { NavLink } from "react-router-dom";
import { About } from "./About";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "../css/gradientAnimation.css";

export default function AboutWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapsible = () => {
    setIsOpen((prevState) => !prevState);
  };
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
          <button className="toggle bg-white shadow-button shadow-white rounded-2xl py-1">
            <h1 className="text-xl mx-4">
              Backpack of Wings: Sensory Networks
            </h1>
          </button>
        </div>
        {/* IMPRESSUM */}
        {isOpen && (
          <div className="flex-2 text-white py-1 px-4">
            <NavLink to="/impressum">
              <h1 className="text-xl text-white mx-2 bg-black shadow-buttonBlack shadow-black rounded-2xl px-2">
                Impressum
              </h1>
            </NavLink>
          </div>
        )}
      </div>
      <div className="z-40 gradientDashboard fixed h-36 w-full"></div>

      {/* COLLAPSIBLE */}
      <PanelContent
        style={AboutAnimatedStyle}
        className="gradientDashboard fixed w-full"
      >
        <About />
      </PanelContent>
    </>
  );
}
