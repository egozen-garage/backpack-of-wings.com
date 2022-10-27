import SanityClient from "../client";
import { useEffect, useState } from "react";

export function CallSanityAPI() {

    const query = '*[_type == "landmark"]{url{current}, locationName, country}'

    let [sanityData, setSanityData] = useState(null);
    useEffect(()=>{
        Promise.all([
            SanityClient.fetch(query),
        ])
        .then(([sanityData]) => {
            setSanityData(sanityData);
            console.log("sanity data : " + JSON.stringify(sanityData))
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    return sanityData
     
}