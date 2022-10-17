import React from "react";
import { useState } from "react";
import progressbar from '../img/audio-progressbar-01-white.svg';
import '../css/gradientAnimation.css';
import AudioPlayer from "../utilities/AudioPlayer.js";

// (props) to trigger the component
export function UploadStoriesIntro () {


    const [visible,setVisible] = useState(true);
    const handleClick=()=>{ setVisible(!visible) }
    // const [state, setState] = useState(true);

    return (
        <>
            {visible === true && 
                <div>
                    <div class="flex-col items-center justify-center uploadStories-container gradientBackground fixed z-40 h-screen w-screen">
                        <div class="text-white text-xl fixed w-screen top-1/4  pr-[3.7rem]">

                            {/* INTRODUCTION TO JONAS */}
                            <div class="px-40">
                                <p class="py-4">Hello, I am Jonas.</p> 
                                <p class="py-2">In the middle of June 2013, I was born in Drömling, Germany. I received a backpack from humans after my first four weeks of existence, and it is still on my back. </p>
                                <p class="py-2">The backpack helps me to send data.</p>
                                <p class="py-2">Do you want to listen to the soundscape where I am?</p>
                            </div>

                            {/* AUDIO PROGRESS BAR */}
                            <div class="py-20 progressBar-container">
                                <img class="flex items-center w-screen px-12" src={progressbar} alt="progressbar"/>
                            </div>

                            {/* NEXT BUTTON */}
                            <button class="z-50 fixed skipBtn px-4 py-2 ml-40 border-white border-solid border-2 rounded-xl" onClick={handleClick}> 
                                <p>Skip &#10142;</p> 
                                {/* to pass through elements */}
                            </button>

                            <AudioPlayer></AudioPlayer>

                        </div>
                    </div>
                </div>
            }
        </> 
    )
}

export default UploadStoriesIntro
