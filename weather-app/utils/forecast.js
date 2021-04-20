const request = require('request')

const forecast = (lat, long, callback) => {
  const access_key = '775e4c063b64198f98ab8aed99a1e566'
  const url = 'http://api.weatherstack.com/current?&access_key=' + access_key + '&query=' + lat + ',' + long //+ '&units=f'
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined)
    } else if (response.body.error) {
      callback(response.body.error.info, undefined)
    } else {
      callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " degrees out.")
    }
  })
}

module.exports = forecast