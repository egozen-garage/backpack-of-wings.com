// // # dev mode
// // ## start dev mode
// // netlify functions:serve
// // invoke function in terminal
// // netlify functions:invoke scheduled-movebank-transfer --port 9999
// // invoke function in browser http://localhost:9999/.netlify/functions/scheduled-movebank-transfer

// const sanityClient = require('@sanity/client')
// // const { schedule } = require('@netlify/functions');
// // const fetch = require('node-fetch');
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


// const projectId = process.env.REACT_APP_SANITY_DATABASE_PROJECT_ID
// const dataset = process.env.REACT_APP_SANITY_MAIN_DATABASE_NAME
// const apiVersion = process.env.REACT_APP_SANITY_API_VERSION
// const token = process.env.REACT_APP_SANITY_WRITE_SERVERSIDE

// const client = sanityClient({
//   projectId: projectId,
//   dataset: dataset,
//   apiVersion: apiVersion,
//   token: token
// })

// // const queryString = require('query-string');

// // API to call latest location of the bird
// // const apiLastLocation = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&max_events_per_individual=1&sensor_type=gps'







// // Movebank base URL
// const movebankBaseURL = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&sensor_type=gps'






// const mutations = []




// // const arrayOfLocations

// // const handler = async (event, context, callback) => {
// exports.handler = async (event, context, callback) => {
//     try {
//         // 1. Check last location entry in Sanity           --> query timestamp
//         const response = await client.fetch(
//             `*[_id == "edf140d5-4049-47fa-8ce8-38412f4e0476"]{
//                 location[0]
//             }`
//         )
//         const lastSanityEntryOfMovebank = await response
//         const lastTimestamp = lastSanityEntryOfMovebank[0].location.timestamp + 1
//         console.log("last santiy entry. timestamp: ", lastTimestamp)
//         console.log("--------------------------------")
        
        
//         // 2. Call movebank data base and query time span   --> LAST ENTRY until NOW
//         const now = 1374688800000
//         // const now = Date.now();

//         console.log("now: ", Date.now())
//         const movebankQuery = movebankBaseURL + '&timestamp_start=' + lastTimestamp + '&timestamp_end=' + now;        
//         const responseMovebank = await fetch(movebankQuery)
//         const movebankLatestLocations = await responseMovebank.json()
        
//         if(!movebankLatestLocations.individuals.length){
//             console.log("no new data")
//             return { 
//                 statusCode: 200, 
//                 body: JSON.stringify({ responseMovebank })
//             };
//         } else {
//             // console.log("movebankData is: " + JSON.stringify(movebankLatestLocations) ) 
//             // console.log("amount of movebankData entries since last entry " + movebankLatestLocations.individuals[0].locations.length)
//             // console.log("--------------------------------")
//         }
        
//         // 3. For each entry add a patch with its related data
//         for(let i=0; i < movebankLatestLocations.individuals[0].locations.length; i++ ){
//             const timestamp = movebankLatestLocations.individuals[0].locations[i].timestamp
//             const longitude = movebankLatestLocations.individuals[0].locations[i].location_long
//             const latitude = movebankLatestLocations.individuals[0].locations[i].location_lat
//             const newLocation = {
//                 "_type": "locationEntry",
//                 "_key": timestamp,
//                 "timestamp": timestamp,
//                 "longitude": longitude,
//                 "latitude": latitude,
//             }
//             const patch = {
//                 patch: {
//                     "id" : "edf140d5-4049-47fa-8ce8-38412f4e0476", // id of Movebank document with locations
//                     "insert": {
//                       "before": "location[0]",
//                       "items": [newLocation]
//                     }
//                   }
//             }
//             mutations.push(patch)
//         }
//         console.log("mutations: " + JSON.stringify(mutations))
        
//         // 4. Post patches to Sanity
//         fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`, {
//             method: 'post',
//             headers: {
//               'Content-type': 'application/json',
//               Authorization: `Bearer ${token}`
//             },
//             body: JSON.stringify({mutations})
//         })
//         .then(response => response.json())
//         .then(result => console.log(result))
//         .catch(error => console.error(error))
            








//     return { 
//         statusCode: 200, 
//         body: JSON.stringify({ lastSanityEntryOfMovebank })
//     };
//     } 
//     catch (error) {
//         console.log(error);
//         return {
//           statusCode: 500,
//           body: JSON.stringify({ error: 'Failed fetching data' }),
//         };
//     }
//   };

// // schedule every 1 minute
// // exports.handler = schedule("* * * * *", handler);
// // schedule every 15 minute
// // exports.handler = schedule("*/15 * * * *", handler);
// // exports.handler = schedule("@hourly", handler);
// // schedule every 4 hours
// // exports.handler = schedule("0 */4 * * *", handler);

