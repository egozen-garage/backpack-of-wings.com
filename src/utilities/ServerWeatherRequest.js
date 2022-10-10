import React, {useEffect, useState} from 'react';

export function ServerWeatherRequest() {

    const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
        fetch("/api").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )
    }, [])
    console.log("weather api fetch: " + backendData)
    return (
        <div>
            
        </div>
    );
}