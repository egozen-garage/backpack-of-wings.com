// # dev mode
// ## start dev mode
// netlify functions:serve
// invoke function in terminal
// netlify functions:invoke scheduled-movebank-daily-entries --port 9999
// invoke function in browser http://localhost:9999/.netlify/functions/scheduled-movebank-daily-entries


const sanityClient = require('@sanity/client')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { schedule } = require('@netlify/functions');


const projectId = process.env.REACT_APP_SANITY_DATABASE_PROJECT_ID
const dataset = process.env.REACT_APP_SANITY_MAIN_DATABASE_NAME
const apiVersion = process.env.REACT_APP_SANITY_API_VERSION
const token = process.env.REACT_APP_SANITY_WRITE_SERVERSIDE

const client = sanityClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion,
  token: token
})


// Movebank base URL
// const movebankBaseURL = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&sensor_type=gps'
const apiMonthlyData = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&event_reduction_profile=EURING_03';






const handler = async (event, context, callback) => {
// exports.handler = async (event, context, callback) => {
    try {
        // 1. Check last location entry in Sanity           --> query timestamp
        const response = await client.fetch(
            `*[_type == "movebankDaily"]{
                location[0]{timestamp}
            }[0]`
        )
        const lastSanityEntryOfMovebank = await response
        // const lastTimestamp = lastSanityEntryOfMovebank[0].location.timestamp + 1
        const lastTimestamp = lastSanityEntryOfMovebank.location.timestamp + 1
        // console.log("last santiy entry. timestamp: ", lastTimestamp)
        // console.log("--------------------------------")

        // 2. Fetch Movebank Monthly Data
        const responseMovebank = await fetch(apiMonthlyData)
        const monthlyData = await responseMovebank.json()
        const monthlyLocations = monthlyData.individuals[0].locations

        const mutations = []
        let counter = 0
        // const newData = []
        // for each location bigger than last entry
        for(const x in monthlyLocations){
            // console.log("new timestamp: " + monthlyLocations[x].timestamp)
            if(lastTimestamp < monthlyLocations[x].timestamp){
                counter = counter + 1
                // console.log("add new data entry")
                const timestamp = monthlyLocations[x].timestamp
                const longitude = monthlyLocations[x].location_long
                const latitude = monthlyLocations[x].location_lat
                const newLocation = {
                    "_type": "locationEntry",
                    "_key": timestamp,
                    "timestamp": timestamp,
                    "longitude": longitude,
                    "latitude": latitude,
                }
                // newData.unshift(newLocation)
                const patch = {
                    patch: {
                        "id" : "edba8f30-d0aa-41a5-9e52-0ba061d91874", // id of Movebank document with locations
                        "insert": {
                          "before": "location[0]",
                          "items": [newLocation]
                        }
                      }
                }
                mutations.push(patch)
            }
        }



        // 4. Post patches to Sanity
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
                    

        console.log("The function registrated " + counter + " new locations")
        return { 
            statusCode: 200, 
            body: JSON.stringify({ newLocations: counter })
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed fetching data' }),
        };
    }

};


exports.handler = schedule("@hourly", handler);