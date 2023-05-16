const { Schema, model } = require('mongoose')

const collection = 'messages'

const messagesSchema = new Schema({
  user: String,
  message: String
})

const messageModel = model(collection, messagesSchema)

module.exports = {
  messageModel
}