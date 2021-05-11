const mongoose = require('mongoose')
const validator = require('validator')

// Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

// Create model
const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
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
  name: '    Omer',
  email: 'MYEMAIL@EOE.IO    '
})

const cleanRoom = new Task({
  description: "Clean the room",
  completed: false
})

// Save to database
me.save().then(() => {
  console.log(me)
}).catch((error) => {
  console.log('Error!', error)
})

cleanRoom.save().then(() => {
  console.log(cleanRoom)
}).catch((error) => {
  console.log('Error!', error)
})