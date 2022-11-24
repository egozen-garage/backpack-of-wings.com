// // # dev mode
// // ## start dev mode            --> netlify functions:serve
// // invoke function in terminal  --> netlify functions:invoke scheduled-movebank-api-call --port 9999
// // invoke function in browser   --> http://localhost:9999/.netlify/functions/scheduled-movebank-api-call

// const sanityClient = require('@sanity/client')
// const { schedule } = require('@netlify/functions');
// // const fetch = require('node-fetch');
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// const client = sanityClient({
//   projectId: process.env.REACT_APP_SANITY_DATABASE_PROJECT_ID,
//   dataset: process.env.REACT_APP_SANITY_MAIN_DATABASE_NAME,
//   apiVersion: process.env.REACT_APP_SANITY_API_VERSION,
//   token: process.env.REACT_APP_SANITY_WRITE_SERVERSIDE
// })


// // Movebank base URL
// const movebankBaseURL = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&sensor_type=gps'


// const handler = async (event, context, callback) => {
//     // 1. Call sanity latest entry of movebankData
//     try {
//         const responseSanity = await client.fetch(
//             `*[_type == "movebankData"]{
//                 timestamp
//             }[0]`
//         )
//         const lastSanityEntryOfMovebank = await responseSanity

//         console.log("last santiy entry. timestamp: " + lastSanityEntryOfMovebank.timestamp)
//         // console.log("last santiy entry. timestamp: " + lastSanityEntryOfMovebank.timestamp)
//         // const lastSanityEntryOfMovebank2 = 1666735200000;
//         // 2. construct movebank URL query
//         // const today = new Date();
//         const today = Date.now();
//         // const lastSanityEntry = '';
//         // add 000 if necessary 
//         const movebankQuery = movebankBaseURL + '&timestamp_start=' + lastSanityEntryOfMovebank.timestamp + '&timestamp_end=' + today;
//         // console.log("time and date of NOW: " + movebankQuery)
        
//         // 3. Call Movebank API
//         const responseMovebank = await fetch(movebankQuery)
//         // const movebankLatestLocations = await responseMovebank.json().individuals[0].locations
//         const movebankLatestLocations = await responseMovebank.json()
//         console.log("movebankData is: " + JSON.stringify(movebankLatestLocations) ) 

//         console.log("amount of movebankData entries since last entry " + movebankLatestLocations.individuals[0].locations.length)
//         // 4. Write Sanity 
//         for(let i=0; i < movebankLatestLocations.individuals[0].locations.length; i++ ){
//             // write data to sanity database:
//             const newLocation = {
//                 _type: 'movebankData',
//                 timestamp: movebankLatestLocations.individuals[0].locations[i].timestamp,
//                 location_lat: movebankLatestLocations.individuals[0].locations[i].location_lat,
//                 location_long: movebankLatestLocations.individuals[0].locations[i].location_long,
//             }
//             console.log("progress nr. " + i)

//             console.log("new data set of location: " + JSON.stringify(newLocation) )

//             // write data to sanity database
//             // const result = await client.create(newLocation).then((res) => {
//             //     // you can see this in the Netlify function logs
//             //     console.log('RESULT FROM SANITY: ', res)
//             // })

//         }
//         callback(null, {
//             statusCode: 200
//         })
//         return { statusCode: 200, 
//             body: JSON.stringify({ responseMovebank }) 
//         };

    
//     } catch (error) {
//         console.log(error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: 'Failed fetching data' }),
//         };
//     }



//   };


// exports.handler = schedule("@hourly", handler);  // schedule every hour