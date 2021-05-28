const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
  // create token
  const token = jwt.sign({ _id: 'dummyID' }, 'secretword')
  console.log(token)
  
  // verify token
  const data = jwt.verify(token, 'secretword')
  console.log(data)
}

myFunction()