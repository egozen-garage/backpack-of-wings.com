import { useEffect, useState, useMemo } from 'react';
import sanityClient from "../../../client";

// const FetchMapData = useCallback(() => {
export default function FetchMapData(props){
    console.log(props)
    // all API Data
    // case 1: get 1 entry per day (ca. 3200 entries)
    // const apiUrl = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&event_reduction_profile=EURING_01';
    // case 2: get 1 entry every 50km distance
    // const apiUrl = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&event_reduction_profile=EURING_02';
    // case 3: get last 30 days (ca. 300 entries)
    const apiUrl = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&event_reduction_profile=EURING_03';
    
    // get entries of time range
    // &timestamp_start=1666648800000&timestamp_end=1666735200000  // from 25.10.2022 to 26.10.2022 
    // const apiUrl = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&timestamp_start=1664143200000&timestamp_end=1666735200000&sensor_type=gps';
    // &timestamp_start=1664056800000&timestamp_end=1666648800000  // from 25.09.2022 to 25.10.2022 

    let [movebankData, setMovebankData] = useState(null)
    let [weatherData, setWeatherData] = useState(null);
    let [landmark, setLandmark] = useState(null);
    let [dataReady, setDataReady] = useState(false);




    useEffect(() => {
        if(dataReady) return
        // if(!dataReady){
            Promise.all([
                    fetch(apiUrl).then((response) => response.json()),
                    sanityClient.fetch(
                        `*[_type == "weatherData"]{
                            temp, pressure, humidity, wind_speed, wind_deg, sunrise, sunset
                        }[0]`
                    ),
                    sanityClient.fetch(
                        `*[_type == "landmark" ]{"url":url.current, "country":country, "locationType": locationType, "locationName": locationName, "latitude":latitude, "longitude":longitude}`
                    ),
                ])
                .then(([movebankData, weatherData, landmark]) => {
                    setMovebankData(movebankData.individuals[0].locations);
                    setWeatherData(weatherData);
                    setLandmark(landmark);
                    setDataReady(true);
                    console.log("FetchMapData: Api Data has been called")
                })
                .catch((err) => {
                    console.log(err);
                });
        // } else {
        //     return
        // }
    }, [dataReady])
    // if(dataReady) return;
    console.log("FetchMapData main level")
    return [movebankData, weatherData, landmark, dataReady]
}