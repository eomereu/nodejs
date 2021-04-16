const request = require('request')
const log = console.log

const url = 'http://api.weatherstack.com/current?access_key=775e4c063b64198f98ab8aed99a1e566&query=48.2082,16.3738'

request({ url: url }, (error, response) => {
    const data = JSON.parse(response.body)
    log(data)
    log(data.current)
})