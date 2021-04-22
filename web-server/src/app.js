const path = require('path')
const express = require('express')

// Create Express application
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Homepage',
    header: 'Weather App',
    creator: 'E.Omer EROL'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    header: 'About Us',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    header: 'Help Desk',
    helpText: 'So how can we help you?'
  })
})

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'Sunny',
    location: 'Wien'
  })
})

// Start the server
app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})