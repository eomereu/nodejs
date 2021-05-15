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

const deleteTaskAndCount = async (_id) => {
  await Task.findOneAndDelete({ _id })
  const count = await Task.countDocuments({ completed: false })
  return count
}

deleteTaskAndCount('609a9eaa9e1b194a08e53239').then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e)
})