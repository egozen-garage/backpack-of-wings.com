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
      <div className="z-70 aboutBackground fixed flex flex-wrap top-0 pb-6 px-0 mobileHorizontal:px-12 wideScreen:px-16 mt-0 mobileHorizontal:mt-2 wideScreen:mt-4">

        {/* BACKPACK OF WINGS BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex-1 buttonInactive white"
        >
            <h1 className="flex flex-wrap text-[0.95rem] xs:text-[1rem] mobileHorizontal:text-md tablet:text-xl w-full min-w-[15rem] mx-1 py-2 mobileHorizontal:py-2">
              <span className="ml-auto pr-2 float-right">The Backpack of Wings:</span>
              <span className="mr-auto float-left">Sensory Networks</span>
            </h1>
        </button>

        {/* IMPRESSUM */}
          <div className="flex-2 buttonActive mx-4 mobileHorizontal:mx-6 mt-1 mobileHorizontal:mt-4">
            <NavLink to="/">
              <h1 className="text-[0.95rem] xs:text-[1rem] mobileHorizontal:text-md tablet:text-xl mx-2 my-2">
                Impressum<span className="font-mono text-white pl-2">x</span>
                </h1>
            </NavLink>
          </div>
      </div>

      <div className="text-white gradientImpressum z-60 fixed top-0 left-0 h-screen w-full px-6 mobileHorizontal:px-[4rem] wideScreen:px-[5rem] pt-[7.5rem] mobileHorizontal:pt-[6rem] overflow-scroll noScrollBar ">
        <div className="font-serif font-light text-xl tablet:text-2xl wideScreen:text-[2.5rem] wideScreen:leading-[3.5rem] pb-[2rem] tablet:pb-[15rem]">
          <span className="block py-4">
            Hyeseon Jeong <br />
            Erzbergerplatz 9 <br />
            50733 Cologne
          </span>
          <span className="block py-4">
            Artists: <br />
            <a
              className="pulsate"
              href="https://www.heysun.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hyeseon Jeong,{" "}
            </a>
              Seongmin Yuk
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
        </div>
        
        {/* LOGOS */}
        <div className="mb-10 flex flex-wrap justify-between logoWrapper h-[10rem] -mx-5">
          <img className="mx-2 h-[6rem] mobileHorizontal:h-[6rem]" src={bmuv} alt="logo_bmuv"/>
          <img className="mx-5 h-[4rem] mobileHorizontal:h-[5rem]" src={dth} alt="logo_dth"/>
          <img className="mx-5 h-[4rem] py-2 mobileHorizontal:h-[5rem]" src={mpiab} alt="logo_mpiab"/>
          <img className="mx-5 h-[4rem] py-2 mobileHorizontal:h-[4.5rem]" src={ez} alt="logo_egozen"/>
        </div>
      </div>
    </>
  );
}
