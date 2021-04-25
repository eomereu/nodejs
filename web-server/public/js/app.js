console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('#weather-form')
const search = document.querySelector('#address')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
  response.json().then((data) => {
    if(data.error) {
      return console.log(data.error)
    }
    console.log(data.location)
    return console.log(data.forecast)
  })
})
})