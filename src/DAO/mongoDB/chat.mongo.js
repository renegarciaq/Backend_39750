const { messageModel } = require('./model/messages.model')

class ChatManager {
  getMessages = async () => {
    try {
      return await messageModel.find({})
    } catch (error) {
      return new Error(error)
    }
  }
  addMessages = async (data) => {
    try {
      await messageModel.create(data)
      return this.getMessages()
    } catch (error) {
      return new Error(error)
    }
  }
}

module.exports = new ChatManager