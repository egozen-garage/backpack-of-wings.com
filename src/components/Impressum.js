import React from "react";
import "../css/gradientAnimation.css";
import "../css/animation.css";
import { NavLink, useNavigate } from "react-router-dom";

export function Impressum() {
  const navigate = useNavigate();

  return (
    <>
      <div className="z-60 aboutBackground fixed flex flex-wrap top-0 pb-6 px-14">
        {/* BACKPACK OF WINGS BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex-1 mt-5 buttonInactive"
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

      <div className="noScrollBar text-white gradientImpressum z-50 fixed top-0 left-0 h-full w-full px-2 mobileHorizontal:px-12 pt-[7rem] mobileHorizontal:pt-16 pb-16 overflow-scroll">
        <p className="font-serif font-light text-2xl p-4 py-4">
          <span className="block py-9">
            Hyeseon Jeong <br />
            Erzbergerplatz 9 <br />
            50733 Cologne
          </span>
          <span className="block py-9">
            Artists: <br />
            Hyeseon Jeong,{" "}
            <a
              className="pulsate"
              href="https://www.heysun.xyz/"
              target="_blank"
            >
              Seongmin Yuk
            </a>
          </span>
          <span className="block py-9">
            Design and Web-Development: <br />
            <a
              className="pulsate"
              href="https://www.egozen.org/"
              target="_blank"
            >
              egozen collective
            </a>
          </span>
          <span className="block py-9">
            Acknowledgement: <br />
            Michael Quetting, Hemal Naik, Andrea Flack <br />
            from Max Planck Institute of Animal Behaviour <br />
            Atelier Xoda Temporary Gallery, Nordic House
          </span>
          <span className="block">
            'The Backpack of Wings' is developed in the context of Driving the
            Human.
          </span>
          <span className="block py-9">
            Supported by: <br />
            Michael Quetting, Hemal Naik, Andrea Flack <br />
            <a className="pulsate" href="https://www.bmuv.de/" target="_blank">
              Federal Ministry for the Environment, Nature Conservation, Nuclear
              Safety and Consumer Protection (BMUV)
            </a>{" "}
            based on a decision of the German Bundestag
          </span>
        </p>
      </div>
    </>
  );
}
