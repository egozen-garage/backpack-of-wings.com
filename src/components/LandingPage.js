import React, { useState } from "react";
// import { Link, Outlet } from 'react-router-dom';
import '../css/gradientAnimation.css';
import backpack from '../img/backpack.gif';

export function LandingPage(props) {    
    const [buttonPopup, setButtonPopup] = useState(true);

    function HideLandingPage(){
        setButtonPopup(false)
    }

    // boolean true or false statement
    return (buttonPopup) ? (
        <>
            <div className="landingPage gradientBackground fixed z-60 h-screen w-screen">

                <div className="fixed w-[40rem] p-8 bg-white shadow-3xl border-solid rounded-[2rem] top-1/7 left-1/2 -ml-[20rem]">
                    <h1 className="font-serif leading-8 text-3xl">Hello I'm Jonas. <br/> Welcome to my Backpack. <br/> Here you can access an app that tracks and provides information about my memories of migration. Some are lost, some remain. It would be great if you could retrieve my memories.</h1>
                    <p className="font-mono leading-5 text-lg py-6">By connecting, you allow yourself to synchronise, follow and retrace the experience of a real bird...</p>
                    <div className="flex place-content-between">
                        <img className="max-w-[220px] -ml-12" src={backpack} alt="backpack"/>
                        <button className="absolute bottom-10 right-10 closeBtn h-10 px-4 ml-40 border-black border-solid border-2 rounded-[1rem]" onClick={() => HideLandingPage()}>
                            <p className="font-serif text-xl">Connect &#10142;</p>
                        </button>{props.children}  
                    </div>
                </div>

            </div>
        </>
    ) : "";
}

