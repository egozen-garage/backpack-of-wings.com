import React from "react";
import { useParams } from "react-router-dom";
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
  console.log("material content rendered")
  let singleLandmarkData = props.singleLandmarkData;
  // const blockImageComponent = ({ value }) => {
  //   return <pre>{value}</pre>;
  // };
  // const blockComponents = {
  //   types: {
  //     // ISSUE: STOPS TO RENDER RIGHT HERE, PROBLEM WITH REQUESTING "IMAGE" TYPE?
  //     image: blockImageComponent,
  //   },
  // };

//   function toPlainText(children = []) {
//     return children
//     .map(child => {
//         return (
//             <p>{child.text}</p>
//         )
//         })
//   }

  function renderTextBlock(children = []) {
    return children
    .map(child => {
            return (
                <p className="p-2">{child.text}</p>
            )
        })
  }

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

  return (
    <>
      {singleLandmarkData.materialArray.map(
        ({
          _type,
          embedMapsSRC,
          embedYoutubeHTML,
          url,
          blockContent,
          tweetEmbed,
          embedFacebookHTML,
          embedTiktokHTML,
        }) => (
          <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 overflow-scroll">
            {_type === "googleMaps" ? (
              <iframe src={embedMapsSRC} className="h-full w-full"></iframe>
            ) : _type === "youtube" ? (
              <iframe src={embedYoutubeHTML} className="h-full w-full"></iframe>
            ) : _type === "imageURL" ? (
              <img src={url} className="h-full" />
            ) : _type === "image" ? (
              // ISSUE: URL ITEM NOT READ
              <img src={_type} />
            ) : _type === "blockObj" ? (
                // NEEDS FIXING!
                // renderBlock(blockContent)
              <PortableText value={blockContent} components={components}/>
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
      )}
    </>
  );
}
