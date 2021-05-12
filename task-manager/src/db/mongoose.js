const mongoose = require('mongoose')

// Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

//
//
//
// const Task = mongoose.model('Task', {
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     required: false,
//     default: false,
//   }
// })

// cleanRoom.save().then(() => {
//   console.log(cleanRoom)
// }).catch((error) => {
//   console.log('Error!', error)
// })