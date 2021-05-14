require('../src/db/mongoose')
const User = require('../src/models/user')

// 609c005ed33a7584937247fc
// 609a9ae7cac38b46a572c1db

User.findByIdAndUpdate('609a9ae7cac38b46a572c1db', { age: 1 }).then((user) => {
  console.log(user)
  return User.countDocuments({ age: 1 })
}).then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e)
})