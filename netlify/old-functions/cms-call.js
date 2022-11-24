// # dev mode
// ## start dev mode
// netlify functions:serve
// invoke function in terminal
// netlify functions:invoke scheduled-api-function --port 9999
// invoke function in browser http://localhost:9999/.netlify/functions/cms-call

// import { get } from "axios";

// export async function handler (event, context) {
//     console.log(event);
//     console.log(context);
//     try {
//       const { id } = event.queryStringParameters;
//       const response = await get(`${process.env.TODO_BASE_URL}/${id}`);
//       return {
//         statusCode: 200,
//         body: JSON.stringify({ title: response.data.title }),
//       };
//     } catch (err) {
//       return {
//         statusCode: 404,
//         body: err.toString(),
//       };
//     }
//   }