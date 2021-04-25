const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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
var mainBtn = 'nav-link'
var aboutBtn = 'nav-link'

app.get('', (req, res) => {
  res.render('index', {
    title: 'Homepage',
    header: 'Weather App',
    creator: 'E.Omer EROL',
    date,
    mainBtn: 'nav-link active',
    aboutBtn
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    header: 'About Us',
    date,
    mainBtn,
    aboutBtn: 'nav-link active'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    header: 'Help Desk',
    helpText: 'So how can we help you?',
    date,
    mainBtn,
    aboutBtn
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'Please provide an address.'
    })
  }
  geocode(req.query.address, (error, {latitude:lat, longtitude:long, location} = {}) => {
    if(error) {
      return res.send({ error })
    }
    forecast(lat, long, (error, forecastData) => {
      if(error) {
        return res.send({ error })
      }
      return res.send({
        location,
        forecastData
      })
    })
  }) 
})

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a serach term.'
    })
  }

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    header: 'Article Not Found',
    errorMessage: 'The article you are looking for doesn\'t exist. Please choose a valid one',
    date,
    mainBtn,
    aboutBtn
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    header: '404 Page Not Found',
    errorMessage: 'The page you are looking for doesn\'t exist. Please proceed to a valid page',
    date,
    mainBtn,
    aboutBtn
  })
})

// Start the server
app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})