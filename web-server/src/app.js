const express = require('express')

// create the server
const app = express()

//app.com
app.get('', (req, res) => {
  res.send('<h2>Hello</h2>')
})

//app.com/help
app.get('/help', (req, res) => {
  res.send([{
    name: 'Omer'
  },{
    name: 'Erol'
  }])
})

//app.com/about
app.get('/about', (req, res) => {
  res.send('<h3>Weather</h3>')
})

//app.com/weather
app.get('/weather', (req, res) => {
  res.send({
    forecast: 'Sunny',
    location: 'Wien'
  })
})

// start the server
app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})