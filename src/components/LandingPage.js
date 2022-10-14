import React from "react";
// import { Link, Outlet } from 'react-router-dom';
import '../css/gradientAnimation.css';

export function LandingPage(props) {    
    // boolean true or false statement
    return (props.trigger) ? (
        <>
            <div class="landingPage gradientBackground fixed z-50 h-screen w-screen">

                <div class="fixed w-[600px] p-8 bg-white shadow-3xl border-solid rounded-lg top-1/4 left-1/2 -ml-[300px]">
                    <h1 class="text-lg">Hello I'm Jonas. <br/> Welcome to my Backpack. Here you can access an app that tracks and provides information about my memories of migration. Some are lost, some remain. It would be great if you could retrieve my memories.</h1>
                    <div class="py-8">
                        <code>By connecting, you allow yourself to synchronise, follow and retrace the experience of a real bird...</code>
                    </div>
                    <button class="closeBtn py-8" onClick={() => props.setTrigger(false)}>
                        <p>Connect &#10142;</p>
                    </button>{props.children}  
                </div>

            </div>
        </>
    ) : "";
}

 