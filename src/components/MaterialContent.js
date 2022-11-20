import React from "react";
import { useParams } from "react-router-dom";
import { getImageDimensions } from '@sanity/asset-utils'
import urlBuilder from "@sanity/image-url";

export function MaterialContent(props) {
    let singleLandmarkData = props.singleLandmarkData;
    const blockImageComponent = ({value, isInline}) => {
        const {width, height} = getImageDimensions(value)
        return (
          <img 
            src={urlBuilder()
            .image(value)
            .width(isInline ? 100 : 800)
            .fit('max')
            .auto('format')
            .url()}
          /> 
        )
      }
    const blockComponents = {
        types: {
          // ISSUE: STOPS TO RENDER RIGHT HERE, PROBLEM WITH PORTABLE TEXT
          image: blockImageComponent,
        },
      }

    console.log("MaterialContent = " + singleLandmarkData)


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
              <img src={url} className="h-full"/>
            ) : _type === "image" ? (
              // ISSUE: URL ITEM NOT READ
              <img src={_type} />
            ) : _type === "blockObj" ? (
              <>
              {blockContent.map( ({_type, asset}) => (
                <p>{_type}</p>
              ))}
              {console.log("MaterialContent, array of portable text blocks =" + JSON.stringify(blockContent, null, 2))}
              {console.log("MaterialContent, optional object of custom components to use=" + JSON.stringify(blockComponents, null, 2))}
              </>
              // <>
              // <PortableText
              //   value={blockContent}
              //   components={blockComponents}
              // /> 
              // </>
              ) : _type === "twitter" ? (
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
