// import weatherData from './weatherData.json';

const express = require('express')
const app = express()
const weatherData = require('./weatherData.json')

const schedule = require('node-schedule')

let counter = 0;
// At recurrent intervals
// run every hour - for more schedule code go to https://crontab.guru/every-hour
// schedule.scheduleJob('0 * * * *', () => {
// for testing ever 2 seconds
// schedule.scheduleJob('*/30 * * * * *', () => {
//     counter = counter + 1;
//     weatherData.weather.push(counter)
//     console.log("I ran.... counter is: " + counter)
// })
 


app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"] })
})

app.listen(5000, () => { console.log("Server started on port 5000")})