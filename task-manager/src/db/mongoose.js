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
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value){
      if (validator.contains(value.toLowerCase(),'password')) {
        throw new Error('Password may not contain \"password\"')
      }
    }
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

// Create an instance of the model
const me = new User({
  name: '    Omer',
  email: 'MYEMAIL@EOE.IO    ',
  password: '1PASSWORD23456'
})

// Save to database
me.save().then(() => {
  console.log(me)
}).catch((error) => {
  console.log('Error!', error)
})

//
//
//
const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    required: false,
    default: false,
  }
})

const cleanRoom = new Task({
  description: "   Redundant work                ",
})


cleanRoom.save().then(() => {
  console.log(cleanRoom)
}).catch((error) => {
  console.log('Error!', error)
})