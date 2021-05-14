require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('609a9e7cb9290649c17ed69d').then((task) => {
  console.log(task)
  return Task.countDocuments({ completed: false })
}).then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e)
})