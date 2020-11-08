const validator = require('validator')

const getName = require('./notes.js')
const msg = getName()
console.log(msg)

console.log(validator.isEmail('a@b.com'))
console.log(validator.isURL('htp/ab.com'))