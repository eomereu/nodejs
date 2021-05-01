const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

//
// ObjectID
//
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

  //
  // Read
  //
  db.collection('users').findOne({ name: 'Veli' }, (error, user) => {
    if (error) {
      return console.log('Unable to fetch')
    }

    console.log(user)
  })

  db.collection('users').find({ age: 25 }).count((error, count) => {
    if (error) {
      return console.log('Unable to find')
    }

    console.log(count)
  })

  db.collection('tasks').findOne({ _id: new ObjectID("608ccb01e39f643cbe8585f2") }, (error, task) => {
    if (error) {
      return console.log('Unable to find')
    }

    console.log(task)
  })

  db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    if (error) {
      return console.log('Unable to find')
    }

    console.log(tasks)
  })

  //
  // Create
  //
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
    console.log(result.insertedCount)
    console.log(result.insertedIds)
  })
})