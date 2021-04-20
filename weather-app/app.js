const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const log = console.log

geocode('Innsbruck', (error, data) => {
  log('Data:', data)
  log('Error:', error)
})

forecast(47.26667, 11.38333, (error, data) => {
  log('Data:', data)
  log('Error:', error)
})