import React from "react";
// import { Link } from "react-router-dom";

export function About(props) {
    return (props.trigger) ? (
        <>
            <div className="h-64 overflow-scroll">
                <button className="aboutBtn absolute right-3 top-3" onClick={() => props.setTrigger(false)}>&#9711;</button>{props.children}
                <div className="py-8 text-xs">
                    <code>
                        last login. fri jun 24 18.44.10 on ttys000
                    </code>
                    <br/>
                    <code>
                        the default interactive shell is now zsh.
                    </code>
                    <code>
                        &#40;base&#41; user-mbp. ~ loading ...
                    </code>
                </div>
                <p>
                    The workshop “The Backpack of Wings: Sensory Networks” invites the participants to collectively create an imaginary storytelling, by looking into the GPS data from one of migratory birds - ‘Jonas &#40;White stork, male, born in 2013&#41;’. His migratory route and geographical information tell not only about his biological behavior, but also reveal the correlation between human activities. The workshop opens up a possibility of using the bio-gio tracking technology as a tool for communion, and not to stay in the level of understanding the species. At the same time, taking our responsibility as humans to use distributed sensing technologies to nonhuman agents. On this platform, audiences can experience the migration journey of Jonas through tracking data via Animal tracker app and share imaginary stories of Jonas written by on/offline workshop participants. Artists:/ Hyeseon Jeong, Seongmin Yuk Design and programming:/ egozen Soundscape:/ Jiyun Park Music:/ A Sea of Love - Huerco S. &#40;This is not clear&#41; Acknowledge:/ Michael Quetting, Julian Hirt ‘The backpack of wings’ is developed in the framework of Driving the Human. Cooperation with Max Planck Institute of Animal Behavior.
                </p>
            </div>
        </>
    ): "";
}