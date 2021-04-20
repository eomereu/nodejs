const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const log = console.log

const address = process.argv[2]

geocode(address, (error, data) => {
  if(!address) {
    return log('Please provide a place name!\nEx:\n$ node app.js Wien')
  }
  
  if (error) {
    return log(error)
  }
  
  forecast(data.latitude, data.longtitude, (error, forecastData) => {
    if(error) {
      return log(error)
    }

    log(data.location)
    log(forecastData)
  })
})