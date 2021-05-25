const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

// Task Model
//
// Enpoint: Create a task
router.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Endpoint: Read all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (e) {
    res.status(500).send()
  }
})

// Endpoint: Read a task by id
router.get('/tasks/:id', async (req, res) => {
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

// Enpoint: Update a task
router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = Object.keys(Task.schema.obj)
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    const task = await Task.findById(req.params.id)
    updates.forEach((update) => task[update] = req.body[update])
    await task.save()
    if (!task) {
      return res.status(404).send({ error: 'Task not found!' })
    }
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Endpoint: Delete a task
router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router