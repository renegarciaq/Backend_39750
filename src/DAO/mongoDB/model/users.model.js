const { Schema, model } = require('mongoose')
// const mongoosePaginate = require('mongoose-paginate-v2') // Not used in this example

const collection = 'users'

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  age: Number,
  address: String,
  gender: String,
  email: {
    type: String,
    unique: true
  }
})

const userModel = model(collection, userSchema)

module.exports = {
  userModel
}