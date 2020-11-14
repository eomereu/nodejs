const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
const log = console.log

yargs.version('5.2.0')

// Create add command
yargs.command({
  command: 'add',
  describe: 'Adds a new note',
  builder: { /*contains objects of options*/
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note content',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.addNote(argv.title, argv.body)
    //log('Note successfully added!', '\nTitle:', argv.title, '\nBody:', argv.body)
  }
})

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Removes a specified note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.removeNote(argv.title)
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

yargs.parse()