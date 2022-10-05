import React from "react";
import { Link, Outlet } from 'react-router-dom';

export function LandingPage(props) {
    
    // boolean true or false statement
    return (props.trigger) ? (
        <>
            <div class="landingPage">

                <h1>Hello I'm Jonas. Welcome to my Backpack. Here you can access an app that tracks and provides information about my memories of migration. Some are lost, some remain. It would be great if you could retrieve my memories.</h1>
                <br/>
                <p>By connecting, you allow yourself to synchronise, follow and retrace the experience of a real bird...</p>
                <br />
                <br />
                <button class="closeBtn" onClick={() => props.setTrigger(false)}>Connect &#10142;</button>{props.children}  

            </div>
        </>
    ) : "";
}

 