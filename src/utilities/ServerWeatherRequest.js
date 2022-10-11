import React, {useEffect, useState} from 'react';

export function ServerWeatherRequest() {

    const [backendData, setBackendData] = useState(null)
    // const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
        fetch("https://backpackofwings-weather-api.netlify.app/api").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )
    }, [])
    if(backendData){
        console.log("weather api fetch: " + backendData)
    } else {
        console.log("weather api fetch: NONE DATA")
    }
    return (
        <div>
            
        </div>
    );
}