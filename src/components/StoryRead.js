import React, { useState, useEffect } from "react";
import sanityClient from "../client";

function StoryRead(props) {
    // test Sanity connection
    const [story, setStory] = useState(null);
    useEffect(() => {
            sanityClient
                .fetch(
                    `*[_type == "story"]{
        title,
        }`
                )
                .then((data) => setStory(data))
                .catch(console.error);
        }, []);
    console.log("story json: " + JSON.stringify(story))


    return (
        <div>
            
        </div>
    );
}

export default StoryRead;