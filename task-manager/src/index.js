const express = require('express')
require('./db/mongoose') // Makes the connection to the database
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// User Model
//
// Endpoint: Create a user
app.post('/users', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Endpoint: Read all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})

// Endpoint: Read a user by id
app.get('/users/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const user = await User.findById(_id)
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

// Enpoint: Update a user
app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = Object.keys(User.schema.obj)
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  console.log(updates)

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates!' })
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!user) {
      return res.status(404).send({ error: 'User not found!' })
    }
    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Endpoint: Delete a user
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).send( { error: 'User not found!' } )
    }
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})






// Task Model
//
// Enpoint: Create a task
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Endpoint: Read all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (e) {
    res.status(500).send()
  }
})

// Endpoint: Read a task by id
app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findOne({ _id })
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})

// Enpoint: Update a task
app.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = Object.keys(Task.schema.obj)
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!task) {
      return res.status(404).send({ error: 'Task not found!' })
    }
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Endpoint: Delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) {
      return res.status(404).send({ error: 'Task not found!' })
    }
    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})