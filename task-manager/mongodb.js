const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())
console.log(id.id)
console.log(id.id.length)
console.log(id.toHexString())
console.log(id.toHexString().length)

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!')
  }

  const db = client.db(databaseName)

  db.collection('users').insertOne({
    _id: id,
    name: 'Mehmet',
    age: 18
  }, (error, result) => {
    if(error) {
      return console.log('Unable to insert user!')
    }

    console.log(result.ops)
    console.log(result.insertedCount)
  })

  db.collection('users').insertMany([
    {
      name: 'Ali',
      age: 22
    },
    {
      name: 'Veli',
      age: 28
    }
  ], (error, result) => {
    if(error) {
      return console.log('Unable to insert documents!')
    }

    console.log(result.ops)
    console.log(result.insertedCount)
  })

  db.collection('tasks').insertMany([
    {
      description: 'Arrange an appointment',
      completed: true
    },
    {
      description: 'Write down important stuff',
      completed: true
    },
    {
      description: 'Make an announcement of the decisions',
      completed: false
    }
  ], (error, result) => {
    if(error){
      return console.log('Unable to insert tasks!')
    }

    console.log(result.ops)
    console.log(result.insertedIds)
  })
})