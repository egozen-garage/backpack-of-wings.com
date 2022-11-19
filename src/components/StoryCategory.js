// import React from "react";
// import { Story } from "./Story.js";
// import SanityClient from "../client";
import { useId } from "react";
import { useParams } from "react-router-dom";
import StoryInputForm from "./StoryInputForm.js";
import { useLocation } from "react-router-dom";
import PortableText from "react-portable-text";
import CallSanityAPI from "../utilities/CallSanityAPI";
import "../css/gradientAnimation.css";
import "../css/animation.css";

export function StoryCategory(props) {
  const { landmark } = useParams();
  // const location = useLocation();
  // let currentLandmark = location.pathname.split("/")[2];
  // let currentLandmark = landmark;
  
  // let istanbul = landmarkData[0]
  // let dudaimsite = landmarkData[1]
  // let hama = landmarkData[2]
  // let lackova = landmarkData[3]
  // let droemling = landmarkData[4]
  // let neveeitan = landmarkData[5]
  
  let landmarkData = props.landmarkData
  const data = () => {
    let tempData;
    for(const x in landmarkData){
      if(landmark === landmarkData[x].url.current){
        tempData = landmarkData[x]
      }
    }
    return tempData
  }
  const singleLandmarkData = data()
  // console.log("storyCatergory > landmark data : " + JSON.stringify(singleLandmarkData) )
  
  // let queryLandmark = CallSanityAPI(`*[_type == "landmark" && url.current == "${landmark}"]`);
  // let landmarkContent = queryLandmark.data[0];
  
  // console.log("storyCategory > current Landmark:" + currentLandmark)
  // console.log("storyCatergory > landmark data: " + landmarkData[0].url.current )
  // console.log("storyCatergory > materials of landmark : " + JSON.stringify(hama.materialArray) )



  return (
    <>
      <div className="uploadStories-Wrapper uploadStoriesContainerAnimation fixed flex flex-col top-0 z-30 right-0 h-screen w-[50rem] wideScreen:w-[80rem]">

        {/* STORIES MATERIAL CONTAINER */}
        <div className="gradientMaterialOverlay my-10 pl-[0.4rem]">
          <div className="flex overflow-x-scroll scrollbar-hide">

            {
              singleLandmarkData ?
              (
                <>
                  {singleLandmarkData.materialArray.map(({ _type, embedMapsSRC, embedYoutubeHTML, url, blockContent, tweetEmbed, embedFacebookHTML, embedTiktokHTML }) => (
                    <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                      {_type === "googleMaps" ? 
                        (<iframe src={embedMapsSRC}></iframe>) : 
                      _type === "youtube" ?
                        (<iframe src={embedYoutubeHTML}></iframe>) :
                      _type === "imageURL" ?
                        (<img src={url}/>) :
                      _type === "image" ?
                        (<img src={_type}/>) :
                      // _type === "blockObj" ?
                      //   (<PortableText content={blockContent}/>) :
                      _type === "twitter" ?
                        (<iframe border="0" frameborder="0" height="250" width="550" src={tweetEmbed}></iframe>) :
                      _type === "facebook" ?
                        (<iframe src={embedFacebookHTML}></iframe>) :
                      _type === "tiktok" ?
                        (<iframe src={embedTiktokHTML}></iframe>) :
                        (<div>other Material</div>)
                      } 
                    </div>
                  ))}
                </>
              ) : "" 
            }

            {/* {
              currentLandmark === "istanbul" ?
              (
                <>
                  {istanbul.materialArray.map(({ _type, embedMapsSRC, embedYoutubeHTML, url, blockContent, tweetEmbed, embedFacebookHTML, embedTiktokHTML }) => (
                    <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                      {_type === "googleMaps" ? 
                        (<iframe src={embedMapsSRC}></iframe>) : 
                      _type === "youtube" ?
                        (<iframe src={embedYoutubeHTML}></iframe>) :
                      _type === "imageURL" ?
                        (<img src={url}/>) :
                      _type === "image" ?
                        (<img src={_type}/>) :
                      // _type === "blockObj" ?
                      //   (<PortableText content={blockContent}/>) :
                      _type === "twitter" ?
                        (<iframe border="0" frameborder="0" height="250" width="550" src={tweetEmbed}></iframe>) :
                      _type === "facebook" ?
                        (<iframe src={embedFacebookHTML}></iframe>) :
                      _type === "tiktok" ?
                        (<iframe src={embedTiktokHTML}></iframe>) :
                        (<div>other Material</div>)
                      } 
                    </div>
                  ))}
                </>
              ) :

              currentLandmark == "dudaimsite" ?
              (
                <>
                  {dudaimsite.materialArray.map(({ _type, embedMapsSRC, embedYoutubeHTML, url, blockContent, tweetEmbed, embedFacebookHTML, embedTiktokHTML }) => (
                    <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                      {_type === "googleMaps" ? 
                        (<iframe src={embedMapsSRC}></iframe>) : 
                      _type === "youtube" ?
                        (<iframe src={embedYoutubeHTML}></iframe>) :
                      _type === "imageURL" ?
                        (<img src={url}/>) :
                      _type === "image" ?
                        (<img src={_type}/>) :
                      // _type === "blockObj" ?
                      //   (<PortableText content={blockContent}/>) :
                      _type === "twitter" ?
                        (<iframe border="0" frameborder="0" height="250" width="550" src={tweetEmbed}></iframe>) :
                      _type === "facebook" ?
                        (<iframe src={embedFacebookHTML}></iframe>) :
                      _type === "tiktok" ?
                        (<iframe src={embedTiktokHTML}></iframe>) : 
                        (<div>other Material</div>)
                      } 
                    </div>
                  ))}
                </>
              ) :

              // ISSUE: BLOCK CONTENT WITH IMAGE DOES NOT WORK
              currentLandmark == "hama" ?
              (
                <>
                  {hama.materialArray.map(({ _type, embedMapsSRC, embedYoutubeHTML, url, blockContent, tweetEmbed, embedFacebookHTML, embedTiktokHTML }) => (
                    <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                      {_type === "googleMaps" ? 
                        (<iframe src={embedMapsSRC}></iframe>) : 
                      _type === "youtube" ?
                        (<iframe src={embedYoutubeHTML}></iframe>) :
                      _type === "imageURL" ?
                        (<img src={url}/>) :
                      _type === "image" ?
                        (<img src={_type}/>) :
                      // _type === "blockObj" ?
                      //   (<PortableText content={blockContent}/>) :
                      _type === "twitter" ?
                        (<iframe border="0" frameborder="0" height="250" width="550" src={tweetEmbed}></iframe>) :
                      _type === "facebook" ?
                        (<iframe src={embedFacebookHTML}></iframe>) :
                      _type === "tiktok" ?
                        (<iframe src={embedTiktokHTML}></iframe>) :
                        (<div>other Material</div>)
                      } 
                    </div>
                  ))}
                </>
              ) :  

              // ISSUE: BLOCK CONTENT WITH IMAGE DOES NOT WORK
              currentLandmark == "lackova" ?
              (
                <>
                  {lackova.materialArray.map(({ _type, embedMapsSRC, embedYoutubeHTML, url, blockContent, tweetEmbed, embedFacebookHTML, embedTiktokHTML }) => (
                    <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                      {_type === "googleMaps" ? 
                        (<iframe src={embedMapsSRC}></iframe>) : 
                      _type === "youtube" ?
                        (<iframe src={embedYoutubeHTML}></iframe>) :
                      _type === "imageURL" ?
                        (<img src={url}/>) :
                      _type === "image" ?
                        (<img src={_type}/>) :
                      // _type === "blockObj" ?
                      //   (<PortableText content={blockContent}/>) :
                      _type === "twitter" ?
                        (<iframe border="0" frameborder="0" height="250" width="550" src={tweetEmbed}></iframe>) :
                      _type === "facebook" ?
                        (<iframe src={embedFacebookHTML}></iframe>) :
                      _type === "tiktok" ?
                        (<iframe src={embedTiktokHTML}></iframe>) :
                        (<div>other Material</div>)
                      } 
                    </div>
                  ))}
                </>
              ) :  
              
              // DOESNT WORK
              currentLandmark == "droemling" ?
              (
                <>
                  {droemling.materialArray.map(({ _type, embedMapsSRC, embedYoutubeHTML, url, blockContent, tweetEmbed, embedFacebookHTML, embedTiktokHTML }) => (
                    <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                      {_type === "googleMaps" ? 
                        (<iframe src={embedMapsSRC}></iframe>) : 
                      _type === "youtube" ?
                        (<iframe src={embedYoutubeHTML}></iframe>) :
                      _type === "imageURL" ?
                        (<img src={url}/>) :
                      _type === "image" ?
                        (<img src={_type}/>) :
                      // _type === "blockObj" ?
                      //   (<PortableText content={blockContent}/>) :
                      _type === "twitter" ?
                        (<iframe border="0" frameborder="0" height="250" width="550" src={tweetEmbed}></iframe>) :
                      _type === "facebook" ?
                        (<iframe src={embedFacebookHTML}></iframe>) :
                      _type === "tiktok" ?
                        (<iframe src={embedTiktokHTML}></iframe>) :
                        (<div>other Material</div>)
                      } 
                    </div>
                  ))}
              </>
              ) : 

              currentLandmark == "neveeitan" &&
              (                
              <>
                  {neveeitan.materialArray.map(({ _type, embedMapsSRC, embedYoutubeHTML, url, blockContent, tweetEmbed, embedFacebookHTML, embedTiktokHTML }) => (
                    <div className="bg-white rounded-2xl w-80 h-[200px] mx-6 shrink-0 p-6">
                      {_type === "googleMaps" ? 
                        (<iframe src={embedMapsSRC}></iframe>) : 
                      _type === "youtube" ?
                        (<iframe src={embedYoutubeHTML}></iframe>) :
                      _type === "imageURL" ?
                        (<img src={url}/>) :
                      _type === "image" ?
                        (<img src={_type}/>) :
                      // _type === "blockObj" ?
                      //   (<PortableText content={blockContent}/>) :
                      _type === "twitter" ?
                        (<iframe border="0" frameborder="0" height="250" width="550" src={tweetEmbed}></iframe>) :
                      _type === "facebook" ?
                        (<iframe src={embedFacebookHTML}></iframe>) :
                      _type === "tiktok" ?
                        (<iframe src={embedTiktokHTML}></iframe>) :
                        (<div>other Material</div>)
                      } 
                    </div>
                  ))}
              </>)
            } */}
          </div>
        </div>

        {/* STORIES INPUT TEXT CONTAINER */}
        <StoryInputForm currentLandmark={landmark}/>
        {/* <Story /> */}
      </div>
    </>
  );
}
