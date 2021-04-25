const request = require('request')

const forecast = (lat, long, callback) => {
  const access_key = '8c5d1b5f875e8c854cc6840ee97d8da1'
  const url = 'http://api.weatherstack.com/current?&access_key=' + access_key + '&query=' + lat + ',' + long //+ '&units=f'
  
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined)
    } else if (body.error) {
      callback(body.error.info, undefined)
    } else {
      callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
    }
  })
}

module.exports = forecast