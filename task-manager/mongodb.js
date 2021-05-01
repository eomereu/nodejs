// CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!')
  }

  const db = client.db(databaseName)

  db.collection('users').insertOne({
    name: 'Omer',
    age: 25
  }, (error, result) => {
    if(error) {
      return console.log('Unable to insert user!')
    }

    console.log(result.ops)
    console.log(result.insertedCount)
  })

  // db.collection('users').insertMany([
  //   {
  //     name: 'Ali',
  //     age: 22
  //   },
  //   {
  //     name: 'Veli',
  //     age: 28
  //   }
  // ], (error, result) => {
  //   if(error) {
  //     return console.log('Unable to insert documents!')
  //   }

  //   console.log(result.ops)
  //   console.log(result.insertedCount)
  // })

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