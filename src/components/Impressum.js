import React from "react";
import "../css/gradientAnimation.css";
import "../css/animation.css";
import { NavLink, useNavigate } from "react-router-dom";

export function Impressum() {
  const navigate = useNavigate();

  return (
    <>
      {/* BACKPACK OF WINGS BUTTON */}
      <div className="z-60 aboutBackground fixed flex top-0 py-6 px-14">
        <div className="aboutContainer z-40 flex-1">
            <button onClick={() => navigate(-1)} className="buttonInactive">
              <h1 className="text-xl mx-1 py-1">
                The Backpack of Wings: Sensory Networks
              </h1>
            </button>
        </div>
        {/* IMPRESSUM */}
        <div className="flex-2 buttonActive mx-6">
          <NavLink to="/">
            <h1 className="text-xl mx-2 py-1">Impressum<span className="font-mono text-white pl-2">x</span></h1>
            
          </NavLink>
        </div>
      </div>

      <div className="noScrollBar text-white gradientImpressum z-50 fixed top-0 left-0 h-full w-full px-12 py-16 overflow-scroll">
        <p className="font-serif font-light text-2xl p-4 py-4">
          <span className="block py-9">
            Hyeseon Jeong <br/>
            Erzbergerplatz 9 <br/>
            50733 Cologne
          </span>
          <span className="block py-9">
            Artists: <br/>
            Hyeseon Jeong, <a className="pulsate" href="https://www.heysun.xyz/" target="_blank">Seongmin Yuk</a>
          </span>
          <span className="block py-9">
            Design and Web-Development: <br/>
            <a className="pulsate" href="https://www.egozen.org/" target="_blank">egozen collective</a>
          </span>
          <span className="block py-9">
            Acknowledgement: <br/>
            Michael Quetting, Hemal Naik, Andrea Flack <br/>
            from Max Planck Institute of Animal Behaviour <br/>
            Atelier Xoda Temporary Gallery, Nordic House
          </span>
          <span className="block">'The Backpack of Wings' is developed in the context of Driving the Human.</span>
          <span className="block py-9">
            Supported by: <br/>
            Michael Quetting, Hemal Naik, Andrea Flack <br/>
            <a className="pulsate" href="https://www.bmuv.de/" target="_blank">Federal Ministry for the Environment, Nature Conservation, Nuclear Safety and Consumer Protection (BMUV)</a> based on a decision of the German Bundestag
          </span>
        </p>
      </div>
    </>
  );
}
