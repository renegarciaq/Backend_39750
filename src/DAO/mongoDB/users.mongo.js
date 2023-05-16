const { userModel } = require('./model/users.model')


class UserManagerMongo {
  getUsers = async () => {
    try {
      return await userModel.find({})
    } catch (error) {
      return new Error(error)
    }
  }
  getUserById = async (uid) => {
    try {
      return await userModel.findById({ _id: uid })
    } catch (error) {
      return new Error(error)
    }
  }
  addUser = async (newUser) => {
    try {
      return await userModel.create(newUser)
    } catch (error) {
      return new Error(error)
    }
  }
  async updateUser(uid, data) {
    try {
      return await userModel.findByIdAndUpdate(uid, data)
    } catch (error) {
      return new Error(error)
    }
  }
  async deleteUser(uid) {
    try {
      return await userModel.findByIdAndDelete({ _id: uid })
    } catch (error) {
      return new Error(error)
    }
  }
}

module.exports = new UserManagerMongo