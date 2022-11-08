import React from "react";
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
      <div className="z-45 aboutBackground fixed top-0">
        <div
          onClick={toggleCollapsible}
          className="aboutContainer bg-white fixed z-40 rounded-2xl top-10 left-20 p-2"
        >
          <button className="toggle">
            <h1 className="text-xl mx-3">
              Backpack of Wings: Sensory Networks
            </h1>
          </button>
        </div>
      </div>
      <div className="z-40 gradientDashboard fixed h-36 w-full"></div>
      <PanelContent
        style={AboutAnimatedStyle}
        className="gradientDashboard fixed w-full"
      >
        <About />
      </PanelContent>
    </>
  );
}
