import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import progressbar from "../../img/audio-progressbar-01-black.svg";
import dudaimsite from "./audioFiles/1_landfill_israel.wav";
import neveeitan from "./audioFiles/2_fishPonds_israel.wav";
import hama from "./audioFiles/3_agriculturalLand_ syria_turkey.wav";
import istanbul from "./audioFiles/4_landfill_istanbul.wav";
import lackova from "./audioFiles/5_grazingLand_slovakia.wav";
import droemling from "./audioFiles/6_birdSanctuary_germany.wav";
import all from "./audioFiles/Short_version_all_6_tracks.wav";
// import soundscapeData from "./soundscapeData.json";

export function AudioPlayer() {
  const {landmark} = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  console.log("state of player:" + isPlaying);

  // by putting the Audio() in the State, we prevent react in refreshing from each render
  const [audio, setAudio] = useState(null)
  console.log("check audio state")
  
  const [pauseAudio, setPauseAudio] = useState(false)
  if (pauseAudio) audio.pause()
  console.log("player is, render pauseAudio value:" + pauseAudio)
  
  useEffect(() => {
    setPauseAudio(true)
    
    const trackArray = [
      {"landmark":"dudaimsite", "track":dudaimsite}, 
      {"landmark":"neveeitan", "track":neveeitan}, 
      {"landmark":"hama", "track":hama}, 
      {"landmark":"istanbul", "track":istanbul}, 
      {"landmark":"lackova", "track":lackova}, 
      {"landmark":"droemling", "track":droemling}, 
      {"landmark":"undefined", "track":all} 
      ]
      for (const x in trackArray) {
        if (landmark === trackArray[x].landmark) {
          setAudio(new Audio(trackArray[x].track))
          console.log("player is, audio selected" + trackArray[x].track)
          // setTrack(trackArray[x].track)
        } else setAudio(new Audio(all))
      }
    }, [landmark])
    
    // Main function to handle both play and pause operations
    function playPause() {
      setPauseAudio(false)

  
      if (isPlaying) {
        // Pause track if playing
        audio.pause();
        setIsPlaying(false)
        console.log("player is pausing ");
      } else {
        // Play track if paused
        audio.play();
        setIsPlaying(true)
        console.log("player is playing ");
      }          
      }

  return (
    <>
      {/* CANVAS to call our main function */}
      <div
        className={isPlaying ? "soundscapeButton pause" : "soundscapeButton"}
        onClick={playPause}
      >
        <img
          className="object-cover h-[4rem] wideScreen:h-[5rem]"
          src={progressbar}
          alt="progressbar"
        />
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
