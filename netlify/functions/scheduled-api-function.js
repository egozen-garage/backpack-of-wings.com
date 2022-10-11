

const { schedule } = require('@netlify/functions');
// const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// API to call latest location of the bird
const apiLastLocation = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&max_events_per_individual=1&sensor_type=gps'



const handler = async (event, context) => {
    try {
      const response = await fetch(apiLastLocation);
      const data = await response.json();
      return { statusCode: 200, body: JSON.stringify({ data }) };
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
exports.handler = schedule("*/15 * * * *", handler);
// exports.handler = schedule("@hourly", handler);


// dev mode
// start dev mode
// netlify functions:serve
// invoke function in terminal
// netlify functions:invoke scheduled-api-function.js --port 9999