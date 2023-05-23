const { userModel } = require('./model/users.model')
const { compareData } = require('../../utils/usersHash')


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
  updateUser = async (uid, data) => {
    try {
      return await userModel.findByIdAndUpdate(uid, data)
    } catch (error) {
      return new Error(error)
    }
  }
  deleteUser = async (uid) => {
    try {
      return await userModel.findByIdAndDelete({ _id: uid })
    } catch (error) {
      return new Error(error)
    }
  }

  createUsers = async (user) => {
    try {
      const { email } = user
      const alreadyExist = await userModel.findOne({ email })
      if (!alreadyExist) {
        const newUser = await userModel.create(user)
        return newUser
      } else {
        return new Error('User already exist')
      }
    } catch (error) {
      console.log(`Error creating user: ${error.message}`)
    }
  }

  loginUser = async (email, password) => {
    try {
      const user = await userModel.findOne({ email })
      if (!user) {
        return res.redirect('/loginError')
      }
      const passwordOk = await compareData(password, user.password)
      if (!passwordOk) {
        return res.redirect('/loginError')
      }
      if (user) {
        return user
      } else {
        throw new Error('Invalid username or password')
      }
    } catch (error) {
      console.log(`Error loging user: ${error.message}`)
    }
  }
}

module.exports = new UserManagerMongo