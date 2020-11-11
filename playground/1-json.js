const fs = require('fs')
const log = console.log

// Challange
// 1. Load and parse the JSON data
const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const user = JSON.parse(dataJSON)

// 2. Change the name and age property using your info
user.name = "Omer"
user.age = 24

// 3. Stringify the changed object and overwrite original data
const userJSON = JSON.stringify(user)
fs.writeFileSync('1-json.json', userJSON)

// 4. Test your work by viewing data in the JSON file
// DONE!