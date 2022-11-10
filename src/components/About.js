import React from "react";
// import { Link } from "react-router-dom";

export function About() {
  return (
    <>
      <div className="p-16 px-16 pb-10 pt-[6rem]">
        {/* <button className="aboutBtn absolute right-3 top-3" onClick={() => props.setTrigger(false)}>&#9711;</button>{props.children} */}
        <div className="z-45 font-mono py-8 leading-5 text-s">
          <code>last login. fri jun 24 18.44.10 on ttys000</code>
          <br />
          <code>the default interactive shell is now zsh.</code>
          <code>&#40;base&#41; user-mbp. ~ loading ...</code>
        </div>
        <p className="font-serif text-2xl py-4">
          This website works as an online platform from the physical workshop
          “The Backpack of Wings: Sensory Networks”. Here you can experience the
          migration journey of Jonas through the tracking data from{" "}
          <a href="https://animaltracker.app/">Animal tracker App</a>, and write
          a story of what the bird might have perceived during his migration.
          Share your imaginary story as being Jonas, and navigate through the
          stories written by on/offline workshop participants.
        </p>
        <p className="font-serif text-2xl py-4">
          “The Backpack of Wings: Sensory Networks” invites the participants to
          collectively create an imaginary storytelling, by looking into the GPS
          data from one of migratory birds - ‘Jonas &#40;White stork, male, born
          in 2013&#41;’. His migratory route and geographical information tell
          not only about his biological behaviour, but also reveal the
          correlation between human activities.
        </p>
        <p className="font-serif text-2xl py-4">
          This project aims to open up a possibility of using the bio-geo
          tracking technology as a tool for communion, and not to stay in the
          level of understanding the species. At the same time, taking our
          responsibility as humans to use distributed sensing technologies to
          nonhuman agents.
        </p>
        <p className="font-serif text-2xl py-4">
          LIFE SPAN 20-35 yrs <br />
          WEIGHT 2.3-4.5 kg <br />
          HEIGHT 1-1.5 m <br />
          WINGSPAN 1.5-2m <br />
          MATING BEHAVIOUR monogamy <br />
          DIET insects, scorpions and spiders, frogs, fish, toads, lizards,
          snakes, earthworms and small mammals <br />
          COMMUNICATION almost voiceless, loud bill clattering and low hissing
          sounds <br />
          HABITAT open wetland, particularly grassy areas, marshes, swamps,
          ditches, grassland and meadows
        </p>
      </div>
    </>
  );
}
