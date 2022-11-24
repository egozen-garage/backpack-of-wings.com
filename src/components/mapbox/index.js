import React, { useRef, useEffect, useState, useMemo } from 'react';
// import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import MovebankDataYear from '../../json/MovebankDataYear.json';
import sanityClient from "../../client";
// import iconCurrentLocation from "../img/current-location.svg"
import { useLocation } from 'react-router-dom'
// import FetchMapData from './service/FetchMapData';
import './mapboxStyle.css';
import birdIconFile from '../../img/jonas-small.png'
 
import { useNavigate } from "react-router-dom";

// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJtaW5hcm5kdCIsImEiOiJjbDh2b2lhM2owZzE2M3dxdjhzbm96bGo3In0.MCm-qbborgyvRnQ7JA--5w';


// const mapData = FetchMapData() // fetch relevant data for map

export default function Mapbox(props) { 
    console.log("CALL Mapbox")
    let dataReceived = false;

    const apiUrl = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&event_reduction_profile=EURING_03';
    
    let [movebankData, setMovebankData] = useState(null)
    // let [weatherData, setWeatherData] = useState(null);
    // let [landmark, setLandmark] = useState(null);
    // let [dataReady, setDataReady] = useState(false);
    let [mapData, setMapData] = useState([])

    useEffect(() => {
        // if(dataReady) return
        // if(!dataReady){
            Promise.all([
                    fetch(apiUrl).then((response) => response.json()),
                    // sanityClient.fetch(
                    //     `*[_type == "movebank"]{location[0...250]{latitude, longitude, timestamp}}`
                    // ),
                    sanityClient.fetch(
                        `*[_type == "weatherData" && dateTime(_updatedAt) > dateTime(now()) - 60*60*2]{
                            temp, pressure, humidity, wind_speed, wind_deg, sunrise, sunset, city_name, timezone, country, weather_description, timestamp
                        }[0]`
                    ),
                    sanityClient.fetch(
                        `*[_type == "landmark" ]{"url":url.current, "country":country, "locationType": locationType, "locationName": locationName, "latitude":latitude, "longitude":longitude}`
                    ),
                ])
                .then(([movebankData, weatherData, landmark]) => {
                    setMovebankData(movebankData.individuals[0].locations);
                    // setMovebankData(movebankData[0].location);
                    // console.log("new movebankdata: " + JSON.stringify(movebankData[0].location))
                    // console.log("old movebankdata: " + JSON.stringify(movebankData.individuals[0].locations))
                    // setWeatherData(weatherData);
                    // setLandmark(landmark);
                    // setDataReady(true);
                    // const movebank = movebankData[0].location
                    setMapData([movebankData, weatherData, landmark])
                    console.log("FetchMapData: Api Data has been called" + JSON.stringify(weatherData))
                    console.log("FetchMapData: Api Data has been called")
                })
                .catch((err) => {
                    console.log(err);
                });
        // } else {
        //     return
        // }
    }, [])    
    console.log("mapbox data fetched")

    // console.log("mapData: " + JSON.stringify(mapData))
    // console.log("mapData: " + JSON.stringify(movebankData))


    if(!movebankData){
        console.log("data coming")
        return ( <pre>data loading...</pre>)
    }
    if(movebankData && !dataReceived){
        console.log("data arrived")
        // console.log("data arrived " + JSON.stringify(mapData[2]))
        dataReceived = true;
        // console.log("bird data 30 days: " + movebankData[1].location_long)
        return <DrawMapbox mapData={mapData} storyIds={props.storyIds}/>
    }
}



function DrawMapbox(props){
    console.log("mapbox loaded")
    // const { landmark } = useParams()

    const mapContainer = useRef(null);
    const weaterContainer = useRef(null);
    const map = useRef(null);
    const location = useLocation()
    let navigate  = useNavigate();
    const firstLoad = useRef(true);

    // const mapBounds = [
    //     [-140, -50], // Southwest coordinates
    //     [140, 50] // Northeast coordinates
    // ];

    // console.log("mapData: " + JSON.stringify(props.mapData[0]))
    // console.log("mapData: " + JSON.stringify(props.weatherData))

    // const latestBirdData = props.mapData[0] // FetchMapData() --> [0] movebankData latest locations
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
    // let current_longitude = latestBirdData[lastItemCount].longitude
    // let current_latitude = latestBirdData[lastItemCount].latitude
    // console.log("bird data: " + props.birdData[1].longitude)
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
    console.log("year data length: " + yearData.length)
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

    // STORY LOCATIONS DATA
    // -----------------------------------------------------------------
    let landmarks = []
    for(let i = 0; i < landmarkSanity.length; i++){
        const landmark = {
            'type': 'Feature',
            'properties': {
                'description': landmarkSanity[i].locationType + ", " + landmarkSanity[i].locationName,
                'icon': 'current-location',
                'url': landmarkSanity[i].url, // add url link form sanity 
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





    function RandomUrlEndpoint(MarkerLandmark){
        const landmarkNumber =    MarkerLandmark === "droemling" ? 0 : 
                            MarkerLandmark === "lackova" ? 1 :
                            MarkerLandmark === "istanbul" ? 2 :
                            MarkerLandmark === "hama" ? 3 :
                            MarkerLandmark === "neveeitan" ? 4 :
                            MarkerLandmark === "dudaimsite" ? 5 : 0
        // const randomNumber = Math.floor(Math.random() * 5)
        // const urlLandmark = props.storyIds[randomNumber].ids[0].landmark
        const amountOfIds = props.storyIds[landmarkNumber].ids.length
        const storyId = props.storyIds[landmarkNumber].ids[Math.floor(Math.random() * amountOfIds)]._id
        const urlEndpoint = "/loadmemory/" + MarkerLandmark + "/" + storyId
        console.log("mapbox marker url: " + urlEndpoint)
        navigate(urlEndpoint)
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
            // projection: 'equirectangular',
            name: 'Earth',
            // style: 'mapbox://styles/mapbox/light-v10',
            style: 'mapbox://styles/arminarndt/cl8vqgc4h002v14phy6bbsut8',
            // center: [lng, lat],
            center: [current_longitude, current_latitude],
            minZoom: 3,
            maxZoom: 17,
            // maxBounds: mapBounds,
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
            // const landmarkPaint = {
            //         "text-color": 'black',
            //         // 'text-color': [
            //         //     'case',
            //         //     ['boolean', ['feature-state', 'hover'], false],
            //         //     'blue',
            //         //     'black'
            //         //   ],
            // }
            // const landmarkLayout = {
            //     // 'text-field': [
            //     //     'format',
            //     //     ['get', 'description'],
            //     //     {'font-scale': ["to-number", [
            //     //         'case',
            //     //         ['boolean', ['feature-state', 'hover'], false],
            //     //         1,
            //     //         0.5
            //     //     ]]},
            //     // ],
            //     'text-field': ['get', 'description'],
        
            //     // 'text-justify': [
            //     //         'case',
            //     //         ['boolean', ['feature-state', 'hover'], false],
            //     //         'left',
            //     //         'right'
            //     // ],
            //     // 'text-justify': 'left',

            //     // 'text-field': [
            //     //     'case',
            //     //     ['boolean', ['feature-state', 'hover'], false],
            //     //     'a',
            //     //     'fallback'
            //     //     // ['get', 'description'],
            //     //     // ['get', 'url']
            //     // ],



            //     // 'text-field': [
            //     //     'case',
            //     //     ['boolean', ['feature-state', 'hover'], false],
            //     //     [
            //     //         'format',
            //     //         ['get', 'description'],
            //     //         {'font-scale': 0.5}
            //     //     ],
            //     //     [
            //     //         'format',
            //     //         ['get', 'description'],
            //     //         {'font-scale': 1}
            //     //     ]
            //     // ],
                
            //     // 'text-field': [
            //     //     'format',
            //     //     ['get', 'description'],
            //     //     {
            //     //         'font-scale': 1,
            //     //         // 'font-scale': [
            //     //         //     'case',
            //     //         //     ['boolean', ['feature-state', 'hover'], false],
            //     //         //     0.5,
            //     //         //     1
            //     //         // ],
            //     //         // 'text-font' : 'Arial Unicode MS Regular',
            //     //         // 'text-font' : [
            //     //         //     'case',
            //     //         //     ['boolean', ['feature-state', 'hover'], false],
            //     //         //     'literal', ['FT88 Serif', 'Open Sans Regular'],
            //     //         //     'literal', ['Open Sans Regular', 'Open Sans Regular']
            //     //         // ]
            //     //     }
            //     // ],
                
            //     'text-variable-anchor': ['bottom-left', 'top-left'],
            //     // 'text-radial-offset': 0.5,
            //     // 'text-justify': 'left',
            //     'text-allow-overlap': true,
            // }
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





            // transparent layer over the whole earth
            map.current.addSource('transparent-click-layer', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        // These coordinates outline Maine.
                        'coordinates': [
                            [
                                [-180, -90],
                                [180, -90],
                                [180, 90],
                                [-180, 90],
                            ]
                        ]
                    }
                }
            })
            map.current.addLayer({
                'id': 'transparent-click-layer',
                'type': 'fill',
                'source': 'transparent-click-layer', // reference the data source
                'layout': {},
                'paint': {
                    'fill-color': '#0080ff', // blue color fill
                    'fill-opacity': 0
                }
            });


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
                minzoom: 6,
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
                }
            });
            map.current.addLayer({
                type: 'symbol',
                source: 'last-location',
                id: 'last-location-text',
                minzoom: 6,
                layout: {
                    'text-field': [
                        'format', 
                        'current location of Jonas',
                        {
                            // 'font-scale': 1,
                            'text-font': ['literal', ['Apoc-Revelations-Trial Bold', 'Open Sans Regular']],
                        },
                    ],
                    // 'text-field': [
                    //     'format', 
                    //     ['get', 'date'],
                    //     {
                    //         // 'font-scale': 1,
                    //         'text-font': ['literal', ['Apoc-Revelations-Trial Bold', 'Open Sans Regular']],
                    //     },
                    //     '\n',
                    //     ['get', 'location'],
                    //     {
                    //         // 'font-scale': 1,
                    //         'text-font': ['literal', ['Apoc-Revelations-Trial Bold', 'Open Sans Regular']],
                    //     },
                    // ],
                    'text-variable-anchor': ['top'],
                    // 'text-variable-anchor': ['left'],
                    'text-radial-offset': 1,
                    'text-justify': 'center',
                    // 'text-justify': 'left',
                }
            });

            // MAP INTERACTIONS
            map.current.on('mouseup', 'transparent-click-layer', (e) => {
                console.log("click eath")
                navigate('/')
                return 
            });
            // current location of bird
            map.current.on("mouseenter", 'last-location', () => {
                map.current.getCanvas().style.cursor = "pointer";
            });
            map.current.on("mouseleave", 'last-location', () => {
                map.current.getCanvas().style.cursor = "grab";
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
            map.current.on("mouseenter", 'last-location-text', () => {
                map.current.getCanvas().style.cursor = "pointer";
            });
            map.current.on("mouseleave", 'last-location-text', () => {
                map.current.getCanvas().style.cursor = "grab";
            });
            map.current.on('click', 'last-location-text', (e) => {
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
            // map.current.on('click', 'water', (e) => {
            //     navigate('/')
            //     return 
            // });

            map.current.on('click', 'land', (e) => {
                navigate('/')
                return 
            });

            map.current.on('resize', () => {
                map.current.resize()
                console.log('A resize event occurred.');
            });
            
            // map.current.on("click", () => {
            //     map.current.resize()
            // });


            function LandmarkHTML(landmarkForHtml, markerClassName, hideClassOnLoad, i, color, landmarkId, selectedLandmark){
                console.log("landmarks properties: " + i)
                let html = `<div tabindex="${i}" id="${landmarkId}" class="landmarkMarker ${selectedLandmark} ${markerClassName} ${hideClassOnLoad} ">
                                    <div style="background-color: ${color}; "class="landmarkCircle"></div>
                                    <div class="landmarkText">${landmarkForHtml.properties.description}</div>
                     
                            </div>`
                const el = document.createElement('div');
                el.innerHTML = html;
                return el.firstChild;
            }
            const CurrentLocationIcon = () => {
                const html = `<img src="${birdIconFile}" alt="Current location of Jonas" width="60" height="60" style="cursor: pointer;"/>`
                const el = document.createElement('div')
                el.innerHTML = html
                return el.firstChild
            }




            function updateLandmarks(){
                if(!firstLoad.current) return
                firstLoad.current = false

                const birdIcon = new mapboxgl.Marker({
                    offset: [15,-10],
                    anchor: 'bottom-right',
                    element: CurrentLocationIcon(),
                    zoom:8,
                    minzoom: 6,
                }).setLngLat([current_longitude, current_latitude])
                birdIcon.addTo(map.current)
                birdIcon.getElement().addEventListener('click', () => {
                    map.current.flyTo({
                        center: [current_longitude, current_latitude],
                        zoom: 12,
                        // bearing: 130,
                        // pitch: 75,
                        duration: 1000, // Animate over 1 seconds
                        essential: true // This animation is considered essential with
                        //respect to prefers-reduced-motion
                    });
                });

                let i = 0
                for (const landmark of landmarks) {
                    i = i + 1
                    const hideClassOnLoad = urlPrefix === "uploadstory" ? "hideElement" : ""
                    const selectedLandmark = urlLandmarkMemo === landmark.properties.url ? "selectedLandmark" : ""
                    // console.log("loadmemeory selected - urlLandmark: " + urlLandmarkMemo + " landmark.properties.url: " + landmark.properties.url)
                    const landmarkId = "loadmemory-" + landmark.properties.url
                    const markerClassName = "load-memories"
                    const coords = landmark.geometry.coordinates
                    const urlEndpoint = landmark.properties.url
                    const landmarkForHtml = landmark
                    const color = "rgb(163, 220, 245)"
                    const divMarker = LandmarkHTML(landmarkForHtml, markerClassName, hideClassOnLoad, i, color, landmarkId, selectedLandmark)
                    const offset = landmark.properties.counter === 1 ? [-10, 20] : [-10,0]
                    const marker = new mapboxgl.Marker({
                        // offset: 100,
                        anchor: 'left',
                        offset: offset,
                        element: divMarker
                    }).setLngLat(coords)
                    marker.addTo(map.current)
                    marker.getElement().addEventListener('click', () => {
                        // navigate("/loadmemory/" + urlEndpoint)
                        RandomUrlEndpoint(urlEndpoint)
                    });
                    
                }
                for (const landmark of landmarks) {
                    i = i + 1
                    const hideClassOnLoad = urlPrefix === "loadmemory" ? "hideElement" : urlPrefix === "" ? "hideElement" : ""
                    const selectedLandmark = urlLandmarkMemo === landmark.properties.url ? "selectedLandmark" : ""
                    // console.log("updateLandmarks: " + feature.geometry.coordinates)
                    const landmarkId = "uploadstory-" + landmark.properties.url
                    const markerClassName = "upload-stories"
                    const coords = landmark.geometry.coordinates
                    const urlEndpoint = landmark.properties.url
                    const landmarkForHtml = landmark
                    const color = "rgb(240, 180, 252)"
                    const divMarker = LandmarkHTML(landmarkForHtml, markerClassName, hideClassOnLoad, i, color, landmarkId, selectedLandmark)
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
        console.log("url prefix: " + typeof prefix)
        return prefix
    }, [location.pathname])
    const urlLandmarkMemo = useMemo(() => {
        const currentPath = location.pathname
        const prefix = currentPath.split('/')[2]
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
    }, [navigate, urlPrefix])

    useEffect(() => {
        console.log("new landmark: " + urlLandmarkMemo)
        for(let i = 0; i < document.getElementsByClassName("landmarkMarker").length; i++){
            document.getElementsByClassName("landmarkMarker")[i].classList.remove("selectedLandmark")
        }
        if(document.getElementById("loadmemory-droemling")){
            if(urlLandmarkMemo === "droemling"){
                document.getElementById("loadmemory-droemling").classList.add("selectedLandmark")
                document.getElementById("uploadstory-droemling").className += " selectedLandmark "
            }
            if(urlLandmarkMemo === "lackova"){
                document.getElementById("loadmemory-lackova").classList.add("selectedLandmark")
                document.getElementById("uploadstory-lackova").className += " selectedLandmark "
            }
            if(urlLandmarkMemo === "istanbul"){
                document.getElementById("loadmemory-istanbul").classList.add("selectedLandmark")
                document.getElementById("uploadstory-istanbul").className += " selectedLandmark "
            }
            if(urlLandmarkMemo === "hama"){
                document.getElementById("loadmemory-hama").classList.add("selectedLandmark")
                document.getElementById("uploadstory-hama").className += " selectedLandmark "
            }
            if(urlLandmarkMemo === "neveeitan"){
                document.getElementById("loadmemory-neveeitan").classList.add("selectedLandmark")
                document.getElementById("uploadstory-neveeitan").className += " selectedLandmark "
            }
            if(urlLandmarkMemo === "dudaimsite"){
                document.getElementById("loadmemory-dudaimsite").classList.add("selectedLandmark")
                document.getElementById("uploadstory-dudaimsite").className += " selectedLandmark "
            }
        }

    }, [urlLandmarkMemo])

    // function ClickLandmark(urlEndpoint){
    //     console.log("www urlEndpoint: ", urlEndpoint)
    //     const currentPath = location.pathname


    //     console.log("www urlPrefix: ", currentPath)
    //     // map.current.on('click', 'story-locations', (e) => {
    //     //     console.log("url: " + urlPrefix)
    //     //     navigate( urlPrefix + '/' + e.features[0].properties.url);
    //     // });
    // }


    // window.setTimeout(()=>map.current.resize(), 500)


    // define zoom behavior
    // -----------------------------------------------------------------
    const zoom = useMemo(() => {
        return location.pathname === "/" ? false : true
    }, [location.pathname])
    useEffect(() => {
        if (!map.current) return; 
        console.log("perform zoom")
        if (!zoom){ 
            map.current.flyTo({center: [current_longitude, current_latitude], zoom:12});
            map.current.scrollZoom.enable();
            map.current.doubleClickZoom.enable();
            map.current.keyboard.enable();
            map.current.dragPan.enable();
            map.current.touchZoomRotate.enable();

        } else {
            // map.current.fitBounds([
            //     [6, 0], // southwestern corner of the bounds
            //     [50, 60], // northeastern corner of the bounds
            // ]);
            if(urlPrefix === "loadmemory"){
                map.current.fitBounds([
                    [-20, 5], // southwestern corner of the bounds
                    [20, 60], // northeastern corner of the bounds
                ]);
            }
            if(urlPrefix === "uploadstory"){
                map.current.fitBounds([
                    [35, 5], // southwestern corner of the bounds
                    [95, 60], // northeastern corner of the bounds
                ]);
            }
            map.current.scrollZoom.disable();
            map.current.doubleClickZoom.disable();
            map.current.dragRotate.disable();
            map.current.keyboard.disable();
            map.current.dragPan.disable();
            map.current.touchZoomRotate.disable();
        }
    }, [current_latitude, current_longitude, zoom, urlPrefix])

    // NEEED FIXING: SPACE BETWEEN WEATHER ITEMS (log 14.11.22, 14:30)
    // const weatherContainerStyle = {
    //     position: 'fixed',
    //     zIndex: 3,
    //     bottom: '40px',
    //     paddingLeft: '60px',
    //     paddingRight: '60px',
    //     display: 'flex',
    //     flexWrap: 'nowrap',
    //     justifyContent: 'space-between',
    //     width: '100vw',
    // }

    
    const mapStyle ={
        height: '100vh',
        // marginLeft:  urlPrefix === "loadmemory" ? '50vw'  : urlPrefix === "uploadstory" ? '0'    : '0',
        // marginRight: urlPrefix === "loadmemory" ? '0'     : urlPrefix === "uploadstory" ? '50vw' : '0',
        // transform: urlPrefix === "loadmemory" ? 'translateX(50%)'     : urlPrefix === "uploadstory" ? 'translateX(-50%)' : 'translateX(0)',
    }
    const mapClasses = "top-0 w-100 h-200 map-container mx-0 mobileHorizontal:mx-9 wideScreen:mx-12"
    
    // temp, pressure, humidity, wind_speed, wind_deg, sunrise, sunset
    
    
    const weatherContainerStyle = "fixed z-10 bottom-7 px-4 xs:px-14 pb-6 xs:pb-4 flex flex-wrap-nowrap place-content-between w-screen grid grid-cols-3 lg:grid-cols-6"
    const weatherObject = "weatherObject mr-4 font-mono text-2xs xl:text-xs 2xl:text-sm mt-4"

    
    function timestamp2Time(timestamp){
        const birdTime = timestamp + weatherData.timezone - 3600
        console.log("timestamp: ", new Date(birdTime * 1000 ).toLocaleTimeString("de-DE"))
        return new Date(birdTime * 1000 ).toLocaleTimeString("de-DE")
    }
    // temp, pressure, humidity, wind_speed, wind_deg, sunrise, sunset, city_name, timezone, country, weather_description

    return (
        <div>
            { zoom || !weatherData ? "" :
            <div ref={weaterContainer} className={weatherContainerStyle}>
                <span className={weatherObject + " order-1 lg:order-1"}>Jonas Location: <span className='font-mono inline-block'>{weatherData.city_name}, {weatherData.country}</span></span>
                <span className={weatherObject + " order-3 lg:order-2"}>Sunrise: {timestamp2Time(weatherData.sunrise)}</span>
                <span className={weatherObject + " order-6 lg:order-3"}>Sunset: {timestamp2Time(weatherData.sunset)}</span>
                <span className={weatherObject + " order-4 lg:order-4"}>Weather condition: <span className='font-mono inline-block'>{weatherData.weather_description}</span></span>
                <span className={weatherObject + " order-2 lg:order-5"}>Temperature: <span className='font-mono inline-block'>{weatherData.temp} °C</span></span>
                <span className={weatherObject + " order-5 lg:order-6"}>Air humidity: <span className='font-mono inline-block'>{weatherData.humidity} g/m3</span></span>
            </div> }
            <div ref={mapContainer} className={mapClasses} style={mapStyle} />
        </div>
    );
}