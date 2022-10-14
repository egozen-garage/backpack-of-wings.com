// # dev mode
// ## start dev mode
// netlify functions:serve
// invoke function in terminal
// netlify functions:invoke scheduled-api-function --port 9999
// invoke function in browser http://localhost:9999/.netlify/functions/add-story-to-cms

// const bodyParser = require('body-parser')
const sanityClient = require('@sanity/client')
const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_DATABASE_PROJECT_ID,
    dataset: process.env.REACT_APP_SANITY_MAIN_DATABASE_NAME,
    apiVersion: '2022-10-14',
    token: process.env.REACT_APP_SANITY_WRITE_SERVERSIDE
})


// function paramsToObject(entries) {
//   const result = {}
//   for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
//     result[key] = value;
//   }
//   return result;
// }

exports.handler = async (event, context, callback) => {
  // create timestamp
  // var today = new Date();
  // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // var dateTime = date+' '+time;

  
  const urlParams = new URLSearchParams(event.body); // event.body -> 'abc=foo&def=%5Basf%5D&xyz=5'
  // const entries = urlParams.entries(); //returns an iterator of decoded [key,value] tuples
  // const params = paramsToObject(entries); //{abc:"foo",def:"[asf]",xyz:"5"}
  const payload = Object.fromEntries(urlParams); // {abc: "foo", def: "[asf]", xyz: "5"}

  console.log("event.body: " + event.body )
  console.log("event.body params: " + JSON.stringify(payload) )
  console.log("event.body .formID: " + payload.formID )  

  // Pulling out the payload from the body
  // const { payload } = JSON.parse(params)
  //   const { payload } = JSON.parse(JSON.stringify(event.body))
  //   const { payload } = event.body

  // Checking which form has been submitted
  const isStoryForm = payload.formId === "story-form";

  // Build the document JSON and submit it to SANITY
  if (isStoryForm) {
    console.log("story form accepted");
    const storyData = {
      _type: "story",
      name: payload.name,
      email: payload.email,
      message: payload.message,
    //   publishedAt: dateTime,
    }


      // const result = await client.create(storyData)
      // // .catch((err) => console.log(err))
      // .then((res) => {
      //   // you can see this in the Netlify function logs
      //   console.log('RESULT FROM SANITY: ', res)
      // })

      client.create(storyData).then((res) => {
        console.log(`story was created`)
      })
  }

  callback(null, {
    statusCode: 200,
  })
}