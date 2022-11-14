import React, { useState } from "react";
// import { Link, Outlet } from 'react-router-dom';
import "../css/gradientAnimation.css";
import backpack from "../img/backpack.gif";

export function LandingPage(props) {
  const [buttonPopup, setButtonPopup] = useState(true);

  function HideLandingPage() {
    setButtonPopup(false);
  }

  // boolean true or false statement
  return buttonPopup ? (
    <>
      <div className="landingPage gradientBackground fixed z-60 h-screen w-screen">
        <div className="fixed flex flex-col w-[40rem] h-[70vh] bg-white shadow-3xl border-solid rounded-[2rem] top-1/7 left-1/2 -ml-[20rem]">
            <div className="gradientLandingPageOverlay h-auto overflow-scroll pt-8 px-8 rounded-[2rem]">
            <h1 className="font-serif flex-1 leading-8 text-3xl">
                Hello I'm Jonas. <br /> Welcome to my Backpack. <br /> Here you can
                access an app that tracks and provides information about my memories
                of migration. Some are lost, some remain. It would be great if you
                could retrieve my memories.
            </h1>
            <p className="font-mono flex-2 leading-5 text-lg py-6">
                By connecting, you allow yourself to synchronise, follow and retrace
                the experience of a real bird...
            </p>
            <img className="max-w-[220px] -ml-12" src={backpack} alt="backpack" />
            {props.children}
            </div>
            <button
                className="absolute bottom-6 right-6 closeBtn"
                onClick={() => HideLandingPage()}
            >
                <p className="font-serif text-xl bg-white border-black border-solid border-[1px] rounded-[1rem] py-1 px-5">Connect &#10142;</p>
            </button>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}
