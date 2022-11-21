import React from "react";
import { useParams } from "react-router-dom";
import { getImageDimensions } from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import { ImageUrlBuilder } from "@sanity/image-url";
import PortableText from "react-portable-text";

export function MaterialContent(props) {
  let singleLandmarkData = props.singleLandmarkData;
  const blockImageComponent = ({ value }) => {
    return <pre>{value}</pre>;
  };
  const blockComponents = {
    types: {
      // ISSUE: STOPS TO RENDER RIGHT HERE, PROBLEM WITH REQUESTING "IMAGE" TYPE?
      image: blockImageComponent,
    },
  };

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
                <>
                {blockContent.map(({ _type, asset, children }) => (
                  <div>
                    {_type === "image" ? (
                      <p>{asset._ref}</p>
                    ) : (
                        renderTextBlock(children)
                    )}
                  </div>
                ))}
                {console.log(
                  "MaterialContent, array of portable text blocks =" +
                    JSON.stringify(blockContent, null, 2)
                )}
                {console.log(
                  "MaterialContent, optional object of custom components to use=" +
                    JSON.stringify(blockComponents, null, 2)
                )}
              </>
            ) : 
            // <>
            // <PortableText
            //   value={blockContent}
            //   components={blockComponents}
            // />
            // </>
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
