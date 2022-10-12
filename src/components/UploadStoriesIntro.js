import React from "react";
import progressbar from '../img/audio-progressbar-01.png';
import '../css/gradientAnimation.css';

export function UploadStoriesIntro () {
    return (
        <>
            <div class="flex-col items-center justify-center uploadStories-container gradientBackground fixed z-40 h-screen w-screen">
                <div class="text-white w-[600px] mx-[80px]">
                    <p>Hello, I am Jonas.</p> 
                    <p>In the middle of June 2013, I was born in Drömling, Germany. I received a backpack from humans after my first four weeks of existence, and it is still on my back. </p>
                    <p>The backpack helps me to send data. Do you want to listen to the soundscape where I am?</p>
                </div>
                <div class="progressBar-container">
                    <img src={progressbar} alt="progressbar"/>
                </div>
            </div>
        </>
    )
}