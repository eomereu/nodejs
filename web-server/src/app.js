const express = require('express')

// create the server
const app = express()

//app.com
app.get('', (req, res) => {
    res.send('Hello express!')
})

//app.com/help
app.get('/help', (req, res) => {
    res.send('Help page')
})

//app.com/about
app.get('/about', (req, res) => {
    res.send('About us')
})

//app.com/weather
app.get('/weather', (req, res) => {
    res.send('Coming soon...')
})

// start the server
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})