const { Router } = require('express')
const userManager = require('../dao/mongoDb/users.mongo')

const router = Router()


router.get('/', async (req, res) => {
    try {
        const users = await userManager.getUsers()
        res.status(200).send({
            status: 'success',
            payload: users
        })
    } catch (error) {
        return console.log(error)
    }
})
router.get('/:uid', async (req, res) => {
    try {
        const { uid } = req.params
        let user = await userManager.getUserById(uid)
        res.status(200).send({
            status: 'success',
            payload: user
        })
    } catch (error) {
        return console.log(error);
    }
})
router.post('/', async (req, res) => {
    try {
        const newUser = req.body
        let result = await userManager.addUser(newUser)
        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        return console.log(error)
    }
})
router.put('/:uid', async (req, res) => {
    try {
        const { uid } = req.params
        const data = req.body
        let result = await userManager.updateUser({ _id: uid }, data)
        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        return console.log(error)
    }
})
router.delete('/:uid', async (req, res) => {
    try {
        const { uid } = req.params
        let result = await userManager.deleteUser(uid)
        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        return console.log(error)
    }
})


module.exports = router