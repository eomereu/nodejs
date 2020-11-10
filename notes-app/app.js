const chalk = require('chalk')
const yargs = require('yargs')
const getNotes = require('./notes.js')

// Customize yargs version
const log = console.log

yargs.version('5.2.0')

// Create add command
yargs.command({
  command: 'add',
  describe: 'Adds a new note',
  handler: function() {
    log('Adding the note!')
  }
})

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Removes a specified note',
  handler: function() {
    log('Note successfully removed!')
  }
})

// Create list command
yargs.command({
  command: 'list',
  describe: 'Lists all existing notes',
  handler: function() {
    log('Here are your notes:')
  }
})

// Create read command
yargs.command({
  command: 'read',
  describe: 'Shows a specified note',
  handler: function() {
    log('Here is your note,')
  }
})

log(yargs.argv)