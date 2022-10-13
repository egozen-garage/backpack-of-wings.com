import React, { Component } from "react";
import track from "../audio/6_BirdSanctuary_Germany.wav";

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
        this.setState({isPlaying: !isPlaying});
    };

    render() {
        return (
            <div>
                {/* Show state of song on website */}
                <p class="fixed top-0 left-10">
                {this.state.isPlaying ? 
                    "Song is Playing" : 
                    "Song is Paused"}
                </p>

                {/* CANVAS to call our main function */}
                <div class="fixed z-40 top-0 w-screen h-screen soundscape-btn cursor-cell" onClick={this.playPause}>
                </div>
            </div>
        );
    }

}

export default AudioPlayer;