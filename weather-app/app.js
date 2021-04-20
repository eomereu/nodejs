const request = require('request')
const geocode = require('./utils/geocode')
const log = console.log

// Weather
// const url = 'http://api.weatherstack.com/current?&access_key=775e4c063b64198f98ab8aed99a1e566&query=48.2082,16.3738'

// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     log("Unable to connect to weather service!")
//   } else if (response.body.error) {
//     console.log(response.body.error.info)
//   } else {
//     log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " degrees out.")
//   }
// })


// Geocoding
// Address -> Lat/Long -> Weather
// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZW9tZXJldSIsImEiOiJja25rd3R6ZWgwOWt1Mm5wcjIwcmVzNnZ5In0.RkkSfwuQvNE1eSmjc8Q7kA&limit=1'

// request({ url: geocodeURL, json: true}, (error, response) => {
//   if (error) {
//     log("Unable to connect to location service!")
//   } else if (response.body.message) {
//     log("No search term given!")
//   } else if (response.body.features.length === 0) {
//     log("Unable to find the place. Try another search!")
//   } else {
//     const latitude = response.body.features[0].center[1]
//     const longtitude = response.body.features[0].center[0]
//     log(latitude + "," + longtitude)
//   }
// })



geocode('Innsbruck', (error, data) => {
  log('Error:', error)
  log('Data:', data)
})