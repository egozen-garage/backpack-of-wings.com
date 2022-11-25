// # dev mode
// ## start dev mode
// netlify functions:serve
// invoke function in terminal
// netlify functions:invoke delete --port 9999
// invoke function in browser http://localhost:9999/.netlify/functions/delete


const sanityClient = require('@sanity/client')
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// const { schedule } = require('@netlify/functions');


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




exports.handler = async (event, context, callback) => {


    client.delete({
        query: `*[_type == "movebank"]`
    })

}