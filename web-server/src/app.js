const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { isAbsolute } = require('path')

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
  res.send({
    forecast: 'Sunny',
    location: 'Wien'
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