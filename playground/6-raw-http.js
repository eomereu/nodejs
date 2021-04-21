const http = require('http')
const url = 'http://api.weatherstack.com/current?&access_key=8c5d1b5f875e8c854cc6840ee97d8da1&query=48.2082,16.3738'

const request = http.request(url, (response) => {
  let data = ''

  response.on('data', (chunk) => {
    data = data + chunk.toString()
  })

  response.on('end', () => {
    const body = JSON.parse(data)
    console.log(body)
  })

})

request.on('error', (error) => {
  console.log('An error', error)
})

request.end()