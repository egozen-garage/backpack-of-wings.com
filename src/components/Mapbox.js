import React, { useRef, useEffect, useState } from 'react';
// import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import MovebankDataYear from '../json/MovebankDataYear.json';
import sanityClient from "../client";
// import iconCurrentLocation from "../img/current-location.svg"
 
import { useNavigate } from "react-router-dom";

// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJtaW5hcm5kdCIsImEiOiJjbDh2b2lhM2owZzE2M3dxdjhzbm96bGo3In0.MCm-qbborgyvRnQ7JA--5w';
// first entry on timestamp Tue Jul 16 2013 16:30:23 GMT+0000 --> 1373992223000 location_long: 11.2354003 location_lat: 52.4865283

// Call Movebank API and provide array
export default function Mapbox(props) {  
    let dataReceived = false;
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
    useEffect(() => {
        Promise.all([
                fetch(apiUrl).then((response) => response.json()),
                sanityClient.fetch(
                    `*[_type == "weatherData"]{
                        temp, pressure, humidity, wind_speed, wind_deg, sunrise, sunset
                    }[0]`
                ),
            ])
            .then(([movebankData, weatherData]) => {
                setMovebankData(movebankData?.individuals[0]?.locations);
                setWeatherData(weatherData);
            })
            .catch((err) => {
                console.log(err);
            });
    },[])

    if(!movebankData){
        return ( <pre>data loading...</pre>)
    }
    if(movebankData && !dataReceived){
        dataReceived = true;
        // console.log("bird data 30 days: " + movebankData[1].location_long)
        return <DrawMapbox birdData={movebankData} weatherData={weatherData} zoomOut={props.zoomOut}/>
    }
}



function DrawMapbox(props){

    // console.log("weather data: " + JSON.stringify(props.weatherData))
    const mapContainer = useRef(null);
    const map = useRef(null);
    // const [lng, setLng] = useState(-77.035);
    // const [lat, setLat] = useState(38.875);
    const [zoom, setZoom] = useState(12);
    
    // for later: if click menu then zoom out
    if(12===3){ setZoom(8) }

    // LATEST LOCATIONS DATA
    // -----------------------------------------------------------------
    let lastItemCount = props.birdData.length-1
    let current_longitude = props.birdData[lastItemCount].location_long
    let current_latitude = props.birdData[lastItemCount].location_lat
    // console.log("last entry: " + lastItemCount + " timestamp: " + props.birdData[0].timestamp)
    // console.log("bird data: " + props.birdData[1].location_long)
    console.log("current location: " + current_latitude + ", " + current_longitude)
    const currentCoordinates = [];
    for(let i = 0; i < props.birdData.length; i++){
    // for(let i = 0; i < 100; i++){
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
                    'description': 'Temperature: ' + props.weatherData.temp + '°C',
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
                    'description': 'Humidity: ' + props.weatherData.humidity + ' g/m3',
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
                    'description': "Pressure: " + props.weatherData.pressure + " hPa",
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
    const storyLocations = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {
                    'description': 'Istanbul, Turkey',
                    'icon': 'current-location',
                    'route': 'istanbul',
                    // 'icon': 'icon-bird-location',
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [29.087114420286106, 41.062342115603734]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'description': 'Drömling, Germany',
                    'route': 'droemling',
                    // 'icon': 'theatre-15'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [11.027669114580046, 52.49456226795604]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'description': 'Lacková, Slovakia',
                    'route': 'lackova',
                    // 'icon': 'theatre-15'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [20.590533054164478, 49.31698642610774]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'description': 'Hama, Syria',
                    'route': 'hama',
                    // 'icon': 'theatre-15'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [36.755196474432246, 35.13211177222622]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'description': 'Neve Eitan, Israel',
                    'route': 'neve-eitan',
                    // 'icon': 'theatre-15'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [35.5320056758374, 32.491984286564104]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'description': 'Dudaim site, Israel',
                    'route': 'dudaim-site',
                    // 'icon': 'theatre-15'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [34.90823611685902, 32.147553437885264]
                }
            },
        ]
    }

    

    // interactive map elements
    useEffect(() => {
        if(props.zoomOut){
            if (!map.current){ 
                setZoom(12)
            } else {
                map.current.fitBounds([
                    [-20, 5], // southwestern corner of the bounds
                    [20, 60], // northeastern corner of the bounds
                ]);
                // map.current.
                // map.current.setLayoutProperty('story-locations', 'symbol-sort-key', '1');
                // map.current.getCanvas().style.cursor = "default";

                map.current.scrollZoom.disable();
                map.current.doubleClickZoom.disable();
                map.current.dragRotate.disable();
                map.current.keyboard.disable();
                map.current.dragPan.disable();
                // map.current.on('zoomstart', () => {
                    // map.current.setLayoutProperty("settlement-major-label", 'visibility', 'none');
                    // map.current.setLayoutProperty("settlement-minor-label", 'visibility', 'none');
                    // map.current.setLayoutProperty("latest-locations", 'visibility', 'none');
                    // map.current.setLayoutProperty("year-locations", 'visibility', 'visible');
                // });
                // console.log("zoom out: " + props.zoomOut)
            }
        } else {
            if (!map.current){  
            } else {
                map.current.flyTo({center: [current_longitude, current_latitude], zoom:12});
                map.current.scrollZoom.enable();
                map.current.doubleClickZoom.enable();
                map.current.keyboard.enable();
                map.current.dragPan.enable();

                // map.current.setLayoutProperty("settlement-major-label", 'visibility', 'visible');
                // map.current.setLayoutProperty("settlement-minor-label", 'visibility', 'visible');
                // map.current.setLayoutProperty("latest-locations", 'visibility', 'visible');
                // map.current.setLayoutProperty("year-locations", 'visibility', 'none');
                
                // console.log("zoom in (normal): " + props.zoomOut)
            }
        }
        
    }, [props.zoomOut, current_longitude, current_latitude]);
    

    const pathRGB = '255,0,255';

    // load map and project data
    useEffect(() => {

        // map.current.on('zoom', () => {
        //     console.log('A zoom event occurred.');
        // });

        if(props.zoomOut){
            console.log("hello world")
        }
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
            zoom: zoom
        });
        
        // disable map Toggle interactions
        map.current.dragRotate.disable();
        map.current.touchZoomRotate.disable();
        map.current.boxZoom.disable();


        map.current.on('load', () => {
            // Turn layers off
            // map.current.setLayoutProperty("settlement-major-label", 'visibility', 'none');
            // map.current.setLayoutProperty("settlement-minor-label", 'visibility', 'none');
            // map.current.setLayoutProperty("admin-0-boundary", 'visibility', 'none');
            // map.current.setLayoutProperty("admin-0-boundary-bg", 'visibility', 'none');
            // map.current.setPaintProperty('settlement-major-label"', 'opacity', [
            //     'interpolate',
            //     ['exponential', 0.5], // Set the exponential rate of change to 0.5
            //     ['zoom'],
            //     11, 0, // When zoom is 11 or less, set opacit to 1
            //     12, 1 // When zoom is 12 or higher, set opacit to 0
            // ]);
            


            
            // ADD LATEST LOCATIONS
            // 'line-gradient' can only be used with GeoJSON sources
            // and the source must have the 'lineMetrics' option set to true
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



            // map.current.loadImage(
            //     iconCurrentLocation,
            //     (error, image) => {
            //         if (error) throw error;
            //         // Add the image to the map style.
            //         map.current.addImage('current-location', image, { "sdf": "true" } );
            // });
            
            
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
            map.current.on('click', 'story-locations', (e) => {
                changeRoute(e.features[0].properties.route);
                // setCurrentRoute(e.features[0].properties.description)
                return 
            });

            map.current.on("mouseenter", 'last-location', () => {
                map.current.getCanvas().style.cursor = "pointer";
            });
            map.current.on("mouseleave", 'last-location', () => {
                map.current.getCanvas().style.cursor = "default";
            });
            map.current.on('click', 'last-location', (e) => {
                changeRoute(e.features[0].properties.route);
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

    let navigate  = useNavigate();
    function changeRoute(newRoute) {
      // change route
      navigate('/'+newRoute)
    }

    const mapContainerStyle ={
        height: '100vh',
        // width: '100px',
        // zIndex: -1
    }
    const mapStyle = "top-0 right-0 w-100 h-200"
    
    return (
        <div>
            <div ref={mapContainer} class={mapStyle} className="map-container" style={mapContainerStyle} />
            {/* <div ref={mapContainer} class={mapStyle} className="map-container" style={mapContainerStyle} /> */}
        </div>
    );
}