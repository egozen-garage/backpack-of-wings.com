import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./css/soundscape.css";

import progressbar from "./audio-progressbar-01-black.svg";
import dudaimsite from "./audioFiles/1_landfill_israel.wav";
import neveeitan from "./audioFiles/2_fishPonds_israel.wav";
import hama from "./audioFiles/3_agriculturalLand_ syria_turkey.wav";
import istanbul from "./audioFiles/4_landfill_istanbul.wav";
import lackova from "./audioFiles/5_grazingLand_slovakia.wav";
import droemling from "./audioFiles/6_birdSanctuary_germany.wav";
import all from "./audioFiles/Short_version_all_6_tracks.wav";
// import soundscapeData from "./soundscapeData.json";

export function AudioPlayer() {
  const { landmark } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  console.log("state of player:" + isPlaying);

  // by putting the Audio() in the State, we prevent react in refreshing from each render
  const [audio, setAudio] = useState(null);
  console.log("check audio landmark: " + landmark);

  const audioRef = useRef();
  useEffect(() => {
    const trackArray = [
      { landmark: "dudaimsite", track: dudaimsite },
      { landmark: "neveeitan", track: neveeitan },
      { landmark: "hama", track: hama },
      { landmark: "istanbul", track: istanbul },
      { landmark: "lackova", track: lackova },
      { landmark: "droemling", track: droemling },
      { landmark: undefined, track: all },
    ];
    for (const x in trackArray) {
      if (landmark === trackArray[x].landmark) {
        setAudio(trackArray[x].track);
      }
    }
    return () => {
      setIsPlaying(false);
    };
  }, [landmark]);

  // Main function to handle both play and pause operations
  function playPause() {
    if (isPlaying) {
      // Pause track if playing
      audioRef.current.pause();
      setIsPlaying(false);
      console.log("player is pausing ");
    } else {
      // Play track if paused
      audioRef.current.play();
      setIsPlaying(true);
      console.log("player is playing ");
    }
  }

  return (
    <>
      {/* CANVAS to call our main function */}
      <div
        className={
          isPlaying
            ? "soundscapeButton pause marquee marquee--fit-content"
            : "soundscapeButton"
        }
        onClick={playPause}
      >
        <audio src={audio} ref={audioRef} />
        <div className="marquee__content ">
          {/* <div className="bg-solid bg-white w-10 h-10"></div> */}
          <img
            className="object-cover h-[4rem] wideScreen:h-[5rem]"
            src={progressbar}
            alt="progressbar"
          />

        </div>
        {isPlaying && ( 
            <div className="marquee__content">
            {/* <div className="bg-solid bg-white w-10 h-10"></div> */}
            <img
              className="object-cover h-[4rem] wideScreen:h-[5rem]"
              src={progressbar}
              alt="progressbar"
            />
            </div> 
            )}

      </div>
    </>
  );
}

// >>>OLD CODE<<<

// class AudioPlayer extends Component {
//   // Create State
//   state = {
//     // Ger audio file in a variable
// audio: new Audio(track),

//     // Set initial state of track
//     isPlaying: false,
//   };

//   // Main function to handle both play and pause operations
//   playPause = () => {
//     // Get state of track
//     let isPlaying = this.state.isPlaying;
//     let currentLandmark = this.props.currentLandmark;

//     if (isPlaying) {
//       // Pause track if playing
//       this.state.audio.pause();
//       console.log("pause");
//     } else {
//       // Play track if paused
//       this.state.audio.play();
//       console.log("play");
//     }

//     // Change state of track
// this.setState({ isPlaying: !isPlaying });

//     console.log(
//       "audioplayer > fetch soundscape data:" +
//         JSON.stringify(soundscapeData.soundscape[0].id)
//     );
//     console.log(
//       "audioplayer > fetch current Landmark:" +
//         JSON.stringify(this.props.currentLandmark)
//     );
//   };

//   render() {
//     return (
//       <>
//         {/* CANVAS to call our main function */}
//         <div
//           className={
//             this.state.isPlaying ? "soundscapeButton pause" : "soundscapeButton"
//           }
//           onClick={this.playPause}
//         >
//           <img
//             className="object-cover h-[4rem] wideScreen:h-[5rem]"
//             src={progressbar}
//             alt="progressbar"
//           />
//         </div>
//       </>
//     );
//   }
// }

export default AudioPlayer;
