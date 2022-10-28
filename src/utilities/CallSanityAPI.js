import SanityClient from "../client";
import { useEffect, useState } from "react";

export default function CallSanityAPI(query) {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    // const query = '*[_type == "landmark"]{url{current}, locationName, country}'

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
