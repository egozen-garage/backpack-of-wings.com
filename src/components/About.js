import React from "react";
import jonas from "../img/Jonas-2-glow.png";
// import Typewriter from "typewriter-effect/dist/core";

export function About() {

  return (
    <>
      <div className="p-16 px-6 mobileHorizontal:px-[4rem] wideScreen:px-[5rem] pt-[7.5rem] mobileHorizontal:pt-[6rem] pb-10">
        {/* <button className="aboutBtn absolute right-3 top-3" onClick={() => props.setTrigger(false)}>&#9711;</button>{props.children} */}
        {/* <span className="loginShell flex flex-nowrap flex-col z-45 font-mono py-4 tablet:py-8 text-[11px] mobileHorizontal:text-[14px]">
          <span>last login.</span><span>fri jun 24 18.44.10 on ttys000</span>
          <br />
          the default interactive shell is now zsh.
          <br />
          &#40;base&#41; user-mbp. ~ loading ...
        </span> */}
        <div className="text-xl tablet:text-2xl wideScreen:text-[2.5rem] wideScreen:leading-[3.5rem]">

        <p className="font-serif py-4">
          This website works as an online platform from the physical workshop
          “The Backpack of Wings: Sensory Networks”. Here you can experience the
          migration journey of Jonas through the tracking data from{" "}
          <a href="https://animaltracker.app/">Animal tracker App</a>, and write
          a story of what the bird might have perceived during his migration.
          Share your imaginary story as being Jonas, and navigate through the
          stories written by on/offline workshop participants.
        </p>
        <p className="font-serif py-4">
          “The Backpack of Wings: Sensory Networks” invites the participants to
          collectively create an imaginary storytelling, by looking into the GPS
          data from one of migratory birds - ‘Jonas &#40;White stork, male, born
          in 2013&#41;’. His migratory route and geographical information tell
          not only about his biological behaviour, but also reveal the
          correlation between human activities.
        </p>
        <p className="font-serif py-4">
          This project aims to open up a possibility of using the bio-geo
          tracking technology as a tool for communion, and not to stay in the
          level of understanding the species. At the same time, taking our
          responsibility as humans to use distributed sensing technologies to
          nonhuman agents.
        </p>
        <div className="relative float-right w-full sm:w-[20rem] tablet:w-[28rem] py-[4rem] px-10 mobileHorizontal:py-[4rem]">
          <img className="jonasImg right-0 bottom-0" src={jonas} alt="jonas" />
          <span className="font-mono text-sm absolute right-0 bottom-5">Jonas, White Stork<p className="font-serif text-3xl">Ciconia ciconia</p></span>
        </div>
        <p className="font-serif text-xl tablet:text-2xl wideScreen:text-[2.5rem] wideScreen:leading-[3.5rem] py-4">
          <span className="font-mono text-xs tablet:text-xs wideScreen:text-lg pr-2">LIFE SPAN</span>20-35 yrs{" "}
          <br />
          <span className="font-mono text-xs tablet:text-xs wideScreen:text-lg pr-2">WEIGHT</span>2.3-4.5 kg{" "}
          <br />
          <span className="font-mono text-xs tablet:text-xs wideScreen:text-lg pr-2">HEIGHT</span>1-1.5 m <br />
          <span className="font-mono text-xs tablet:text-xs wideScreen:text-lg pr-2">WINGSPAN</span>1.5-2m <br />
          <span className="font-mono text-xs tablet:text-xs wideScreen:text-lg pr-2">MATING BEHAVIOUR</span>
          monogamy <br />
          <span className="font-mono text-xs tablet:text-xs wideScreen:text-lg pr-2">DIET</span>insects, scorpions
          and spiders, frogs, fish, toads, lizards, snakes, earthworms and small
          mammals <br />
          <span className="font-mono text-xs tablet:text-xs wideScreen:text-lg pr-2">COMMUNICATION</span>almost
          voiceless, loud bill clattering and low hissing sounds <br />
          <span className="font-mono text-xs tablet:text-xs wideScreen:text-lg pr-2">HABITAT</span>open wetland,
          particularly grassy areas, marshes, swamps, ditches, grassland and
          meadows
        </p>
        </div>
      </div>
    </>
  );
}
