// # dev mode
// ## start dev mode
// netlify functions:serve
// invoke function in terminal
// netlify functions:invoke scheduled-api-function --port 9999
// invoke function in browser http://localhost:9999/.netlify/functions/add-story-to-cms

const sanityClient = require('@sanity/client')
const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_DATABASE_PROJECT_ID,
    dataset: process.env.REACT_APP_SANITY_MAIN_DATABASE_NAME,
    apiVersion: '2022-10-14',
    token: process.env.REACT_APP_SANITY_WRITE_SERVERSIDE
})

exports.handler = async (event, context, callback) => {
  // create timestamp
  var today = new Date().toISOString();
  // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // var dateTime = date+' '+time;

  // Pulling out the payload from the body
  const urlParams = new URLSearchParams(event.body); // event.body -> 'abc=foo&def=%5Basf%5D&xyz=5'
  const payload = Object.fromEntries(urlParams); // {abc: "foo", def: "[asf]", xyz: "5"}

  // Checking which form has been submitted
  const isStoryForm = payload.formID === "story-form";

  var response = null;
  // Build the document JSON and submit it to SANITY
  if (isStoryForm) {
    // let response = null;
    const storyData = {
      _type: "story",
      landmark: payload.landmarkName,
      name: payload.name,
      email: payload.email,
      message: payload.message,
      publishedAt: today,
    }
    client.create(storyData)
    .then((res) => {
        // console.log("Story Input Form Response: " + JSON.stringify(res))
      // console.log(`story was created`)
      response = res._id
    })
  }
  // response = "hi"
  
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ storyId: response})
  })


  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({ message: "Hello World" }),
  // };
}