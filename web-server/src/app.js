const path = require('path')
const express = require('express')
const hbs = require('hbs')

// Create Express application
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

var date = new Date()

app.get('', (req, res) => {
  res.render('index', {
    title: 'Homepage',
    header: 'Weather App',
    creator: 'E.Omer EROL',
    date
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    header: 'About Us',
    date
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    header: 'Help Desk',
    helpText: 'So how can we help you?',
    date
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