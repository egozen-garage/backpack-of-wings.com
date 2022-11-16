import SanityClient from "../client";
import { useEffect, useState } from "react";

export default function CallSanityAPI(query) {
    console.log("CallSanityApi")
    const [data, setData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    useEffect(()=>{
        Promise.all([
            SanityClient.fetch(
                query
            )
        ])
        .then(([sanityData]) => {
            setData(sanityData);
            setIsLoaded(true);
        })
        .catch((err) => {
            setError(err)
        })
    },[query])

    return { error, isLoaded, data };
}
