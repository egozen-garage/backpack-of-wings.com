import React, { useRef, useEffect, useState, useMemo, useCallback} from 'react';
// import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import MovebankDataYear from '../../json/MovebankDataYear.json';
import sanityClient from "../../client";
// import iconCurrentLocation from "../img/current-location.svg"
import { useLocation } from 'react-router-dom'
import FetchMapData from './service/FetchMapData';
 
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
    const map = useRef(null);
    const location = useLocation()
    let navigate  = useNavigate();


    // console.log("mapData: " + JSON.stringify(props.mapData[0]))
    // console.log("mapData: " + JSON.stringify(props.weatherData))

    const latestBirdData = props.mapData[0].individuals[0].locations // FetchMapData() --> [0] movebankData latest locations
    const weatherData    = props.mapData[1] // FetchMapData() --> [1] weatherData
    const landmarkSanity = props.mapData[2] // FetchMapData() --> [2] landmark
    // const dataReady      = props.mapData[3] // FetchMapData() --> [3] dataReady

    const pathRGB = '255,0,255';

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
    const weatherInfo = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {
                    'description': 'Temperature: ' + weatherData.temp + '°C',
                    // 'icon': 'theatre-15'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [current_longitude+0.005, current_latitude]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'description': 'Humidity: ' + weatherData.humidity + ' g/m3',
                    // 'icon': 'theatre-15'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [current_longitude+0.005, current_latitude-0.004]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'description': "Pressure: " + weatherData.pressure + " hPa",
                    // 'icon': 'theatre-15'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [current_longitude+0.005, current_latitude-0.008]
                }
            },
            // {
            //     'type': 'Feature',
            //     'properties': {
            //         'description': props.weatherData.pressure + "pressure",
            //         // 'icon': 'theatre-15'
            //     },
            //     'geometry': {
            //         'type': 'Point',
            //         'coordinates': [current_longitude+0.001, current_latitude-0.001]
            //     }
            // },
        ]
    }

    // STORY LOCATIONS DATA
    // -----------------------------------------------------------------
    let landmarks = []
    for(let i = 0; i < landmarkSanity.length; i++){
        const landmark = {
            'type': 'Feature',
            'properties': {
                'description': landmarkSanity[i].locationName + ", " + landmarkSanity[i].locationType,
                'icon': 'current-location',
                'url': 'url', // add url link form sanity 
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
                        0, 'rgba(' + pathRGB + ',0)',
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
                        0, 'rgba(' + pathRGB + ',0)',
                        0.2, 'rgba(' + pathRGB + ',0.5)',
                        1, 'rgba(' + pathRGB + ',1)'
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
            map.current.addSource('weather-info', {
                type: 'geojson',
                lineMetrics: true,
                data: weatherInfo
            });
            map.current.addLayer({
                type: 'symbol',
                source: 'weather-info',
                id: 'weather-info',
                layout: {
                    'text-field': ['get', 'description'],
                    'text-variable-anchor': ['left'],
                    'text-radial-offset': 0.5,
                    'text-justify': 'center',
                    'icon-image': ['get', 'icon'],
                    'icon-size': 0.3,
                },
                paint: {
                    "text-color": 'rgba(' + pathRGB + ',1)',
                    "text-halo-color": "black",
                    "text-halo-width": 1,
                    'text-opacity': [
                        'interpolate',
                        ['exponential', 0.5], // Set the exponential rate of change to 0.5
                        ['zoom'],
                        11, 0, // When zoom is 11 or less, set opacit to 1
                        12, 1 // When zoom is 12 or higher, set opacit to 0
                    ],
                }
            });

            // ADD STORY LOCATIONS
            map.current.addSource('story-locations', {
                type: 'geojson',
                lineMetrics: true,
                data: storyLocations,
                generateId: true // This ensures that all features have unique IDs
            });
            map.current.addLayer({
                type: 'symbol',
                source: 'story-locations',
                id: 'story-locations',
                layout: {
                    'text-field': ['get', 'description'],
                    'text-variable-anchor': ['bottom-left', 'top-left'],
                    // 'text-variable-anchor': ['left', 'right'],
                    'text-radial-offset': 0.5,
                    'text-justify': 'left',
                    // 'icon-image': ['get', 'icon'],
                    'icon-image': 'story-location',
                    'icon-size': 0.25,
                    'icon-allow-overlap': true,
                    'text-allow-overlap': true,
                },
                paint: {
                    "text-color": 'rgba(' + pathRGB + ',1)',
                    "text-halo-color": "black",
                    "text-halo-width": 2,
                    // "cursor": "pointer",
                    // "text-halo-blur": 1,
                }
            });

            // ADD THE LAST LOCATION 
            map.current.addSource('last-location', {
                type: 'geojson',
                lineMetrics: true,
                data: lastLocation
            });
            map.current.addLayer({
                type: 'symbol',
                source: 'last-location',
                id: 'last-location',
                layout: {
                    'text-field': ['get', 'description'],
                    'text-variable-anchor': ['left'],
                    // 'text-radial-offset': 0.5,
                    // 'text-justify': 'center',
                    'icon-image': ['get', 'icon'],
                    'icon-size': 0.3,
                    'icon-allow-overlap': true,
                    'text-allow-overlap': true,
                },
                paint: {
                    "text-color": 'rgba(' + pathRGB + ',1)',
                    "text-halo-color": "black",
                    "text-halo-width": 1,
                }
            });

            // MAP INTERACTIONS
            map.current.on("mouseenter", 'story-locations', () => {
                map.current.getCanvas().style.cursor = "pointer";
            });
            map.current.on("mouseleave", 'story-locations', () => {
                map.current.getCanvas().style.cursor = "default";
            });


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
        map.current.on('click', 'story-locations', (e) => {
            navigate( urlPrefix + '/' + e.features[0].properties.url);
        });
    }, [navigate, urlPrefix])


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







    const mapContainerStyle ={
        height: '100vh',
        // width: '100px',
        // zIndex: -1
    }
    const mapStyle = "top-0 right-0 w-100 h-200 map-container"
    
    return (
        <div>
            <div ref={mapContainer} className={mapStyle} style={mapContainerStyle} />
        </div>
    );
}