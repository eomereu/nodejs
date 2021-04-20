setTimeout(() => {
  console.log('Two and a half seconds are up!')
}, 2500)

const names = ['Andrew', 'Jen', 'Jess']
const shortNames = names.filter((name) => name.length <=4)

const geocode = (address, callback) => {
  setTimeout(() => {
    const location = {
      latitude: 0,
      longtitude: 0
    }
    callback(location)
  }, 1500)
}

geocode('Wien', (data) => {
  console.log(data)
})

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

add = (a, b, callback) => {
  setTimeout(() => {
    const sum = a + b
    callback(sum)
  }, 2000)
}

add(1, 4, (sum) => {
  console.log(sum) // Should print: 5
})