const express = require('express')
const multer = require('multer')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// User Model
//
// Endpoint: Create a user
router.post('/users', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

// Enpoint: Log in a user
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

// Endpoint: Log out a user
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})

// Endpoint: Log out from all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})

// Endpoint: Read all users
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})

// Endpoint: Read profile
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

// Endpoint: Read a user by id
// NO MORE NEEDED / MAKES NO SENSE ANY MORE / MAYBE LATER FOR ADMINS
// router.get('/users/:id', async (req, res) => {
//   const _id = req.params.id
//   try {
//     const user = await User.findById(_id)
//     if (!user) {
//       return res.status(404).send()
//     }
//     res.send(user)
//   } catch (e) {
//     res.status(500).send(e)
//   }
// })

// Enpoint: Update profile
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = Object.keys(User.schema.obj)
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  console.log(updates)

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates!' })
  }

  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()
    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Enpoint: Update a user
// NO MORE NEEDED / MAKES NO SENSE ANY MORE / MAYBE LATER FOR ADMINS
// router.patch('/users/:id', async (req, res) => {
//   const updates = Object.keys(req.body)
//   const allowedUpdates = Object.keys(User.schema.obj)
//   const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//   console.log(updates)

//   if (!isValidOperation) {
//     return res.status(400).send({ error: 'Invalid Updates!' })
//   }

//   try {
//     /*In order to make use of Middleware by preventing .findByIdAndUpdate bypass Mongoose
//       following line is replaced by the following three lines!*/
//     // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//     const user = await User.findById(req.params.id)
//     updates.forEach((update) => user[update] = req.body[update])
//     await user.save()

//     if (!user) {
//       return res.status(404).send({ error: 'User not found!' })
//     }
//     res.send(user)
//   } catch (e) {
//     res.status(400).send(e)
//   }
// })

// Endpoint: Delete profile
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

// Endpoint: Delete a user
// NO MORE NEEDED / MAKES NO SENSE ANY MORE / MAYBE LATER FOR ADMINS
// router.delete('/users/:id', auth, async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id)
//     if (!user) {
//       return res.status(404).send( { error: 'User not found!' } )
//     }
//     res.send(user)
//   } catch (e) {
//     res.status(500).send(e)
//   }
// })

// Endpoint: Upload profile picture
const upload = multer({
  dest:'avatars'
})

router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
  res.send().status(200)
})

module.exports = router