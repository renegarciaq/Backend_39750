const { Router } = require('express')
const UserManager = require('../dao/fileSystem/usersManager')
const { dirname } = require('path')
const { auth } = require('../middlewares/auth.middlewares')

const router = Router()
const usersList = new UserManager(`${dirname(__dirname)}/db/users.json`)

router.get('/', auth, async (req, res) => {
    try {
        const users = await usersList.getUsers()
        console.log(users);
        res.send(users)
    } catch (error) {
        console.log(error);
    }
})
router.get("/:uid", async (req, res) => {
    try {
        const { uid } = req.params
        const user = await usersList.getUserById(parseInt(uid))
        !user ?
            res.status(404).send({ status: 'error', message: 'User not found' })
            :
            res.status(200).send({ status: 'success', payload: user })
    } catch (error) {
        return { status: 'error', message: 'Not found' }
    }
})
router.post('/', async (req, res) => {
    try {
        const user = req.body
        const newUser = await usersList.createUser(user)
        !newUser
            ? res.status(400).send({ status: 'error', error: 'Could not add user' })
            : res.status(201).send({ status: 'succes', payload: user })
    } catch (error) {
        return { status: 'error', error }
    }
})
router.put("/:uid", async (req, res) => {
    try {
        const { uid } = req.params
        const modification = req.body
        const modifiedUser = await usersList.updateUser(
            parseInt(uid),
            modification
        )
        !modifiedUser
            ? res.status(400).send({ error: `Could not modify product` })
            : res.status(200).send({ status: 'success', payload: modifiedUser })
    } catch (error) {
        return { status: 'error', error }
    }
})



module.exports = router