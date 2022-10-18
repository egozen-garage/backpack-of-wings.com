import { useEffect, useState } from 'react';


const currentLatitude = 31.2909;
const currentLongitude = 34.6811;

const startingLatitude = currentLatitude - 0.2;
const startingLongitude = currentLongitude - 0.2;
const endingLatitude = currentLatitude + 0.2;
const endingLongitude = currentLongitude + 0.2;
const n = 1;
const windPoints = [];

let firstTime = true;
let urls=[];

export default function CallWeatherData () {

    if(firstTime){
        for (let i=0; i < n; i++) {
            for (let j=0; j < n; j++) {
                windPoints.push({
                    lat: startingLatitude + i * (endingLatitude - startingLatitude)/n,
                    lng: startingLongitude + j * (endingLongitude - startingLongitude)/n,
                    wind_speed: 0,
                    wind_deg: 0,
                    wind_gust: 0,
                })
            }
        }
        // Create the URLs
        const baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat=";
        const apiKey = process.env.REACT_APP_OPENWEATHER;
        const exclude = '&exclude=minutely,hourly,daily,alerts'
        const unit = '&units=metric'
        const urls = windPoints.map(point => baseUrl + point.lat + "&lon=" + point.lng  + exclude + "&appid=" + apiKey);
        // Fetch the weather data        
        console.log("amount of urls: " + urls.length);
        console.log("amount of urls: " + typeof urls);
        console.log("amount of wind points: " + windPoints.length);
        console.log("urls: " + JSON.stringify(urls));
        firstTime = false;
    }


    // try{
    //     let res = await Promise.all(urls.map(e => fetch(e)))
    //     let resJson = await Promise.all(res.map(e => e.json()))
    //     resJson = resJson.map(e => e.results[0].name.first)
    //     console.log(resJson)
    // }catch(err) {
    //     console.log(err)
    // }


    // useEffect(() => {
    //     async function fetchData() {
    //         const weathers = await Promise.all(urls.map(async url => {
    //             const response = await fetch(url);
    //             return response.text();
    //         }));

    //         // Set the temperature
    //         windPoints.forEach((point, index) => {
    //             // point.wind_speed = weathers[index].wind.speed;
    //             point.wind_speed = JSON.parse(weathers[index]).wind.speed;
    //             // point.wind_deg = JSON.parse(weathers[index]).wind.deg;
    //             // point.wind_gust = JSON.parse(weathers[index]).wind.gust;
    //         });
    //         console.log("wind data is: " + JSON.stringify(windPoints));
    //     }    
    //     fetchData();
    // });


    return
};