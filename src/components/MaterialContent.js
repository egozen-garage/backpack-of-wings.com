import React from "react";
// import { useParams } from "react-router-dom";
// import { getImageDimensions } from "@sanity/asset-utils";
// import urlBuilder from "@sanity/image-url";
// import { ImageUrlBuilder } from "@sanity/image-url";
// import PortableText from "react-portable-text";
import SanityClient from "../client";
import {PortableText} from '@portabletext/react'
import urlBuilder from '@sanity/image-url'
import {getImageDimensions} from '@sanity/asset-utils'



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


  const ShowContent = () => {
    console.log("open content")
  }

  
  return (
    <>
      {/* <div className="previewMaterial fixed h-full bg-white z-60 pt-30 flex top-0 bottom-0 right-0 left-0 items-center justify-center">
        <div className="fixed flex flex-col drop-shadow-lg mx-20 max-w-screen-sm w-full bg-white h-4/5 rounded-3xl p-8">
          <div className="noScrollBar font-sans text-base wideScreen:text-xl wideScreen:leading-8 overflow-y-scroll h-auto">
          content
          </div>
        </div>
      </div> */}

      {singleLandmarkData.materialArray.map(
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
        }) => (
          <div onClick={ShowContent} className="relative bg-white shadow-innerWindow rounded-2xl w-auto h-[12rem] wideScreen:h-[15rem] mx-6 shrink-0 cursor-pointer overflow-hidden"> 
          {/* overflow-scroll */}
            <div className="absolute top-0 w-full h-full bg-black opacity-0"></div>
            {_type === "googleMaps" ? (
              <iframe src={embedMapsSRC} title={_key} className="h-full w-[20rem] wideScreen:w-[28rem]"></iframe>
            ) : _type === "youtube" ? (
              <iframe src={embedYoutubeHTML} title={_key} className="h-full w-[24rem] wideScreen:w-[30rem]"></iframe>
            ) : _type === "imageURL" ? (
              <img src={url} alt="fo" className="h-full w-[15rem]" />
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
      )}
    </>
  );
}
