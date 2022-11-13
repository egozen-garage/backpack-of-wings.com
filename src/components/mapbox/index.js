import React, { useRef, useEffect, useState, useMemo, useCallback} from 'react';
// import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import MovebankDataYear from '../../json/MovebankDataYear.json';
import sanityClient from "../../client";
// import iconCurrentLocation from "../img/current-location.svg"
import { useLocation } from 'react-router-dom'
import FetchMapData from './service/FetchMapData';
import './mapboxStyle.css'
 
import { useNavigate } from "react-router-dom";

// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJtaW5hcm5kdCIsImEiOiJjbDh2b2lhM2owZzE2M3dxdjhzbm96bGo3In0.MCm-qbborgyvRnQ7JA--5w';


// const mapData = FetchMapData() // fetch relevant data for map

export default function Mapbox() { 
    console.log("CALL Mapbox")
    let dataReceived = false;

    const apiUrl = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&event_reduction_profile=EURING_03';
    
    let [movebankData, setMovebankData] = useState(null)
    let [weatherData, setWeatherData] = useState(null);
    let [landmark, setLandmark] = useState(null);
    let [dataReady, setDataReady] = useState(false);
    let [mapData, setMapData] = useState([])

    useEffect(() => {
        // if(dataReady) return
        // if(!dataReady){
            Promise.all([
                    fetch(apiUrl).then((response) => response.json()),
                    sanityClient.fetch(
                        // *[dateTime(_updatedAt) > dateTime(now()) - 60*60*24*7] // Updated within the past week
                        `*[_type == "weatherData" && dateTime(_updatedAt) > dateTime(now()) - 60*60]{
                            temp, pressure, humidity, wind_speed, wind_deg, sunrise, sunset, city_name, timezone, country, weather_description, timestamp
                        }[0]`
                        // `*[_type == "weatherData"]{
                        //     temp, pressure, humidity, wind_speed, wind_deg, sunrise, sunset, city_name, timezone, country, weather_description, timestamp
                        // }[0]`
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
                    setMapData([movebankData, weatherData, landmark])
                    console.log("FetchMapData: Api Data has been called")
                })
                .catch((err) => {
                    console.log(err);
                });
        // } else {
        //     return
        // }
    }, [])    


    // console.log("mapData: " + JSON.stringify(mapData))
    // console.log("mapData: " + JSON.stringify(movebankData))


    if(!movebankData){
        console.log("data coming")
        return ( <pre>data loading...</pre>)
    }
    if(movebankData && !dataReceived){
        console.log("data arrived")
        dataReceived = true;
        // console.log("bird data 30 days: " + movebankData[1].location_long)
        return <DrawMapbox mapData={mapData}/>
    }
}



function DrawMapbox(props){
    const mapContainer = useRef(null);
    const weaterContainer = useRef(null);
    const map = useRef(null);
    const location = useLocation()
    let navigate  = useNavigate();
    const firstLoad = useRef(true);

    // console.log("mapData: " + JSON.stringify(props.mapData[0]))
    // console.log("mapData: " + JSON.stringify(props.weatherData))

    const latestBirdData = props.mapData[0].individuals[0].locations // FetchMapData() --> [0] movebankData latest locations
    const weatherData    = props.mapData[1] // FetchMapData() --> [1] weatherData
    const landmarkSanity = props.mapData[2] // FetchMapData() --> [2] landmark
    // const dataReady      = props.mapData[3] // FetchMapData() --> [3] dataReady

    const pathRGB = '163, 220, 245'
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    let lastItemCount = latestBirdData.length-1
    let current_longitude = latestBirdData[lastItemCount].location_long
    let current_latitude = latestBirdData[lastItemCount].location_lat
    // console.log("last entry: " + lastItemCount + " timestamp: " + props.birdData[0].timestamp)
    // console.log("bird data: " + props.birdData[1].location_long)
    console.log("current location: " + current_latitude + ", " + current_longitude)
    const currentCoordinates = [];
    for(let i = 0; i < latestBirdData.length; i++){
    // for(let i = 0; i < 100; i++){
        var locationX = [
            latestBirdData[i].location_long,
            latestBirdData[i].location_lat
        ]
        currentCoordinates.push(locationX)
            // [
            //     [-77.044211, 38.852924],
            //     [-77.045659, 38.860158],
            //     [-77.044232, 38.862326],
            // ]
    }        
    const latestLocations = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'coordinates': currentCoordinates,
                    'type': 'LineString'
                }
            }
        ]
    };

    // YEAR LOCATIONS DATA
    // -----------------------------------------------------------------
    const lastItemInYearData = MovebankDataYear.individuals[0].locations.length;
    const yearData = MovebankDataYear.individuals[0].locations
    const yearCoordinates = [];
    for(let i = 0; i < lastItemInYearData; i++){
    // for(let i = 0; i < 50; i++){
        var yearLocationX = [
            yearData[i].location_long,
            yearData[i].location_lat
        ]
        yearCoordinates.push(yearLocationX)
    }        
    const yearLocations = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'coordinates': yearCoordinates,
                    'type': 'LineString'
                }
            }
        ]
    };
    
    // THE LAST LOCATION DATA
    // -----------------------------------------------------------------
    const lastLocation = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {
                    'description': '',
                    'location': String(current_latitude).slice(0,7) + ', ' + String(current_longitude).slice(0,7),
                    'date': day + "." + month + "." + year,
                    'route': '',
                    'icon': 'current-location',
                    // 'icon': 'icon-bird-location',
                    'icon-size': 0.25
                },
                'geometry': {
                    'type': 'Point',
                    // 'coordinates': [34.7342784, 31.3064776]
                    'coordinates': [current_longitude, current_latitude]
                }
            },
        ]
    }

    // WEATHER DATA
    // -----------------------------------------------------------------
    // const weatherInfo = {
    //     'type': 'FeatureCollection',
    //     'features': [
    //         {
    //             'type': 'Feature',
    //             'properties': {
    //                 'description': 'Temperature: ' + weatherData.temp + '°C',
    //                 // 'icon': 'theatre-15'
    //             },
    //             'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [current_longitude+0.005, current_latitude]
    //             }
    //         },
    //         {
    //             'type': 'Feature',
    //             'properties': {
    //                 'description': 'Humidity: ' + weatherData.humidity + ' g/m3',
    //                 // 'icon': 'theatre-15'
    //             },
    //             'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [current_longitude+0.005, current_latitude-0.004]
    //             }
    //         },
    //         {
    //             'type': 'Feature',
    //             'properties': {
    //                 'description': "Pressure: " + weatherData.pressure + " hPa",
    //                 // 'icon': 'theatre-15'
    //             },
    //             'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [current_longitude+0.005, current_latitude-0.008]
    //             }
    //         },
    //         // {
    //         //     'type': 'Feature',
    //         //     'properties': {
    //         //         'description': props.weatherData.pressure + "pressure",
    //         //         // 'icon': 'theatre-15'
    //         //     },
    //         //     'geometry': {
    //         //         'type': 'Point',
    //         //         'coordinates': [current_longitude+0.001, current_latitude-0.001]
    //         //     }
    //         // },
    //     ]
    // }

    // STORY LOCATIONS DATA
    // -----------------------------------------------------------------
    let landmarks = []
    for(let i = 0; i < landmarkSanity.length; i++){
        const landmark = {
            'type': 'Feature',
            'properties': {
                'description': landmarkSanity[i].locationType + ", " + landmarkSanity[i].locationName,
                'icon': 'current-location',
                'url': 'url', // add url link form sanity 
                'counter': i,
                // 'url': props.landmarkLinks[i].url, // WRONG needs fix
                // 'icon': 'icon-bird-location',
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [landmarkSanity[i].longitude, landmarkSanity[i].latitude]
            }
        }
        landmarks.push(landmark)
    }
    // console.log("array of landmarks: " + JSON.stringify(landmarks))
    const storyLocations = {
        'type': 'FeatureCollection',
        'features': landmarks
    }







    // load map and project data
    useEffect(() => {
        // map.current.on('zoom', () => {
        //     console.log('A zoom event occurred.');
        // });

        // if(props.zoomOut){
        //     console.log("zoomOut true")
        // }
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            projection: 'mercator',
            // projection: 'naturalEarth',
            name: 'Earth',
            // style: 'mapbox://styles/mapbox/light-v10',
            style: 'mapbox://styles/arminarndt/cl8vqgc4h002v14phy6bbsut8',
            // center: [lng, lat],
            center: [current_longitude, current_latitude],
            minZoom: 3,
            maxZoom: 17,
            // zoom: zoom
        });
        
        // disable map Toggle interactions
        map.current.dragRotate.disable();
        map.current.touchZoomRotate.disable();
        map.current.boxZoom.disable();


        map.current.on('load', () => {
            map.current.addSource('latest-locations', {
                type: 'geojson',
                lineMetrics: true,
                data: latestLocations
            });
            // the layer must be of type 'line'
            map.current.addLayer({
                type: 'line',
                source: 'latest-locations',
                id: 'latest-locations',
                paint: {
                    'line-color': 'red',
                    'line-width': 2,
                    // 'line-gradient' must be specified using an expression
                    // with the special 'line-progress' property
                    'line-gradient': [
                        'interpolate',
                        ['linear'],
                        ['line-progress'],
                        0, 'rgba(' + pathRGB + ',0.1)',
                        // 0.1, 'royalblue',
                        // 0.3, 'cyan',
                        // 0.5, 'lime',
                        0.7, 'rgba(' + pathRGB + ',0.3)',
                        1, 'rgba(' + pathRGB + ',1)'
                    ],
                    'line-opacity': [
                        'interpolate',
                        ['exponential', 0.5], // Set the exponential rate of change to 0.5
                        ['zoom'],
                        11, 0, // When zoom is 11 or less, set opacit to 1
                        12, 1 // When zoom is 12 or higher, set opacit to 0
                    ],
                },
                layout: {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                // minzoom: 10,
            });
            map.current.addLayer({
                type: 'circle',
                source: 'latest-locations',
                id: 'latest-locations-circles',
                paint: {
                    'circle-color': 'rgba(' + pathRGB + ',1)',
                    'circle-radius': 5,
                    'circle-opacity': [
                        'interpolate',
                        ['exponential', 0.5], // Set the exponential rate of change to 0.5
                        ['zoom'],
                        11, 0, // When zoom is 11 or less, set opacit to 1
                        12, 1 // When zoom is 12 or higher, set opacit to 0
                    ],
                },
            });



            // ADD YEAR LOACTIONS
            map.current.addSource('year-locations', {
                type: 'geojson',
                lineMetrics: true,
                data: yearLocations
            });
            map.current.addLayer({
                type: 'line',
                source: 'year-locations',
                id: 'year-locations',
                paint: {
                    'line-color': '#FF00FF',
                    'line-width': 2,
                    // "line-opacity": 0.5,
                    // "line-opacity-transition": {duration: 2000},
                    // 'visibility': [
                    //     'case',
                    //     props.zoomOut,
                    //     'visible',
                    //     'none'
                    // ]
                    'line-gradient': [
                        'interpolate',
                        ['linear'],
                        ['line-progress'],
                        0, 'rgba(0,0,0,0.1)',
                        0.9, 'rgba(0,0,0,0.3)',
                        0.91, 'rgba(0,0,0,0.9)',
                        1, 'rgba(0,0,0,1)',
                    ],
                    'line-opacity': [
                        'interpolate',
                        ['exponential', 0.5], // Set the exponential rate of change to 0.5
                        ['zoom'],
                        8, 1, // When zoom is 11 or less, set opacit to 1
                        12, 0 // When zoom is 12 or higher, set opacit to 0
                    ],
                },
                layout: {
                    'line-cap': 'round',
                    'line-join': 'round', 
                },
                // maxzoom: 10,
            });
            
            // ADD WEATHER DATA
            // map.current.addSource('weather-info', {
            //     type: 'geojson',
            //     lineMetrics: true,
            //     data: weatherInfo
            // });
            // map.current.addLayer({
            //     type: 'symbol',
            //     source: 'weather-info',
            //     id: 'weather-info',
            //     layout: {
            //         'text-field': ['get', 'description'],
            //         'text-variable-anchor': ['left'],
            //         'text-radial-offset': 0.5,
            //         'text-justify': 'center',
            //         'icon-image': ['get', 'icon'],
            //         'icon-size': 0.3,
            //     },
            //     paint: {
            //         "text-color": 'rgba(' + pathRGB + ',1)',
            //         "text-halo-color": "black",
            //         "text-halo-width": 1,
            //         'text-opacity': [
            //             'interpolate',
            //             ['exponential', 0.5], // Set the exponential rate of change to 0.5
            //             ['zoom'],
            //             11, 0, // When zoom is 11 or less, set opacit to 1
            //             12, 1 // When zoom is 12 or higher, set opacit to 0
            //         ],
            //     }
            // });

            // ADD STORY LOCATIONS
            map.current.addSource('landmarks-downloads', {
                type: 'geojson',
                lineMetrics: true,
                data: storyLocations,
                generateId: true // This ensures that all features have unique IDs
            });
            map.current.addSource('landmarks-uploads', {
                type: 'geojson',
                lineMetrics: true,
                data: storyLocations,
                generateId: true // This ensures that all features have unique IDs
            });
            const landmarkPaint = {
                    "text-color": 'black',
                    // 'text-color': [
                    //     'case',
                    //     ['boolean', ['feature-state', 'hover'], false],
                    //     'blue',
                    //     'black'
                    //   ],
            }
            const landmarkLayout = {
                // 'text-field': [
                //     'format',
                //     ['get', 'description'],
                //     {'font-scale': ["to-number", [
                //         'case',
                //         ['boolean', ['feature-state', 'hover'], false],
                //         1,
                //         0.5
                //     ]]},
                // ],
                'text-field': ['get', 'description'],
        
                // 'text-justify': [
                //         'case',
                //         ['boolean', ['feature-state', 'hover'], false],
                //         'left',
                //         'right'
                // ],
                // 'text-justify': 'left',

                // 'text-field': [
                //     'case',
                //     ['boolean', ['feature-state', 'hover'], false],
                //     'a',
                //     'fallback'
                //     // ['get', 'description'],
                //     // ['get', 'url']
                // ],



                // 'text-field': [
                //     'case',
                //     ['boolean', ['feature-state', 'hover'], false],
                //     [
                //         'format',
                //         ['get', 'description'],
                //         {'font-scale': 0.5}
                //     ],
                //     [
                //         'format',
                //         ['get', 'description'],
                //         {'font-scale': 1}
                //     ]
                // ],
                
                // 'text-field': [
                //     'format',
                //     ['get', 'description'],
                //     {
                //         'font-scale': 1,
                //         // 'font-scale': [
                //         //     'case',
                //         //     ['boolean', ['feature-state', 'hover'], false],
                //         //     0.5,
                //         //     1
                //         // ],
                //         // 'text-font' : 'Arial Unicode MS Regular',
                //         // 'text-font' : [
                //         //     'case',
                //         //     ['boolean', ['feature-state', 'hover'], false],
                //         //     'literal', ['FT88 Serif', 'Open Sans Regular'],
                //         //     'literal', ['Open Sans Regular', 'Open Sans Regular']
                //         // ]
                //     }
                // ],
                
                'text-variable-anchor': ['bottom-left', 'top-left'],
                // 'text-radial-offset': 0.5,
                // 'text-justify': 'left',
                'text-allow-overlap': true,
            }
            // map.current.addLayer({
            //     // type: 'circle',
            //     type: 'symbol',
            //     source: 'landmarks-downloads',
            //     id: 'load-memory-locations',
            //     layout: landmarkLayout,
            //     paint: landmarkPaint
            // });
            // map.current.addLayer({
            //     type: 'symbol',
            //     source: 'landmarks-uploads',
            //     id: 'upload-story-locations',
            //     layout: landmarkLayout,
            //     paint: landmarkPaint,
            // });
            map.current.addSource('landmarks-circles', {
                type: 'geojson',
                lineMetrics: true,
                data: storyLocations,
                generateId: true // This ensures that all features have unique IDs
            });
            // map.current.addLayer({
            //     type: 'circle',
            //     source: 'landmarks-circles',
            //     id: 'landmark-circle',
            //     layout: {},
            //     paint: {
            //         'circle-radius': 4,
            //         'circle-color': 'rgba(' + pathRGB + ',1)',
            //     }
            // });










            // ADD THE LAST LOCATION 
            map.current.addSource('last-location', {
                type: 'geojson',
                lineMetrics: true,
                data: lastLocation,
            });
            map.current.addLayer({
                // type: 'symbol',
                type: 'circle',
                source: 'last-location',
                id: 'last-location',
                layout: {
                    // 'text-field': ['get', 'description'],
                    // 'text-variable-anchor': ['left'],
                    // 'text-radial-offset': 0.5,
                //     // 'text-justify': 'center',
                //     // 'icon-image': ['get', 'icon'],
                //     // 'icon-size': 0.3,
                //     // 'icon-allow-overlap': true,
                //     // 'text-allow-overlap': true,
                },
                paint: {
                    'circle-radius': 10,
                    // 'circle-color': 'rgba(' + pathRGB + ',1)',
                    'circle-color': [
                        'interpolate',
                        ['exponential', 0.5], // Set the exponential rate of change to 0.5
                        ['zoom'],
                        11, 'rgba(' + pathRGB + ',1)', // When zoom is 12 or higher, set opacit to 0
                        12, 'rgb(249,254,30)', // When zoom is 11 or less, set opacit to 1
                    ],
                    // 'circle-color': 'rgba(0,204,255,1)',
                    // 'circle-color': '#00ccff',
                    // "text-color": 'rgba(' + pathRGB + ',1)',
                    // "text-halo-color": "black",
                    // "text-halo-width": 1,
                    // "circle-opacity": 1
                }
            });
            map.current.addLayer({
                type: 'symbol',
                source: 'last-location',
                id: 'last-location-text',
                layout: {
                    'text-field': [
                        'format', 
                        ['get', 'date'],
                        // { 'font-scale': 1.2 },
                        '\n',
                        ['get', 'location'],
                        // {
                        //     'font-scale': 0.8,
                        //     'text-font': 'Apoc Revelations'
                        //     }
                    ],
                    'text-variable-anchor': ['left'],
                    'text-radial-offset': 0.5,
                    'text-justify': 'left',
                },
            });

            // MAP INTERACTIONS
            // current location of bird
            map.current.on("mouseenter", 'last-location', () => {
                map.current.getCanvas().style.cursor = "pointer";
            });
            map.current.on("mouseleave", 'last-location', () => {
                map.current.getCanvas().style.cursor = "default";
            });
            map.current.on('click', 'last-location', (e) => {
                // navigate('/'+e.features[0].properties.url)
                navigate('/')

                map.current.flyTo({
                    center: e.features[0].geometry.coordinates,
                    zoom: 12,
                    // bearing: 130,
                    // pitch: 75,
                    duration: 1000, // Animate over 1 seconds
                    essential: true // This animation is considered essential with
                    //respect to prefers-reduced-motion
                });
                // setCurrentRoute(e.features[0].properties.description)
                return 
            });




            // let hoverID = null;
            // function HoverLandmarks(event, sourceName){
            //     map.current.getCanvas().style.cursor = "pointer";
            //     // Check whether features exist
            //     if (event.features.length === 0) return;
            //     // If hoverID for the hovered feature is not null,
            //     // use removeFeatureState to reset to the default behavior
            //     if (hoverID) {
            //         map.current.removeFeatureState({
            //             source: sourceName,
            //             id: hoverID
            //         });
            //     }
                
            //     hoverID = event.features[0].id;

            //     // When the mouse moves over the earthquakes-viz layer, update the
            //     // feature state for the feature under the mouse
            //     map.current.setFeatureState(
            //         {
            //             source: sourceName,
            //             id: hoverID
            //         },
            //         {
            //             hover: true
            //         }
            //     );
            // }
            // function LeaveHoverLandmarks(sourceName){
            //     // if (hoverID) {
            //         map.current.setFeatureState(
            //             {
            //                 source: sourceName,
            //                 id: hoverID
            //             },
            //             {
            //                 hover: false
            //             }
            //     );
            //     // }
            //     map.current.getCanvas().style.cursor = 'default';
            // }
            // // landmarks load memory
            // map.current.on('mouseenter', 'load-memory-locations', (event) => {
            //     const sourceName = "landmarks-downloads"
            //     HoverLandmarks(event, sourceName)
            // })
            // map.current.on('mouseleave', 'load-memory-locations', () => {
            //     const sourceName = "landmarks-downloads"
            //     LeaveHoverLandmarks(sourceName)
            // });
            // map.current.on('click', 'load-memory-locations', (e) => {
            //     console.log("load-memory-link")
            //     navigate('/loadmemory/' + e.features[0].properties.url)
            // })
            // // landmarks upload story
            // map.current.on('mouseenter', 'upload-story-locations', (event) => {
            //     const sourceName = "landmarks-uploads"
            //     HoverLandmarks(event, sourceName)
            // })
            // map.current.on('mouseleave', 'upload-story-locations', () => {
            //     const sourceName = "landmarks-uploads"
            //     LeaveHoverLandmarks(sourceName)
            // });
            // map.current.on('click', 'upload-story-locations', (e) => {
            //     console.log("upload-story-link")
            //     navigate('/uploadstory/' + e.features[0].properties.url)
            // })

            // if(location.pathname.split('/')[1] === "uploadstory"){
            //     map.current.setLayoutProperty('load-memory-locations', 'visibility', 'none');
            //     map.current.setLayoutProperty('upload-story-locations', 'visibility', 'visible');
            // }
            // if(location.pathname.split('/')[1] === "loadmemory"){
            //     map.current.setLayoutProperty('load-memory-locations', 'visibility', 'visible');
            //     map.current.setLayoutProperty('upload-story-locations', 'visibility', 'none');
            // }
            // if(location.pathname.split('/')[1] === ""){
            //     map.current.setLayoutProperty('load-memory-locations', 'visibility', 'visible');
            //     map.current.setLayoutProperty('upload-story-locations', 'visibility', 'none');
            // }





            function LandmarkHTML(landmarkForHtml, markerClassName, hideClassOnLoad, i, color){
                console.log("landmarks properties: " + i)
                let html = `<div tabindex="${i}" class="landmarkMarker ${markerClassName} ${hideClassOnLoad} ">
                                    <div style="background-color: ${color}; "class="landmarkCircle"></div>
                                    <div class="landmarkText">${landmarkForHtml.properties.description}</div>
                     
                            </div>`
                const el = document.createElement('div');
                el.innerHTML = html;
                return el.firstChild;
            }

            function updateLandmarks(){
                if(!firstLoad.current) return
                firstLoad.current = false
                // for (let i = 0; i < landmarks.length; i++){
                    // const landmark = landmarks
                let i = 0
                for (const landmark of landmarks) {
                    i = i + 1
                    const hideClassOnLoad = urlPrefix === "uploadstory" ? "hideElement" : ""
                    // console.log("updateLandmarks: " + feature.geometry.coordinates)
                    const markerClassName = "load-memories"
                    const coords = landmark.geometry.coordinates
                    const urlEndpoint = landmark.properties.url
                    const landmarkForHtml = landmark
                    const color = "rgb(163, 220, 245)"
                    const divMarker = LandmarkHTML(landmarkForHtml, markerClassName, hideClassOnLoad, i, color)
                    const offset = landmark.properties.counter === 1 ? [-10, 20] : [-10,0]
                    const marker = new mapboxgl.Marker({
                        // offset: 100,
                        anchor: 'left',
                        offset: offset,
                        element: divMarker
                    }).setLngLat(coords)
                    marker.addTo(map.current);;
                    marker.getElement().addEventListener('click', () => {
                        navigate("/loadmemory/" + urlEndpoint)
                    });
                }
                for (const landmark of landmarks) {
                    i = i + 1
                    const hideClassOnLoad = urlPrefix === "loadmemory" ? "hideElement" : urlPrefix === "" ? "hideElement" : ""
                    // console.log("updateLandmarks: " + feature.geometry.coordinates)
                    const markerClassName = "upload-stories"
                    const coords = landmark.geometry.coordinates
                    const urlEndpoint = landmark.properties.url
                    const landmarkForHtml = landmark
                    const color = "rgb(240, 180, 252)"
                    const divMarker = LandmarkHTML(landmarkForHtml, markerClassName, hideClassOnLoad, i, color)
                    const offset = landmark.properties.counter === 1 ? [-10, 20] : [-10,0]
                    const marker = new mapboxgl.Marker({
                        // offset: 100,
                        anchor: 'left',
                        offset: offset,
                        element: divMarker
                    }).setLngLat(coords)
                    marker.addTo(map.current);;
                    marker.getElement().addEventListener('click', () => {
                        navigate("/uploadstory/" + urlEndpoint)
                    });
                }
            }


            map.current.on('render', () => {
                if (!map.current.isSourceLoaded('landmarks-circles')) return;
                console.log("updateLandmarks - render")
                updateLandmarks();
            });


        });

        

    });


    // define URL link behavior 
    // -----------------------------------------------------------------
    const urlPrefix = useMemo(() => {
        const currentPath = location.pathname
        const prefix = currentPath.split('/')[1]
        console.log("url prefix: " + prefix)
        return prefix
    }, [location.pathname])
    useEffect(() => {
        
        if(urlPrefix === "uploadstory"){
            // if(document.getElementsByClassName("load-memories hideElement")) return
            for(let i = 0; i < document.getElementsByClassName("load-memories").length; i++){
                document.getElementsByClassName("load-memories")[i].className += " hideElement "
                document.getElementsByClassName("upload-stories")[i].classList.remove("hideElement")
            }
        }
        if(urlPrefix === "loadmemory"){
            // if(document.getElementsByClassName("upload-stories hideElement")) return
            for(let i = 0; i < document.getElementsByClassName("upload-stories").length; i++){
                document.getElementsByClassName("upload-stories")[i].className += " hideElement "
                document.getElementsByClassName("load-memories")[i].classList.remove("hideElement")
            }
        }
        if(urlPrefix === ""){
            // if(document.getElementsByClassName("upload-stories hideElement")) return
            for(let i = 0; i < document.getElementsByClassName("upload-stories").length; i++){
                document.getElementsByClassName("upload-stories")[i].className += " hideElement "
                document.getElementsByClassName("load-memories")[i].classList.remove("hideElement")
            }
        }


        // var mapLayer = map.current.getLayer('load-memory-locations');
        // if(typeof mapLayer !== 'undefined') {
        //     if(urlPrefix === "uploadstory"){
        //         map.current.setLayoutProperty('load-memory-locations', 'visibility', 'none');
        //         map.current.setLayoutProperty('upload-story-locations', 'visibility', 'visible');
        //     }
        //     if(urlPrefix === "loadmemory"){
        //         map.current.setLayoutProperty('load-memory-locations', 'visibility', 'visible');
        //         map.current.setLayoutProperty('upload-story-locations', 'visibility', 'none');
        //     }
        //     if(urlPrefix === ""){
        //         map.current.setLayoutProperty('load-memory-locations', 'visibility', 'visible');
        //         map.current.setLayoutProperty('upload-story-locations', 'visibility', 'none');
        //     }
        // }

    }, [navigate, urlPrefix])

    // function ClickLandmark(urlEndpoint){
    //     console.log("www urlEndpoint: ", urlEndpoint)
    //     const currentPath = location.pathname


    //     console.log("www urlPrefix: ", currentPath)
    //     // map.current.on('click', 'story-locations', (e) => {
    //     //     console.log("url: " + urlPrefix)
    //     //     navigate( urlPrefix + '/' + e.features[0].properties.url);
    //     // });
    // }




    // define zoom behavior
    // -----------------------------------------------------------------
    const zoom = useMemo(() => {
        return location.pathname === "/" ? false : true
    }, [location.pathname])
    useEffect(() => {
        if (!map.current) return; 
        console.log("perform zoom")
        if (!zoom){ 
            // if(dataReady){
                map.current.flyTo({center: [current_longitude, current_latitude], zoom:12});
            // } else {
            //     map.current.flyTo({center: [10, 50], zoom:3});
            // }
            map.current.scrollZoom.enable();
            map.current.doubleClickZoom.enable();
            map.current.keyboard.enable();
            map.current.dragPan.enable();
        } else {
            // map.current.flyTo({ zoom:3});
            map.current.fitBounds([
                [-20, 5], // southwestern corner of the bounds
                [20, 60], // northeastern corner of the bounds
            ]);

            map.current.scrollZoom.disable();
            map.current.doubleClickZoom.disable();
            map.current.dragRotate.disable();
            map.current.keyboard.disable();
            map.current.dragPan.disable();
        }
    }, [current_latitude, current_longitude, zoom])






    const weaterContainerStyle= {
        position: 'fixed',
        zIndex: 3,
        bottom: '40px',
        marginLeft: '60px',
        marginRight: '60px',
        // backgroundColor: '#fff',
    }
    const mapContainerStyle ={
        height: '100vh',
        // width: '100px',
        // zIndex: -1
    }
    const mapStyle = "top-0 right-0 w-100 h-200 map-container"
    
    // temp, pressure, humidity, wind_speed, wind_deg, sunrise, sunset


    const weatherObject = "mr-10 font-mono  text-sm "

    
    function timestamp2Time(timestamp){
        const birdTime = timestamp + weatherData.timezone - 3600
        // console.log("timezone: ", timeZone, " ", weatherData.country, " ", timestamp)

        console.log("timestamp: ", new Date(birdTime * 1000 ).toLocaleTimeString("de-DE"))
        // console.log("timestamp: ", birdTime, " birdTime: ", birdTime.getHours(birdTime), ":", birdTime.getMinutes(birdTime), ":", birdTime.getSeconds(birdTime))
        // console.log("sun set: ", new Date(new Date(weatherData.sunset).toLocaleString("en-US", weaterContainer.country) ), " sun rise: ", new Date(weatherData.sunrise).toLocaleString(timeZone) )
        // console.log("sun ", new Date(timestamp).toLocaleString({timeZone}))
        // console.log("weather array: " + JSON.stringify(weatherData))
        // adjust timezone
        // read location of Jonas and define Ländercode
        // return new Date(timestamp).toLocaleTimeString("it-IT")
        return new Date(birdTime * 1000 ).toLocaleTimeString("de-DE")
    }
    // temp, pressure, humidity, wind_speed, wind_deg, sunrise, sunset, city_name, timezone, country, weather_description

    return (
        <div>
            <div ref={weaterContainer} style={weaterContainerStyle}>
                <span className={weatherObject}>Jonas Location: {weatherData.city_name}, {weatherData.country}</span>
                <span className={weatherObject}>Sunrise {timestamp2Time(weatherData.sunrise)}</span>
                <span className={weatherObject}>Sunset {timestamp2Time(weatherData.sunset)}</span>
                <span className={weatherObject}>Weather condition: {weatherData.weather_description}</span>
                <span className={weatherObject}>{weatherData.temp} °C</span>
                <span className={weatherObject}>Air humidity: {weatherData.humidity} g/m3</span>
            </div>
            <div ref={mapContainer} className={mapStyle} style={mapContainerStyle} />
        </div>
    );
}