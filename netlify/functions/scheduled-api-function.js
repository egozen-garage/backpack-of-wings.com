// dev mode
// start dev mode
// netlify functions:serve
// invoke function in terminal
// netlify functions:invoke scheduled-api-function --port 9999
// invoke function in browser http://localhost:9999/.netlify/functions/scheduled-api-function

const { schedule } = require('@netlify/functions');
// const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const queryString = require('query-string');

// API to call latest location of the bird
const apiLastLocation = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&max_events_per_individual=1&sensor_type=gps'


// openWeather api
const openWeatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const openWeatherApiKey = 'd169cb8d495ba87e4e8b7cc41af3aad7'
const exclude = 'minutely,hourly,daily,alerts'
const unit = '&units=metric'



// tomorrow.io api 
// set the Timelines GET endpoint as the target URL
const getTimelineURL = "https://api.tomorrow.io/v4/timelines";
// get your key from app.tomorrow.io/development/keys
const apiKey = 'x15bqbzd8qwS9cEA3wCYOfens2xowbID';
let location = []
// list the fields
const fields = [
    "precipitationIntensity",
    "precipitationType",
    "windSpeed",
    "windGust",
    "windDirection",
    "temperature",
    "temperatureApparent",
    "cloudCover",
    "cloudBase",
    "cloudCeiling",
    "weatherCode",
  ];
// choose the unit system, either metric or imperial
const units = "metric";
// set the timesteps, like "current", "1h" and "1d"
const timesteps = ["current"];
// // configure the time frame up to 6 hours back and 15 days out
// const now = moment.utc();
// const startTime = moment.utc(now).add(0, "minutes").toISOString();
// const endTime = moment.utc(now).add(1, "days").toISOString();
// specify the timezone, using standard IANA timezone format
const timezone = "Europe/Berlin";





const handler = async (event, context) => {
    try {
        const response = await fetch(apiLastLocation);
        const data = await response.json();
        const current_lat = data.individuals[0].locations[0].location_lat;
        const current_long = data.individuals[0].locations[0].location_long;
        const current_timestamp = data.individuals[0].locations[0].timestamp;
        location.push(current_lat, current_long)
        console.log("current_lat = " + current_lat)
        console.log("current_long = " + current_long)
        console.log("current_long = " + new Date(current_timestamp).toISOString())
        console.log("current_long = " + current_timestamp)

        // openWeather api call:
        const responseOpenWeather = await fetch(openWeatherBaseUrl + "lat=" + current_lat + "&lon=" + current_long + "&exclude=" + exclude + unit + "&appid=" + openWeatherApiKey, {method: "GET", compress: true});
        const dataOpenWeather = await responseOpenWeather.json();
        console.log("weather data is: " + dataOpenWeather)
        console.log("url weather string: " + openWeatherBaseUrl + "lat=" + current_lat + "&lon=" + current_long + "&exclude=" + exclude + unit + "&appid=" + openWeatherApiKey)


        // tomorrow.io api call
        // request the timelines with all the query string parameters as options
        const getTimelineParameters = queryString.stringify({
            apiKey,
            location,
            fields,
            units,
            timesteps,
            // startTime,
            // endTime,
            timezone,
        }, {arrayFormat: "comma"});
        console.log("url weather string: " + getTimelineURL + "?" + getTimelineParameters)
        const responseWeather = await fetch(getTimelineURL + "?" + getTimelineParameters, {method: "GET", compress: true});
        const dataWeather = await responseWeather.json();
        console.log("weather data is: " + dataWeather)




      return { statusCode: 200, 
        body: JSON.stringify({ data }) 
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
exports.handler = schedule("* * * * *", handler);
// schedule every 15 minute
// exports.handler = schedule("*/15 * * * *", handler);
// exports.handler = schedule("@hourly", handler);





