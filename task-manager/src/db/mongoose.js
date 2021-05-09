const mongoose = require('mongoose')

// Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

// Create model
const User = mongoose.model('User', {
  name: {
    type: String
  },
  age: {
    type: Number
  }
})

const Task = mongoose.model('Task', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
})

// Create an instance of the model
const me = new User({
  name: 'Omer',
  age: 25
})

const cleanRoom = new Task({
  description: "Clean the room",
  completed: false
})

// Save to database
me.save().then(() => {
  console.log(me)
}).catch(() => {
  console.log('Error!', error)
})

cleanRoom.save().then(() => {
  console.log(cleanRoom)
}).catch(() => {
  console.log('Error!', error)
})