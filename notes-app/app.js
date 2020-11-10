const chalk = require('chalk')
const getNotes = require('./notes.js')

const log = console.log
const command = process.argv[2]

if (command === 'add') {
  log('Adding note!')
} else if (command === 'remove') {
  log('Removing note!')
}