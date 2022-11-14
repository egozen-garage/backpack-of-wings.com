import React from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { About } from './About';

export function Menu() {
    const [aboutPopup, setAboutPopup] = useState(false);

    return (
        <>
            {/* <div className="bg-slate-500 flex justify-between">

                <nav>
                    <Link to="/loadmemories">
                        <div className="loadMemories-container items-center text-lg border-solid bg-white border-r-2 border-black w-8">
                            <h1 className="" style={{ writingMode: 'vertical-rl'}}>
                                Load Memories
                            </h1>
                        </div>
                    </Link>
                </nav>

                <nav>
                    <Link to="/">
                        <p className="px-9">Dashboard</p>
                    </Link>
                </nav>


                <nav>
                    <Link to="/impressum">
                        <div className="impressum-container text-sm px-9">
                            <p>Impressum</p>
                        </div>
                    </Link>
                </nav>

                <nav>
                    <Link to="/workshop">
                        <div className="workshop-container w-8 items-center text-lg border-solid bg-white border-l-2 border-black">
                            <h1 className="" style={{ writingMode: 'vertical-rl'}}>
                                Workshop
                            </h1>
                        </div>
                    </Link>
                </nav>
                
                <div className="aboutContainer bg-white fixed border-black border-2 rounded-2xl bottom-10 left-20 w-2/5 p-2">
                    <button onClick={() => setAboutPopup(true)}>
                        <h1>Backpack of Wings</h1>
                    </button>
                        <About trigger={aboutPopup} setTrigger={setAboutPopup}></About>
                </div>
            </div> */}
        </>
    ) 
}