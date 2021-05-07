// setTimeout(() => {
//   console.log('Two and a half seconds are up!')
// }, 2500)

// const names = ['Andrew', 'Jen', 'Jess']
// const shortNames = names.filter((name) => name.length <=4)

// const geocode = (address, callback) => {
//   setTimeout(() => {
//     const location = {
//       latitude: 0,
//       longtitude: 0
//     }
//     callback(location)
//   }, 1500)
// }

// geocode('Wien', (data) => {
//   console.log(data)
// })

// add = (a, b, callback) => {
//   setTimeout(() => {
//     const sum = a + b
//     callback(sum)
//   }, 2000)
// }

// add(1, 4, (sum) => {
//   console.log(sum) // Should print: 5
// })

const doWorkCallback = (callback) => {
  setTimeout(() => {
    //callback('This is my error!', undefined)
    callback(undefined, [1, 4, 7])
  }, 2000)
}

doWorkCallback((error, result) => {
  if (error) {
    return console.log(error)
  }

  console.log(result)
})