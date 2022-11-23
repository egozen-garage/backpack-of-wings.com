import React from "react";
import "../css/gradientAnimation.css";
import "../css/animation.css";
import { NavLink, useNavigate } from "react-router-dom";
import ez from "../img/logo_ez.png";
import bmuv from "../img/logo_bmuv.svg";
import dth from "../img/logo_dth.svg";
import mpiab from "../img/logo_mpiab.png";


export function Impressum() {
  const navigate = useNavigate();

  return (
    <>
      <div className="z-70 aboutBackground fixed flex flex-wrap top-0 pb-6 px-12 mt-2 wideScreen:mt-4">
        {/* BACKPACK OF WINGS BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex-1 mt-5 buttonInactive white lapto:white"
        >
          <div className="flex">
            <h1 className="flex flex-wrap text-lg tablet:text-xl min-w-[12rem] mx-1 py-1">
              <span className="mx-auto pr-2">The Backpack of Wings:</span>
              <span className="mx-auto">Sensory Networks</span>
            </h1>
            {/* <span className="font-mono text-lg tablet:text-xl text-white pl-2 pr-1 py-1 mt-[1px]">x</span> */}
          </div>
        </button>

        {/* IMPRESSUM */}
          <div className="flex-2 buttonActive mx-0 mobileHorizontal:mx-6 mt-5">
            <NavLink to="/">
              <h1 className="text-xl mx-2 py-1">
                Impressum<span className="font-mono text-white pl-2">x</span>
                </h1>
            </NavLink>
          </div>
      </div>

      <div className="noScrollBar text-white gradientImpressum z-60 fixed top-0 left-0 h-full w-full px-2 mobileHorizontal:px-12 pt-[10rem] mobileHorizontal:pt-16 overflow-scroll">
        <p className="font-serif font-light text-xl tablet:text-2xl wideScreen:text-[2.5rem] wideScreen:leading-[3.5rem] p-4 pt-4 pb-[15rem]">
          <span className="block py-4">
            Hyeseon Jeong <br />
            Erzbergerplatz 9 <br />
            50733 Cologne
          </span>
          <span className="block py-4">
            Artists: <br />
            Hyeseon Jeong,{" "}
            <a
              className="pulsate"
              href="https://www.heysun.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Seongmin Yuk
            </a>
          </span>
          <span className="block py-4">
            Design and Web-Development: <br />
            <a
              className="pulsate"
              href="https://www.egozen.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              egozen collective
            </a>
          </span>
          <span className="block py-4">
            Acknowledgement: <br />
            Michael Quetting, Hemal Naik, Andrea Flack <br />
            from Max Planck Institute of Animal Behaviour <br />
            Atelier Xoda Temporary Gallery, Nordic House
          </span>
          <span className="block py-4">
            'The Backpack of Wings' is developed in the context of Driving the
            Human.
          </span>
          <span className="block py-4">
            Supported by: <br />
            Michael Quetting, Hemal Naik, Andrea Flack <br />
            <a className="pulsate" href="https://www.bmuv.de/" target="_blank" rel="noopener noreferrer">
              Federal Ministry for the Environment, Nature Conservation, Nuclear
              Safety and Consumer Protection (BMUV)
            </a>{" "}
            based on a decision of the German Bundestag
          </span>
        </p>
        <div className="flex logoWrapper fixed bottom-10 w-screen h-auto">
          <img className="px-5 h-20" src={bmuv} alt="logo_bmuv"/>
          <img className="px-5 h-20" src={dth} alt="logo_dth"/>
          <img className="px-5 py-2 h-20" src={mpiab} alt="logo_mpiab"/>
          <img className="px-5 py-2 h-20" src={ez} alt="logo_egozen"/>
        </div>
      </div>
    </>
  );
}
