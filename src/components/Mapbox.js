import React, { useRef, useEffect, useState } from 'react';
// import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
// import MovebankDataYear from '../json/MovebankDataYear.json';
 
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJtaW5hcm5kdCIsImEiOiJjbDh2b2lhM2owZzE2M3dxdjhzbm96bGo3In0.MCm-qbborgyvRnQ7JA--5w';




// Call Movebank API and provide array
export default function Mapbox({zoomedOut}) {
    let dataReceived = false;
    // all API Data
    // const apiUrl = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&event_reduction_profile=EURING_03';
    // daily events
    const apiUrl = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&event_reduction_profile=EURING_01';
    let [movebankData, setMovebankData] = useState(null)
    useEffect(() => {
        // const apiUrl = props.apiUrl;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setMovebankData(data.individuals[0].locations))
            // .then((data) => console.log('This is your data', data.individuals[0].locations))
    },[])
    // console.log('This is your data', movebankData.id)
    if(!movebankData){
        return ( <pre>data loading...</pre>)
    }
    if(movebankData && !dataReceived){
        dataReceived = true;
        console.log("bird data 30 days: " + movebankData[1].location_long)
        console.log("bird data length: " + movebankData.length)
        return <DrawMapbox birdData={movebankData} zoomedOut={zoomedOut}/>
    }
}









function DrawMapbox(props){
    const mapContainer = useRef(null);
    const map = useRef(null);
    // const [lng, setLng] = useState(-77.035);
    // const [lat, setLat] = useState(38.875);
    const [zoom, setZoom] = useState(12);
    
    // for later: if click menu then zoom out
    if(12===3){ setZoom(8) }

    // L A S T    L O C A T I O N     D A T A
    // -----------------------------------------------------------------
    let lastItemCount = props.birdData.length-1
    let current_longitude = props.birdData[lastItemCount].location_long
    let current_latitude = props.birdData[lastItemCount].location_lat
    console.log("last entry: " + lastItemCount + props.birdData[lastItemCount].timestamp)
    console.log("bird data: " + props.birdData[1].location_long)
    console.log("current location: " + current_longitude + ", " + current_latitude)
    // for(let x of props.birdData){
    const currentCoordinates = [];
    for(let i = 0; i < lastItemCount; i++){
    // for(let i = 0; i < 50; i++){
        var locationX = [
            props.birdData[i].location_long,
            props.birdData[i].location_lat
        ]
        currentCoordinates.push(locationX)
        
        // [
            //     [-77.044211, 38.852924],
            //     [-77.045659, 38.860158],
            //     [-77.044232, 38.862326],
            // ]
    }        
    console.log(currentCoordinates);
    

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            // style: 'mapbox://styles/mapbox/light-v10',
            style: 'mapbox://styles/arminarndt/cl8vqgc4h002v14phy6bbsut8',
            // center: [lng, lat],
            center: [current_longitude, current_latitude],
            maxZoom: 17,
            zoom: zoom
        });

        
            map.current.on('load', () => {
                // 'line-gradient' can only be used with GeoJSON sources
                // and the source must have the 'lineMetrics' option set to true
                map.current.addSource('line', {
                    type: 'geojson',
                    lineMetrics: true,
                    data: geojson
                });
                // the layer must be of type 'line'
                map.current.addLayer({
                    type: 'line',
                    source: 'line',
                    id: 'line',
                    paint: {
                        'line-color': 'red',
                        'line-width': 5,
                        // 'line-gradient' must be specified using an expression
                        // with the special 'line-progress' property
                        'line-gradient': [
                            'interpolate',
                            ['linear'],
                            ['line-progress'],
                            0, 'blue',
                            // 0.1, 'royalblue',
                            // 0.3, 'cyan',
                            // 0.5, 'lime',
                            // 0.7, 'yellow',
                            1, 'red'
                        ]
                    },
                    layout: {
                        'line-cap': 'round',
                        'line-join': 'round'
                    }
                });
            });


    });

    

    const geojson = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'coordinates': currentCoordinates,
                    // [
                    //     [-77.044211, 38.852924],
                    //     [-77.045659, 38.860158],
                    //     [-77.044232, 38.862326],
                    //     [-77.040879, 38.865454],
                    //     [-77.039936, 38.867698],
                    //     [-77.040338, 38.86943],
                    //     [-77.04264, 38.872528],
                    //     [-77.03696, 38.878424],
                    //     [-77.032309, 38.87937],
                    //     [-77.030056, 38.880945],
                    //     [-77.027645, 38.881779],
                    //     [-77.026946, 38.882645],
                    //     [-77.026942, 38.885502],
                    //     [-77.028054, 38.887449],
                    //     [-77.02806, 38.892088],
                    //     [-77.03364, 38.892108],
                    //     [-77.033643, 38.899926]
                    // ],
                    'type': 'LineString'
                }
            }
        ]
    };






    const mapContainerStyle ={
        height: '100vh',
        // width: '100px',
        zIndex: -1
    }
    const mapStyle = "top-0 right-0 w-100 h-200"
    
        
    return (
        <div>
        <div ref={mapContainer} class={mapStyle} className="map-container" style={mapContainerStyle} />
        </div>
    );
}