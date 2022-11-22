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
          <div className="bg-white shadow-innerWindow rounded-2xl w-80 h-[200px] mx-6 shrink-0 overflow-scroll">
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
      )}
    </>
  );
}
