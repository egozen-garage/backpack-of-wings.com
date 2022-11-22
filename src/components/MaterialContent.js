import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { getImageDimensions } from "@sanity/asset-utils";
// import urlBuilder from "@sanity/image-url";
// import { ImageUrlBuilder } from "@sanity/image-url";
// import PortableText from "react-portable-text";
import SanityClient from "../client";
import {PortableText} from '@portabletext/react'
import urlBuilder from '@sanity/image-url'
import {getImageDimensions} from '@sanity/asset-utils'
import { useState } from "react";
// import { useId } from 'react';


// Barebones lazy-loaded image component
const ImageComponent = ({value, isInline}) => {
  console.log("image url: " + urlBuilder().image(value).width(isInline ? 100 : 800).fit('max').auto('format').url())
  const {width, height} = getImageDimensions(value)
  return (
    <img
      src={urlBuilder(SanityClient)
        .image(value)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .url()}
      alt={value.alt || ' '}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',
        width: '100%',

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  )
}

const components = {
  types: {
    image: ImageComponent,
    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
}

export function MaterialContent(props) {
  let singleLandmarkData = props.singleLandmarkData;

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
  const [previewId, setPreviewId] = useState(null)
  const ShowContent = (id) => {
    setPreviewId(id)
    document.getElementById("previewContainer").classList.remove("hidden")
    // const numberOfId = id.split("-").pop()
    // const contentId = "previewContent-" + previewId
    document.getElementById("previewContent-" + id).classList.remove("hidden") 
    // document.getElementById(previewId).className += " hideElement "
    // setPreview(true)
  }
  const HideContent = () => {
    document.getElementById("previewContainer").className += " hidden "
    document.getElementById("previewContent-" + previewId).className += " hidden "
    // setPreview(false)
  }

  return (
    <>
        {/* { !preview ? "" :  */}
          <div id="previewContainer" className="hidden previewMaterial fixed flex h-full z-60 top-0 bottom-0 right-0 left-0 items-center justify-center ">
            <div onClick={HideContent}  className="fixed bg-black opacity-10 top-0 bottom-0 right-0 left-0"></div>
            <div className="fixed flex flex-col drop-shadow-lg mx-20 max-w-screen-sm w-full bg-white h-4/5 w-4/5 rounded-3xl p-8">
              <div className="noScrollBar font-sans text-base wideScreen:text-xl wideScreen:leading-8 overflow-y-scroll h-auto">
              {/* {previewContent} */}
              {
                singleLandmarkData.materialArray.map(
                  ({
                    _type,
                    embedMapsSRC,
                    embedYoutubeHTML,
                    url,
                    blockContent,
                    tweetEmbed,
                    embedFacebookHTML,
                    embedTiktokHTML,
                  },i) => (
                    <div id={"previewContent-"+i} tabindex={i} className="previewMaterial hidden relative"> 
                      {_type === "googleMaps" ? (
                        <iframe src={embedMapsSRC} className="h-full w-full"></iframe>
                      ) : _type === "youtube" ? (
                        <iframe src={embedYoutubeHTML} className="h-full w-full"></iframe>
                      ) : _type === "imageURL" ? (
                        <img src={url} className="h-full" />
                      ) : _type === "image" ? (
                        // ISSUE: IMAGE NOT RENDERED BECAUSE "URL" VALUE NOT READ
                        <img src={_type} />
                      ) : _type === "blockObj" ? (
                        <div className="p-5 text-sm">
                          <PortableText value={blockContent} components={components}/>
                        </div>
                      ) : 
                      _type === "twitter" ? (
                        <iframe
                          border="0"
                          frameborder="0"
                          src={tweetEmbed}
                          className="h-full w-full"
                        ></iframe>
                      ) : _type === "facebook" ? (
                        <iframe src={embedFacebookHTML}></iframe>
                      ) : _type === "tiktok" ? (
                        <iframe src={embedTiktokHTML}></iframe>
                      ) : (
                        <div>other Material</div>
                      )}
                    </div>
                  )
                )
              }
              </div>
            </div>
          </div>


      


      <div className="gradientMaterialOverlay mt-3 mb-10 pl-[0.4rem] pr-[3rem]">
      {/* <div className="gradientMaterialOverlay my-10 pl-[0.4rem]"> */}
        <div className="flex overflow-x-scroll overflow-y-hidden scrollbar-hide">
        {
          singleLandmarkData.materialArray.map(
            ({
              _type,
              _key,
              embedMapsSRC,
              embedYoutubeHTML,
              url,
              blockContent,
              tweetEmbed,
              embedFacebookHTML,
              embedTiktokHTML,
            }, i) => (
              <div id={"materialContent-"+i} tabindex={i} onClick={() => ShowContent(i)} className="relative bg-white shadow-innerWindow rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-2 cursor-pointer "> 
              {/* <div onClick={ShowContent} className="relative bg-white shadow-innerWindow rounded-2xl w-auto h-[12rem] wideScreen:h-[15rem] mx-6 shrink-0 cursor-pointer overflow-hidden">  */}
              {/* overflow-scroll */}
                <div className="absolute top-0 w-full h-full bg-black opacity-0"></div>
                {_type === "googleMaps" ? (
                  <iframe src={embedMapsSRC} title={_key} className="h-full w-[20rem] wideScreen:w-[28rem]"></iframe>
                ) : _type === "youtube" ? (
                  <iframe src={embedYoutubeHTML} title={_key} className="h-full w-[24rem] wideScreen:w-[30rem]"></iframe>
                ) : _type === "imageURL" ? (
                  <img src={url} alt="fo" className="h-full w-full" />
                ) : _type === "image" ? (
                  // ISSUE: IMAGE NOT RENDERED BECAUSE "URL" VALUE NOT READ
                  <img alt="fo" src={_type} />
                ) : _type === "blockObj" ? (
                  <div className="p-5 text-sm w-[22rem]">
                    <PortableText value={blockContent} components={components}/>
                  </div>
                ) : 
                _type === "twitter" ? (
                  <iframe
                    border="0"
                    frameborder="0"
                    src={tweetEmbed}
                    title={_key}
                    className="h-full w-full"
                  ></iframe>
                ) : _type === "facebook" ? (
                  <iframe title={_key} src={embedFacebookHTML} className="h-auto w-full"></iframe>
                ) : _type === "tiktok" ? (
                  <iframe title={_key} src={embedTiktokHTML} className="h-auto w-full"></iframe>
                ) : (
                  <div>other Material</div>
                )}
              </div>
            )
          )
        }

        </div>
      </div>
    </>
  );
}
