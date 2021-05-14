const express = require('express')
require('./db/mongoose') // Makes the connection to the database
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Endpoint: Creating a user
app.post('/users', (req, res) => {
  const user = new User(req.body)

  user.save().then(() => {
    res.status(201).send(user)
  }).catch((e) => {
    res.status(400).send(e)
  })
})

// Endpoint: Reading all users
app.get('/users', (req, res) => {
  User.find({}).then((users) => {
    res.send(users)
  }).catch((e) => {
    res.status(500).send()
  })
})

// Endpoint: Reading a user by id
app.get('/users/:id', (req, res) => {
  const _id = req.params.id
  
  User.findById(_id).then((user) => {
    if (!user) { 
      return res.status(404).send()
    }
    
    res.send(user)
  }).catch((e) => {
    res.status(500).send()
  })
})

// Enpoint: Creating a task
app.post('/tasks', (req, res) => {
  const task = new Task(req.body)
  
  task.save().then(() => {
    res.status(201).send(task)
  }).catch((e) => {
    res.status(400).send(e)
  })
})

// Endpoint: Reading all tasks
app.get('/tasks', (req, res) => {
  Task.find({}).then((tasks) => {
    res.send(tasks)
  }).catch((e) => {
    res.status(500).send()
  })
})

// Endpoint: Reading a task by id
app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id

  Task.findOne({ _id: _id }).then((task) => {

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  }).catch((e) => {
    res.status(500).send()
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})