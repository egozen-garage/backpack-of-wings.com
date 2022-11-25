// # dev mode
// ## start dev mode
// netlify functions:serve
// invoke function in terminal
// netlify functions:invoke scheduled-weather-api --port 9999
// invoke function in browser http://localhost:9999/.netlify/functions/scheduled-weather-api

// const sanityClient = require('@sanity/client')
const { schedule } = require('@netlify/functions');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const projectId = process.env.REACT_APP_SANITY_DATABASE_PROJECT_ID
const dataset = process.env.REACT_APP_SANITY_MAIN_DATABASE_NAME
const apiVersion = process.env.REACT_APP_SANITY_API_VERSION
const token = process.env.REACT_APP_SANITY_WRITE_SERVERSIDE

// const client = sanityClient({
//   projectId: projectId,
//   dataset: dataset,
//   apiVersion: apiVersion,
//   token: token
// })

// const queryString = require('query-string');

// API to call latest location of the bird
const apiLastLocation = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&max_events_per_individual=1&sensor_type=gps'


// openWeather api
const openWeatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const openWeatherApiKey = process.env.REACT_APP_OPENWEATHER
const exclude = 'minutely,hourly,daily,alerts'
const unit = '&units=metric'


const sanityDocumentId = "c9c99c88-92e0-46a5-8a55-61b910961bce"


// exports.handler = async (event, context, callback) => {
const handler = async (event, context, callback) => {
    // create timestamp
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    try {
        const response = await fetch(apiLastLocation);
        const data = await response.json();
        const current_lat = data.individuals[0].locations[0].location_lat;
        const current_long = data.individuals[0].locations[0].location_long;
        const current_timestamp = new Date(data.individuals[0].locations[0].timestamp).toISOString();
        console.log("current_lat = " + current_lat)
        console.log("current_long = " + current_long)
        console.log("current_long = " + current_timestamp)

        // openWeather api call:
        const responseOpenWeather = await fetch(openWeatherBaseUrl + "lat=" + current_lat + "&lon=" + current_long + "&exclude=" + exclude + unit + "&appid=" + openWeatherApiKey, {method: "GET", compress: true});
        const dataOpenWeather = await responseOpenWeather.json();
        console.log("weather data is: " + JSON.stringify(dataOpenWeather))
        console.log("url weather string: " + openWeatherBaseUrl + "lat=" + current_lat + "&lon=" + current_long + "&exclude=" + exclude + unit + "&appid=" + openWeatherApiKey)



        const key = "weather-" + current_timestamp.slice(0, -5)

        // write data to sanity database:
        const newWeatherData = {
            "_key": key,
            "timestamp": dateTime,
            "latitude": current_lat,
            "longitude": current_long,
            "temp": dataOpenWeather.main.temp,
            "temp_feels_like": dataOpenWeather.main.feels_like,
            "temp_min": dataOpenWeather.main.temp_min,
            "temp_max": dataOpenWeather.main.temp_max,
            "pressure": dataOpenWeather.main.pressure,
            "humidity": dataOpenWeather.main.humidity,
            "sea_level": dataOpenWeather.main.sea_level,
            "grnd_level": dataOpenWeather.main.grnd_level,
            "wind_speed": dataOpenWeather.wind.speed,
            "wind_deg": dataOpenWeather.wind.deg,
            "wind_gust": dataOpenWeather.wind.gust,
            "visibility": dataOpenWeather.visibility,
            "clouds_all": dataOpenWeather.clouds.all,
            "timezone": dataOpenWeather.timezone,
            "city_name": dataOpenWeather.name,
            "sunrise": dataOpenWeather.sys.sunrise,
            "sunset": dataOpenWeather.sys.sunset,
            "country": dataOpenWeather.sys.country,
            "weather_id": dataOpenWeather.weather[0].id,
            "weather_main": dataOpenWeather.weather[0].main,
            "weather_description": dataOpenWeather.weather[0].description,
            "weather_icon": dataOpenWeather.weather[0].icon,
        }

        const mutations = []
        const patch = {
            patch: {
                "id" : sanityDocumentId, // id of Movebank document with locations
                "insert": {
                  "before": "weatherData[0]",
                  "items": [newWeatherData]
                }
              }
        }
        mutations.push(patch)


        // Post patches to Sanity
        fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({mutations})
        })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.error(error))
                    

        return { 
            statusCode: 200, 
            body: JSON.stringify({ weatherDate: dateTime })
        };

    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed fetching data' }),
      };
    }
  };

// schedule every 1 minute
// exports.handler = schedule("* * * * *", handler);
// schedule every 15 minute
// exports.handler = schedule("*/15 * * * *", handler);
exports.handler = schedule("@hourly", handler);
// schedule every 4 hours
// exports.handler = schedule("0 */4 * * *", handler);

