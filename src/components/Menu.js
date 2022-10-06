import React from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { About } from './About';

export function Menu() {
    const [aboutPopup, setAboutPopup] = useState(false);

    return (
        <>
            <nav class="z-40">
                <Link to="/">
                    <p class="px-9">Dashboard</p>
                </Link>

                <Link to="/loadmemories">
                    <div class="loadMemories-container flex items-center justify-center text-lg border-solid bg-white border-r-2 border-black fixed top-0 left-0 h-screen">
                        <h1 class="" style={{ writingMode: 'vertical-rl'}}>
                            Load Memories
                        </h1>
                    </div>
                </Link>

                <Link to="/workshop">
                    <div class="workshop-container flex items-center justify-center text-lg border-solid bg-white border-l-2 border-black fixed top-0 right-0 h-screen">
                        <h1 class="" style={{ writingMode: 'vertical-rl'}}>
                            Workshop
                        </h1>
                    </div>
                </Link>

                <Link to="/impressum">
                    <div class="impressum-container text-sm px-9">
                        <p>Impressum</p>
                    </div>
                </Link>

                <div class="aboutContainer bg-white fixed border-black border-2 rounded-2xl bottom-10 left-20 w-2/5 p-2">
                    <button onClick={() => setAboutPopup(true)}>
                        <h1>Backpack of Wings</h1>
                    </button>
                        <About trigger={aboutPopup} setTrigger={setAboutPopup}></About>
                </div>
            </nav>
        </>
    ) 
}