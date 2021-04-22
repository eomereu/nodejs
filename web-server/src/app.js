const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')

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

// start the server
app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})