import React, { Component } from "react";
import track from "../audio/6_BirdSanctuary_Germany.wav"
import progressbar from "../img/audio-progressbar-01-black.svg";
import soundscapeData from "../json/soundscapeData.json";
import "../App.css";

// TO-DO! check how to fetch props value from state class components
// TO-DO! loop audio
class AudioPlayer extends Component {
  // Create State
  state = {
    // Ger audio file in a variable
    audio: new Audio(track),

    // Set initial state of track
    isPlaying: false,
  };

  // Main function to handle both play and pause operations
  playPause = () => {
    // Get state of track
    let isPlaying = this.state.isPlaying;

    if (isPlaying) {
      // Pause track if playing
      this.state.audio.pause();
    } else {
      // Play track if paused
      this.state.audio.play();
    }

    // Change state of track
    this.setState({ isPlaying: !isPlaying });

    console.log("audioplayer > fetch soundscape data:" + JSON.stringify(soundscapeData.soundscape[0].id))
    console.log("audioplayer > fetch current Landmark:" + JSON.stringify(this.props.currentLandmark))
  };
  

  render() {
    return (
      <>
        {/* CANVAS to call our main function */}
        <div
          className={
            this.state.isPlaying ? "soundscapeButton pause" : "soundscapeButton"
          }
          onClick={this.playPause}
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
}

export default AudioPlayer;
