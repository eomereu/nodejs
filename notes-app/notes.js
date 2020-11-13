const fs = require('fs')
const log = console.log

const getNotes = function() {
  return "Your notes..."
}

const addNote = function(title, body){
  const notes = loadNotes()
  const duplicateNotes = notes.filter(function(note) {
    return note.title === title
  })

  if(duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    log('Note successfully added!')
  } else {
    log('Note title already taken!')
  }
}

const loadNotes = function(){
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(e) {
    return []
  }
}

const saveNotes = function(notes){
  const notesJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', notesJSON)
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote
}