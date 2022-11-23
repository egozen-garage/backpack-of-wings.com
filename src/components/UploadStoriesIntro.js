import React from "react";
import AudioPlayer from "../utilities/AudioPlayer";
import { useNavigate } from "react-router-dom";

import "../css/gradientAnimation.css";
import "../css/menuPanels.css";
import "../css/animation.css";

import jonas from "../img/Jonas-2-glow.png";

export function UploadStoriesIntro() {
  // const [isOpen, setIsOpen] = useState(true);
  // const toggleCollapsible = () => {
  //   setIsOpen((prevState) => !prevState);
  //   useNavigate("/uploadstory/israel-dudaimsite");
  // };

  // TEMPORARY > UNCOMMENT TO STOP API REQUEST
  let navigate = useNavigate();
  // const querySanityAPI = '*[_type == "landmark"]{"url":url.current}';
  // let [sanityData, setSanityData] = useState(null);

  // useEffect(() => {
  //   Promise.all([SanityClient.fetch(querySanityAPI)])
  //     .then(([sanityData]) => {
  //       setSanityData(sanityData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  //   let urlVariable = sanityData[0].url;
  //   console.log(urlVariable);

  const landmarkOptions = [
    "istanbul",
    "droemling",
    "lackova",
    "hama",
    "neveeitan",
    "dudaimsite",
  ];
  const randomNumber = Math.floor(Math.random() * 6);

  return (
    <>
      <div className="jonasIntroContainerAnimation flex w-screen h-screen top-0 fixed z-30">

        {/* BACKGROUND GRADIENT ANIMATION */}
        <div className="gradientJonasIntroOverlay gradientBGJonasIntro h-screen w-screen fixed"></div>

        {/* INTRODUCTION TEXT OF JONAS */}
        <div className="gradientJonasIntroOverlay px-14 text-xl h-screen overflow-y-scroll noScrollBar pb-[12rem] wideScreen:pb-[20rem]">
          <div className="pl-8 pt-24 wideScreen:pt-28 pb-10 text-xl tablet:text-2xl wideScreen:text-[2.5rem] wideScreen:leading-[3.5rem] ">
            <div className="flex flex-wrap font-serif py-4">
              <span>Hello, I am Jonas.</span>
              <img
                className="jonasImg h-10 tablet:h-12 desktop:h-16 wideScreen:h-20 tablet:-mt-1 desktop:-mt-2"
                src={jonas}
                alt="jonas"
              />
            </div>
            <p className="font-serif py-2 desktop:py-4">
              I’m a white stork with a backpack, and this is my story:
            </p>
            <p className="font-serif py-2">
              In the middle of June of 2013, I was born in Drömling, Germany. I
              received a backpack from humans after my first four weeks of
              existence, and it is still on my back. When cold winds blew, I had
              to learn how to fly using the wind relative to my own body in
              order to go to Africa with my companions.
            </p>
            <p className="font-serif py-2 desktop:py-4">
              On the first long flight, I was nervous and just followed other
              older friends. They guided me to locations where we can easily
              fill up on energy, such as in human-made areas. After several
              years of harsh flight experience, sometimes I take the lead of our
              flight group. Plus, we definitely don't need to fly to Africa to
              survive the winter. We have found a better place, where our food
              is piled up like a mountain for 24 hours. Just peck it up, stop
              foraging. Some of us were against this motto like my son Håljer.
              He was born last year, and is now in Uganda. I did the same when I
              was a teenager, so I understand his decision. As an adult, I
              really love this new trending area though.
            </p>
            <p className="font-serif py-2 desktop:py-4">
              I will return to my hometown to meet my partner and take care of
              my home in spring. We are actually a long distance couple. While
              she used to travel west through Spain during the winter, I would
              like to fly the opposite route from Germany to Israel. Despite
              staying at another location in winter, we never missed our first
              date spot every spring.
            </p>
            <p className="font-serif py-2 desktop:py-4">
              As of now, we have 7 children. Every autumn some of them choose my
              partner’s route, and the others fly over my route. It's not a
              competition of how many children followed me or my partner. Most
              of the time, we fly in other flight groups. If we had luck, we
              could see each other. A year ago, I lost two children - X6F89 and
              X6V90. One was sacrificed by a sea eagle, and one died on an
              electrical power line. I hope they are flying somewhere in
              paradise.
            </p>
            <p className="font-serif py-2 desktop:py-4">
              The backpack helps me to send data. <br />
              Do you want to listen to the soundscape where I am?
            </p>
          </div>
        </div>

        {/* NEXT BUTTON */}
        <div className="relative h-screen w-[60rem] tablet:w-[120rem] pr-8">
          <button
            className="button z-50 text-m wideScreen:text-2xl left-0 absolute bottom-28 tablet:bottom-32 wideScreen:bottom-[13rem] -ml-24 tablet:ml-0 mt-3 font-serif"
            // TEMPORARY SOLUTION > ADD SHUFFLE TO URL ITEM ARRAY
            onClick={() =>
              navigate("/uploadstory/" + landmarkOptions[randomNumber])
            }
          >
            Connect &#8594;
          </button>
        </div>

        {/* SOUNDSCAPE PLAY WAVEFORM */}
        <div className="fixed bottom-0 left-0 w-screen px-14">
          <AudioPlayer></AudioPlayer>
        </div>
      </div>
    </>
  );
}

export default UploadStoriesIntro;
