// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { getImageDimensions } from "@sanity/asset-utils";
// import urlBuilder from "@sanity/image-url";
// import { ImageUrlBuilder } from "@sanity/image-url";
// import PortableText from "react-portable-text";
import SanityClient from "../client";
import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { useState } from "react";
// import { useId } from 'react';
import { useRef } from "react";

// Barebones lazy-loaded image component
const ImageComponent = ({ value, isInline }) => {
  console.log(
    "image url: " +
      urlBuilder()
        .image(value)
        .width(isInline ? 100 : 800)
        .fit("max")
        .auto("format")
        .url()
  );
  const { width, height } = getImageDimensions(value);
  return (
    <img
      src={urlBuilder(SanityClient)
        .image(value)
        .width(isInline ? 100 : 800)
        .fit("max")
        .auto("format")
        .url()}
      alt={value.alt || " "}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? "inline-block" : "block",
        width: "100%",

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  );
};

const components = {
  types: {
    image: ImageComponent,
    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
};

export function MaterialContent(props) {
  let singleLandmarkData = props.singleLandmarkData;
  const materialContainerRef = useRef(null);

  // function renderTextBlock(children = []) {
  //   return children
  //   .map(child => {
  //           return (
  //               <p className="p-2">{child.text}</p>
  //           )
  //       })
  // }

  //   const portableComponent = {
  //     block: {
  //         normal: ({children}) => <p>{children[0].text}</p>,
  //         h4: ({children}) => <h4 className="text-2xl">{children[0].text}</h4>,
  //     }
  //   }

  // const renderTdextBlock = (props) => {
  //   console.log("portabletext, props, render all block Contents ="+JSON.stringify(props))
  //   return <PortableText value={props} components={portableComponent}/>
  // }

  //   const builder = ImageUrlBuilder(singleLandmarkData)

  //   console.log("MaterialContent = " + singleLandmarkData);

  // const [preview, setPreview] = useState(null)
  const [previewId, setPreviewId] = useState(null);
  const ShowContent = (id) => {
    setPreviewId(id);
    document.getElementById("previewContainer").classList.remove("hidden");
    document.getElementById("previewContent-" + id).classList.remove("hidden");
  };
  const HideContent = () => {
    // puse youtube videos
    const iframe = document.getElementById("previewContent-" + previewId).getElementsByTagName("iframe")[0]
    if(iframe){
      // if(iframeFirstClasse === "iframeyoutube-iframe"){
      const iframeFirstClasse = iframe.classList[0]
      if(iframeFirstClasse === "youtube-iframe"){
        console.log("pause youtube video")
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;
      }
    }
    // // hide popup
    document.getElementById("previewContainer").className += " hidden ";
    document.getElementById("previewContent-" + previewId).className += " hidden ";
  };

  const scroll = (scrollOffset) => {
    const container = materialContainerRef.current;

    // Calculate the target scroll position
    const targetScrollLeft = container.scrollLeft + scrollOffset;

    // Use CSS transitions to animate the scroll
    container.style.scrollBehavior = 'smooth';
    container.scrollLeft = targetScrollLeft;

    // After the animation, remove scroll behavior for normal scrolling
    container.addEventListener('scroll', () => {
      container.style.scrollBehavior = 'auto';
    });
  };

  return (
    <>
      {/* { !preview ? "" :  */}
      {/* EXPANDED WINDOW */}
      <div
        id="previewContainer"
        className="hidden previewMaterial fixed flex h-full z-60 top-0 bottom-0 right-0 left-0 items-center justify-center "
      >
        <div
          onClick={HideContent}
          className="fixed bg-black opacity-10 top-0 bottom-0 right-0 left-0"
        ></div>
        <div className="fixed flex flex-col drop-shadow-lg mx-20 sm:w-[inherit] bg-white h-auto rounded-3xl p-8">
          <div className="font-sans text-base wideScreen:text-xl wideScreen:leading-8 overflow-y-scroll h-auto">
            {/* {previewContent} */}
            {singleLandmarkData.materialArray.map(
              (
                {
                  _type,
                  _key,
                  embedMapsSRC,
                  embedYoutubeHTML,
                  url,
                  blockContent,
                  tweetEmbed,
                  embedFacebookHTML,
                  embedTiktokHTML,
                },
                i
              ) => (
                <div
                  id={"previewContent-" + i}
                  tabIndex={i}
                  className="previewMaterial hidden relative "
                  title={_key}
                  key={"uniqueKey_"+_key}
                >
                  {_type === "googleMaps" ? (
                    <iframe
                      src={embedMapsSRC}
                      title={"popUp_" + _key}
                      key={"popUp_uniqueKey_" + _key}
                      // className="h-[30rem] wideScreen:h-[40rem] w-[30rem] laptop:w-[40rem] wideScreen:w-[50rem] rounded-2xl"
                      className="h-auto wideScreen:h-[40rem] w-auto laptop:w-[40rem] wideScreen:w-[50rem] rounded-2xl"
                    ></iframe>
                  ) : _type === "youtube" ? (
                    <iframe
                      src={embedYoutubeHTML}
                      // className="youtube-iframe h-[15rem] tablet:h-[20rem] wideScreen:h-[30rem] w-[30rem] tablet:w-[40rem] wideScreen:w-[60rem] rounded-2xl"
                      className="youtube-iframe h-auto tablet:h-[20rem] wideScreen:h-[30rem] w-auto tablet:w-[40rem] wideScreen:w-[60rem] rounded-2xl "
                      title={"popUp_" + _key}
                      key={"popUp_uniqueKey_" + _key}
                    ></iframe>
                  ) : _type === "imageURL" ? (
                    <img 
                      src={url} 
                      className="h-full" 
                      alt="fo" 
                      title={"popUp_" + _key}
                      key={"popUp_uniqueKey_" + _key}
                      />
                  ) : _type === "image" ? (
                    // ISSUE: IMAGE NOT RENDERED BECAUSE "URL" VALUE NOT READ
                    <img 
                      src={_type} 
                      alt="fo" 
                      title={"popUp_" + _key}
                      key={"popUp_uniqueKey_" + _key}
                      />
                  ) : _type === "blockObj" ? (
                    <div 
                      // className="p-5 text-sm wideScreen:text-lg h-full max-h-[80vh] max-w-sm wideScreen:max-w-lg" 
                      className="sm:p-5 p-0 text-sm wideScreen:text-lg wideScreen:max-h-[80] max-h-[70vh] sm:max-w-sm w-100 wideScreen:max-w-lg" 
                      title={"popUp_" + _key}
                      key={"popUp_uniqueKey_" + _key}
                      >
                      <PortableText
                        value={blockContent}
                        components={components}
                        title={"popUp_" + _key}
                        key={"popUp_uniqueKey_" + _key}
                      />
                    </div>
                  ) : _type === "twitter" ? (
                    <iframe
                      border="0"
                      frameBorder="0"
                      src={tweetEmbed}
                      className="h-[20rem] tablet:h-[25rem] wideScreen:h-[45rem] w-[auto] tablet:w-[20rem]  wideScreen:w-[30rem]"
                      title={"popUp_" + _key}
                      key={"popUp_uniqueKey_" + _key}
                    ></iframe>
                  ) : _type === "facebook" ? (
                    <iframe
                      src={embedFacebookHTML}
                      title={"popUp_" + _key}
                      key={"popUp_uniqueKey_" + _key}
                      className="h-[50vh] desktop:h-[44rem] w-[20rem] tablet:w-[30rem] desktop:w-[32rem]"
                    ></iframe>
                  ) : _type === "tiktok" && (
                    <iframe
                      src={embedTiktokHTML}
                      title={"popUp_" + _key}
                      key={"popUp_uniqueKey_" + _key}
                      className="h-[45rem] w-[25rem]"
                    ></iframe>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>


      {/* THUMBNAIL WINDOW */}
      <div className="flex mt-3 mb-10 sm:pr-[3rem] pr-0 ml-[16px]">
        {/* <div className="gradientMaterialOverlay my-10 pl-[0.4rem]"> */}
        {/* <div className="flex "> */}
          <button className=" " onClick={() => scroll(-400)} >
            <p className="button font-serif font-bold">&#8592;</p>
          </button>
          <div ref={materialContainerRef} className="snap-x gradientMaterialOverlay flex overflow-x-scroll overflow-y-hidden scrollbar-hide pl-[1rem] pr-[10rem]  ">
            {/* <div>back &#8594;</div> */}
            {singleLandmarkData.materialArray.map(
              (
                {
                  _type,
                  _key,
                  embedMapsSRC,
                  embedYoutubeHTML,
                  url,
                  blockContent,
                  tweetEmbed,
                  embedFacebookHTML,
                  embedTiktokHTML,
                },
                i
              ) => (
                <div
                  id={"materialContent-" + i}
                  tabIndex={i}
                  onClick={() => ShowContent(i)}
                  className="snap-center relative bg-white shadow-innerWindow rounded-2xl w-auto h-[12rem] wideScreen:h-[18rem] mx-3 shrink-0 cursor-pointer overflow-hidden"
                  title={_key}
                  key={"uniqueKey_"+_key}
                >
                  {/* <div onClick={ShowContent} className="relative bg-white shadow-innerWindow rounded-2xl w-auto h-[12rem] wideScreen:h-[15rem] mx-6 shrink-0 cursor-pointer overflow-hidden">  */}
                  {/* overflow-scroll */}
                  <div className="absolute top-0 w-full h-full bg-black opacity-0"></div>
                  {_type === "googleMaps" ? (
                    <iframe
                      src={embedMapsSRC}
                      title={_key}
                      key={"uniqueKey_"+_key}
                      className="h-full w-[20rem] wideScreen:w-[30rem]"
                    ></iframe>
                  ) : _type === "youtube" ? (
                    <iframe
                      src={embedYoutubeHTML}
                      title={_key}
                      key={"uniqueKey_"+_key}
                      className="h-full w-[24rem] wideScreen:w-[34rem]"
                    ></iframe>
                  ) : _type === "imageURL" ? (
                    <img 
                      src={url} alt="fo" 
                      title={_key} 
                      key={"uniqueKey_"+_key}
                      className="h-full w-full" />
                  ) : _type === "image" ? (
                    // ISSUE: IMAGE NOT RENDERED BECAUSE "URL" VALUE NOT READ
                    <img 
                      alt="fo" 
                      src={_type} 
                      title={_key}
                      key={"uniqueKey_"+_key}
                      />
                  ) : _type === "blockObj" ? (
                    <div 
                      className="p-5 text-sm w-[26rem]" 
                      title={_key}
                      key={"uniqueKey_"+_key}
                      >
                      <PortableText
                        value={blockContent}
                        components={components}
                        title={_key}
                        key={"uniqueKey_"+_key}
                      />
                    </div>
                  ) : _type === "twitter" ? (
                    <iframe
                      border="0"
                      frameBorder="0"
                      src={tweetEmbed}
                      title={_key}
                      key={"uniqueKey_"+_key}
                      className="h-full w-full"
                    ></iframe>
                  ) : _type === "facebook" ? (
                    <iframe
                      title={_key}
                      key={"uniqueKey_"+_key}
                      src={embedFacebookHTML}
                      className="h-[30rem] w-full"
                    ></iframe>
                  ) : _type === "tiktok" && (
                    <iframe
                      title={_key}
                      key={"uniqueKey_"+_key}
                      src={embedTiktokHTML}
                      className="h-auto w-full"
                    ></iframe>
                  )}
                </div>
              )
            )}
          </div>
          <button className=" " onClick={() => scroll(400)} >
            <p className="button font-serif font-bold">&#8594;</p>
          </button>
        {/* </div> */}
      </div>
    </>
  );
}
