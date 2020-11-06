const fs = require('fs')

fs.writeFileSync('notes.txt', 'This file was created by Node.js!')

/*First challange:*/
fs.appendFileSync('notes.txt', ' This is how it\'s appended...')
/* ---E--- */
/* ---N--- */
/* ---D--- */

const add = require('./utils.js')
const sum = add(4, -2)
console.log(sum)
/* ---E--- */
/* ---N--- */
/* ---D--- */


/*Challange*/
const getName = require('./notes.js')
const msg = getName()
console.log(msg)
/* ---E--- */
/* ---N--- */
/* ---D--- */