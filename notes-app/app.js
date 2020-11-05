const fs = require('fs')

fs.writeFileSync('notes.txt', 'This file was created by Node.js!')

/*First challange:*/
fs.appendFileSync('notes.txt', ' This is how it\'s appended...')