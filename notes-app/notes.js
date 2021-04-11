const fs = require('fs')
const chalk = require('chalk')
const log = console.log

const getNotes = () => {
  return "Your notes..."
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter((note) => note.title === title)
  
  if(duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    log(chalk.green('Note added!'))
  } else {
    log(chalk.red('Note title already taken!'))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)
  if(notes.length === notesToKeep.length) {
    log(chalk.red.inverse('Note with the given title doesn\'t exist. No note deleted!'))
  } else {
    log(chalk.green.inverse('Note with title: \"' + title + '\" deleted!'))
    saveNotes(notesToKeep)
  }
}

const listNotes = () => {
  const notes = loadNotes()
  log(chalk.bgBlue('Your notes:'))
  notes.forEach((note) => {
    log(note.title)
  });
}

/* Inside Used Functions */
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(e) {
    return []
  }
}

const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', notesJSON)
}

module.exports = {
  getNotes: getNotes,
  listNotes: listNotes,
  addNote: addNote,
  removeNote: removeNote
}