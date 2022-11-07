import React from "react";
import { About } from "./About";
import { useState } from "react";
import '../css/gradientAnimation.css';

export default function AboutWindow() {
//   const [aboutPopup, setAboutPopup] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="z-45 aboutBackground gradientDashboard fixed top-0 h-36 w-full">
      <div onClick={() => setIsOpen(!isOpen)} className="aboutContainer bg-white fixed z-40 rounded-2xl top-10 left-20 p-2">
        <button className="toggle">
          <h1 className="text-xl mx-3">Backpack of Wings: Sensory Networks</h1>
        </button>
      </div>
    </div>
    {isOpen && <About></About>}
    </>
  );
}
