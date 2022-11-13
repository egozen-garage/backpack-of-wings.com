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



// Call Movebank API and provide array
export default async function Mapbox(props) { 
    console.log("CALL Mapbox")
    // component is loading 4 times. why?


    // const callmapData = useCallback(() => {
    //     console.log("try call data")
    //     return FetchMapData()
    // }, []) 
    // const mapData = callmapData()
    const mapData = FetchMapData() // fetch relevant data for map
  // fetch relevant data for map
  



    if(!mapData[0]){    console.log("data has not arrived") }
    if(mapData[0]){     console.log("data has arrived")     }

    // let navigate  = useNavigate()

    // const [dataAdded, setDataAdded] = useState(false)
    // let dataAdded = false

        if(mapData[3] && mapData[0] != null && mapData[1] != null && mapData[2] != null){
        // if(mapData[3] && !dataAdded){

            // if(dataAdded) return
            // dataAdded = true
            // setDataAdded(true)
            console.log("## load map now")
            // return CreateMap(mapData)
            return
        } else {
            return console.log("## waiting for data")
        }

    
}
function CreateMap(mapData){
    console.log("## create Map")
    console.log("## Map DATA 0" + mapData[0])
    console.log("## Map DATA 1" + mapData[1])
    console.log("## Map DATA 2" + mapData[2])

    const latestBirdData = mapData[0] // FetchMapData() --> [0] movebankData latest locations
    const weatherData    = mapData[1] // FetchMapData() --> [1] weatherData
    const landmark       = mapData[2] // FetchMapData() --> [2] landmark
    const dataReady      = mapData[3] // FetchMapData() --> [3] dataReady

    const [currentLatitude, setCurrentLatitude] = useState(0)
    const [currentLongitude, setCurrentLongitude] = useState(0)

    const pathRGB = '255,0,255';

    const mapContainer = useRef(null);
    const map = useRef(null);



    // initilize map
    // -----------------------------------------------------------------
    useEffect(() => {
        console.log("initilize map")
        if (map.current) return; // initialize map only once
        // setZoom(12);
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            projection: 'mercator',
            // projection: 'naturalEarth',
            name: 'Earth',
            // style: 'mapbox://styles/mapbox/light-v10',
            style: 'mapbox://styles/arminarndt/cl8vqgc4h002v14phy6bbsut8',
            // center: [20, 20],
            // center: [currentLatitude, currentLongitude],
            minZoom: 3,
            maxZoom: 17,
            zoom: 3
        });

        // disable map Toggle interactions
        map.current.dragRotate.disable();
        map.current.touchZoomRotate.disable();
        map.current.boxZoom.disable();


        
    }, [])
    
    // initilize data
    // -----------------------------------------------------------------
    useEffect(() => {
        if(!dataReady) return;
        // LATEST LOCATIONS DATA
        // -----------------------------------------------------------------
        let lastItemCount = latestBirdData.length-1
        setCurrentLatitude(latestBirdData[lastItemCount].location_lat)
        setCurrentLongitude(latestBirdData[lastItemCount].location_long)
        // for(let i = 0; i < latestBirdData.length; i++){
        // // for(let i = 0; i < 100; i++){
        //     var locationX = [
        //         latestBirdData[i].location_long,
        //         latestBirdData[i].location_lat
        //     ]
        //     currentCoordinates.current.push(locationX)
        //         // [
        //         //     [-77.044211, 38.852924],
        //         //     [-77.045659, 38.860158],
        //         //     [-77.044232, 38.862326],
        //         // ]
        // }
    }, [dataReady, latestBirdData])
    

    // read URL first word 
    // -----------------------------------------------------------------
    const location = useLocation()
    const urlPrefix = useMemo(() => {
        const currentPath = location.pathname
        const prefix = currentPath.split('/')[1]
        console.log("url prefix: " + prefix)
        return prefix
    }, [location.pathname])


    // define zoom behavior
    // -----------------------------------------------------------------
    const zoom = useMemo(() => {
        return location.pathname === "/" ? false : true
    }, [location.pathname])
    useEffect(() => {
        if (!map.current) return; 
        console.log("perform zoom")
        if (!zoom){ 
            if(dataReady){
                map.current.flyTo({center: [currentLongitude, currentLatitude], zoom:12});
            } else {
                map.current.flyTo({center: [10, 50], zoom:3});
            }
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
    }, [dataReady, currentLatitude, currentLongitude, zoom])



    // add data to map
    // LATEST LOCATIONS DATA
    // -----------------------------------------------------------------  
    
    // const currentCoordinates = useMemo(() => {

    // })
    // const currentCoordinates = useRef([]);
   



    // const [latestBirdData, setLatestBirdData] = useState(null)

    // const currentLocation = useMemo(() => {
    //     console.log("MAPBOX useMemo - define current location")
    //     return CurrentLocation(latestBirdData)
    // }, [latestBirdData])
    // console.log("Current Location: " + JSON.stringify(currentLocation) )


    // useEffect(() => {
    //     if(!props.mapData) return;
    //     setLatestBirdData(props.mapData[0])
    // }, [props.mapData])
    







    
    
    // prepare data
    
    // const pathRGB = '255,0,255';
    // // add data to map
    // useEffect(() => {
    //     if(!dataReady) return;
    //     const currentCoordinates = [];
    //     // if(dataReady){
    //         // LATEST LOCATIONS DATA
    //         // -----------------------------------------------------------------
    //         let latestBirdData = props.mapData[0]
    //         let lastItemCount = latestBirdData.length-1
    //         setCurrentLatitude(latestBirdData[lastItemCount].location_lat)
    //         setCurrentLongitude(latestBirdData[lastItemCount].location_long)
    //         for(let i = 0; i < latestBirdData.length; i++){
    //         // for(let i = 0; i < 100; i++){
    //             var locationX = [
    //                 latestBirdData[i].location_long,
    //                 latestBirdData[i].location_lat
    //             ]
    //             currentCoordinates.push(locationX)
    //                 // [
    //                 //     [-77.044211, 38.852924],
    //                 //     [-77.045659, 38.860158],
    //                 //     [-77.044232, 38.862326],
    //                 // ]
    //         }        
    //     // }
        
        
    //     const latestLocations = {
    //         'type': 'FeatureCollection',
    //         'features': [
    //             {
    //                 'type': 'Feature',
    //                 'properties': {},
    //                 'geometry': {
    //                     'coordinates': currentCoordinates,
    //                     'type': 'LineString'
    //                 }
    //             }
    //         ]
    //     };
    //     // ADD LATEST LOCATIONS
    //     map.current.on('load', () => {
    //         // 'line-gradient' can only be used with GeoJSON sources
    //         // and the source must have the 'lineMetrics' option set to true

    //         // map.current.addSource('latest-locations', {
    //         //     type: 'geojson',
    //         //     lineMetrics: true,
    //         //     data: latestLocations
    //         // });




    //         map.current.addLayer({
    //             type: 'line',
    //             source: 'latest-locations',
    //             id: 'latest-locations',
    //             paint: {
    //                 'line-color': 'red',
    //                 'line-width': 2,
    //                 // 'line-gradient' must be specified using an expression
    //                 // with the special 'line-progress' property
    //                 'line-gradient': [
    //                     'interpolate',
    //                     ['linear'],
    //                     ['line-progress'],
    //                     0, 'rgba(' + pathRGB + ',0)',
    //                     // 0.1, 'royalblue',
    //                     // 0.3, 'cyan',
    //                     // 0.5, 'lime',
    //                     0.7, 'rgba(' + pathRGB + ',0.3)',
    //                     1, 'rgba(' + pathRGB + ',1)'
    //                 ],
    //                 'line-opacity': 1
    //                 // 'line-opacity': [
    //                 //     'interpolate',
    //                 //     ['exponential', 0.5], // Set the exponential rate of change to 0.5
    //                 //     ['zoom'],
    //                 //     11, 0, // When zoom is 11 or less, set opacit to 1
    //                 //     12, 1 // When zoom is 12 or higher, set opacit to 0
    //                 // ],
    //             },
    //             layout: {
    //                 'line-cap': 'round',
    //                 'line-join': 'round'
    //             },
    //             // minzoom: 10,
    //         });

    //         map.current.getSource('latest-locations').setData({
    //             type: 'geojson',
    //             lineMetrics: true,
    //             data: latestLocations
    //         });
    //     })
    // }, [dataReady, props.mapData] )




    // let dataReceived = false;
    // if(!movebankData){
    //     console.log("--> ready && load")
    //     return ( <pre>data loading...</pre>)
    // }
    // if(movebankData && !dataReceived){
    //     console.log("--> one time only && already loaded")
    //     dataReceived = true;
    //     // console.log("bird data 30 days: " + movebankData[1].location_long)
    //     // console.log("### landmark data is: " + JSON.stringify(props.landmarkLinks.length))
    //     return <DrawMapbox birdData={movebankData} weatherData={weatherData} zoomOut={props.zoomOut} landmarkLinks={landmark}/>
    // }
    // return (
    //     <DrawMapbox birdData={movebankData} weatherData={weatherData} zoomOut={props.zoomOut} landmarkLinks={landmark}/>
    // )



    const mapContainerStyle ={
        height: '100vh',
        // width: '100px',
        // zIndex: -1
    }
    const mapStyle = "top-0 right-0 w-100 h-200 map-container"
    

    // if(dataReady){
    // } else {
    //     return ( <pre>data loading...</pre>)
    // }
    return (
        <div>
            <div ref={mapContainer} className={mapStyle} style={mapContainerStyle} />
            {/* { dataReady ? "" : <pre>data loading...</pre>} */}
        </div>
    );
}

// 1. prepare empty map
// 2. add data
// 3. update map with zoom and url path




// function AddDataToMap(map, pathRGB, latestBirdData){
//     useEffect(() => {
//         // console.log("load data to map 2 " + JSON.stringify(latestBirdData))
//         console.log("load data to map 2 " + latestBirdData.length)

//         // if(!dataReady) return;
//         console.log(" before iterating: ")

//         const currentCoordinates = [];
//         for(let i = 0; i < latestBirdData.length; i++){
//             // for(let i = 0; i < 100; i++){
//             var locationX = [
//                 latestBirdData[i].location_long,
//                 latestBirdData[i].location_lat
//             ]
//             currentCoordinates.push(locationX)
//                 // [
//                 //     [-77.044211, 38.852924],
//                 //     [-77.045659, 38.860158],
//                 //     [-77.044232, 38.862326],
//                 // ]
//             console.log("iterating: " + i)
//         }
//         console.log(" after iterating: ")

//         const latestLocations = {
//             'type': 'FeatureCollection',
//             'features': [
//                 {
//                     'type': 'Feature',
//                     'properties': {},
//                     'geometry': {
//                         'coordinates': currentCoordinates,
//                         'type': 'LineString'
//                     }
//                 }
//             ]
//         };

        
//         console.log(" latestLocations: " , JSON.stringify(latestLocations))
//         // console.log("load data to map: " + currentCoordinates.current)

//         // map.current.on('load', () => {
//             console.log("map on load")
//             // ADD LATEST LOCATIONS
//             map.current.addSource('latest-locations', {
//                 type: 'geojson',
//                 lineMetrics: true,
//                 data: latestLocations
//             });
//             map.current.addLayer({
//                 type: 'line',
//                 source: 'latest-locations',
//                 id: 'latest-locations',
//                 paint: {
//                     'line-color': 'red',
//                     'line-width': 2,
//                     // 'line-gradient' must be specified using an expression
//                     // with the special 'line-progress' property
//                     'line-gradient': [
//                         'interpolate',
//                         ['linear'],
//                         ['line-progress'],
//                         0, 'rgba(' + pathRGB + ',0)',
//                         // 0.1, 'royalblue',
//                         // 0.3, 'cyan',
//                         // 0.5, 'lime',
//                         0.7, 'rgba(' + pathRGB + ',0.3)',
//                         1, 'rgba(' + pathRGB + ',1)'
//                     ],
//                     'line-opacity': [
//                         'interpolate',
//                         ['exponential', 0.5], // Set the exponential rate of change to 0.5
//                         ['zoom'],
//                         11, 0, // When zoom is 11 or less, set opacit to 1
//                         12, 1 // When zoom is 12 or higher, set opacit to 0
//                     ],
//                 },
//                 layout: {
//                     'line-cap': 'round',
//                     'line-join': 'round' 
//                 },
//                 // minzoom: 10,
//             });
//         // })
//     }, [latestBirdData, map, pathRGB])
// }
































function DrawMapbox(props){

    console.log("draw mapbox. incoming data: " + JSON.stringify(props))
    // console.log("M M M - base url: " + props.baseUrl)

    let navigate  = useNavigate();
    // const [checkBaseUrl, setCheckBaseUrl] = useState(0)
    const location = useLocation();
    const [currentBaseUrl, _setCurrentBaseUrl] = useState([]);
    
    const baseUrlRef = React.useRef(currentBaseUrl);
    const setCurrentBaseUrl = data => {
        baseUrlRef.current = data;
        _setCurrentBaseUrl(data);
        console.log("# # Data: " + data)
    };

    
    // useEffect(() => {
    //     setCurrentBaseUrl(location.pathname)
    // }, [location.pathname])
    // console.log("/// current base URL: " + currentBaseUrl)



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
    // console.log("current location: " + current_latitude + ", " + current_longitude)
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
                    'url': '',
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
    // landmarkLinks
    // console.log("landmark details: " + props.landmarkLinks.length)
    // console.log("landmark details: " + JSON.stringify(props.landmarkLinks[0]))
    let landmarks = []
    for(let i = 0; i < props.landmarkLinks.length; i++){
        const landmark = {
            'type': 'Feature',
            'properties': {
                'description': props.landmarkLinks[i].locationName + ", " + props.landmarkLinks[i].locationType,
                'icon': 'current-location',
                'url': 'url', // add url link form sanity 
                // 'url': props.landmarkLinks[i].url, // WRONG needs fix
                // 'icon': 'icon-bird-location',
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [props.landmarkLinks[i].longitude, props.landmarkLinks[i].latitude]
            }
        }
        landmarks.push(landmark)
    }
    // console.log("array of landmarks: " + JSON.stringify(landmarks))
    const storyLocations = {
        'type': 'FeatureCollection',
        'features': landmarks
        // [ 
            // {
            //     'type': 'Feature',
            //     'properties': {
            //         'description': 'Istanbul, Turkey',
            //         'icon': 'current-location',
            //         'url': 'istanbul',
            //         // 'icon': 'icon-bird-location',
            //     },
            //     'geometry': {
            //         'type': 'Point',
            //         'coordinates': [29.087114420286106, 41.062342115603734]
            //     }
            // },
            // {
            //     'type': 'Feature',
            //     'properties': {
            //         'description': 'Drömling, Germany',
            //         'url': 'droemling',
            //         // 'icon': 'theatre-15'
            //     },
            //     'geometry': {
            //         'type': 'Point',
            //         'coordinates': [11.027669114580046, 52.49456226795604]
            //     }
            // },
            // {
            //     'type': 'Feature',
            //     'properties': {
            //         'description': 'Lacková, Slovakia',
            //         'url': 'lackova',
            //         // 'icon': 'theatre-15'
            //     },
            //     'geometry': {
            //         'type': 'Point',
            //         'coordinates': [20.590533054164478, 49.31698642610774]
            //     }
            // },
            // {
            //     'type': 'Feature',
            //     'properties': {
            //         'description': 'Hama, Syria',
            //         'url': 'hama',
            //         // 'icon': 'theatre-15'
            //     },
            //     'geometry': {
            //         'type': 'Point',
            //         'coordinates': [36.755196474432246, 35.13211177222622]
            //     }
            // },
            // {
            //     'type': 'Feature',
            //     'properties': {
            //         'description': 'Neve Eitan, Israel',
            //         'url': 'neve-eitan',
            //         // 'icon': 'theatre-15'
            //     },
            //     'geometry': {
            //         'type': 'Point',
            //         'coordinates': [35.5320056758374, 32.491984286564104]
            //     }
            // },
            // {
            //     'type': 'Feature',
            //     'properties': {
            //         'description': 'Dudaim site, Israel',
            //         'url': 'dudaim-site',
            //         // 'icon': 'theatre-15'
            //     },
            //     'geometry': {
            //         'type': 'Point',
            //         'coordinates': [34.90823611685902, 32.147553437885264]
            //     }
            // },
        // ]
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
            console.log("zoomOut true")
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



            map.current.on('click', 'story-locations', (e) => {
                // console.log("# # base Url: " + currentBaseUrl)
                // let stateBaseUrl = [...baseUrlRef.current]
                // stateBaseUrl.push(location.pathname)
                // console.log("# # base Url: " + JSON.stringify(currentBaseUrl) )
                // setCurrentBaseUrl(stateBaseUrl)
                // console.log("# ? base Url: " + baseUrlRef.current[baseUrlRef.current.length-1] )
    
                console.log("# # path: "+ location.pathname)
                // console.log("# # base Url: " + currentBase)
                // NavigateTo(e.features[0].properties.url)
                
                // console.log(location.pathname);
                // ReNavigate(e.features[0].properties.url)
                // navigate(location.pathname + '/' + e.features[0].properties.url);
                // setCurrentRoute(e.features[0].properties.description)
            });
        });
        
        
        
        
        
        // map.current.on('click', 'story-locations', (e) => {
            //     console.log("# # base Url: " + currentBaseUrl)
            //     // NavigateTo(e.features[0].properties.url)
            
            //     // console.log(location.pathname);
            //     // ReNavigate(e.features[0].properties.url)
            //     // navigate(baseUrl + '/' + e.features[0].properties.url);
            //     // setCurrentRoute(e.features[0].properties.description)
            // });
    });
        


        
    //     function NavigateTo(destinationUrl){
    //             console.log("destination: " + props.baseUrl)
    //             if(props.baseUrl === "uploadstory"){
    //                     navigate("uploadstory/" + destinationUrl)
    //     } else if ( props.baseUrl === "loadmemories"){
    //         navigate("loadmemories/" + destinationUrl)
    //     } else {
    //         navigate("/")
    //     }
    //     // console.log("# destination suffix: " + destinationUrl)
    //     // console.log("# base Url: " + currentBaseUrl)
    // }




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