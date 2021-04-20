const request = require('request')

const geocode = (address, callback) => {
  const access_token = 'pk.eyJ1IjoiZW9tZXJldSIsImEiOiJja25reWNoZWcwMWw1Mm9uenJ0Z3g0cHE2In0.SpFur0HjVBusAJmXhK3JSw'
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + access_token + '&limit=1'

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location service!", undefined)
    } else if (response.body.message) {
      callback("No search term given!\nPS: If you are getting this error, although a serach term already given, then please check your access token!", undefined)
    } else if (response.body.features.length === 0) {
      callback("Unable to find the place. Try another search!", undefined)
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longtitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      })
    }
  })
}

module.exports = geocode