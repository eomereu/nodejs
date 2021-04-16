const request = require('request')
const log = console.log

const url = 'http://api.weatherstack.com/current?&access_key=775e4c063b64198f98ab8aed99a1e566&query=48.2082,16.3738'

request({ url: url, json: true }, (error, response) => {
    log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " degrees out.")
})