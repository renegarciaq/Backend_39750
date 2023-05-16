const {Router} = require('express')
const {dirname} = require('path')
const ProductManager = require('../dao/fileSystem/productsManager')
const UsersManager = require('../dao/fileSystem/usersManager')
const chatManager = require('../dao/mongoDb/chat.mongo')


const router = Router()
const productsList = new ProductManager(dirname(__dirname) +'/db/products.json')
const userList = new UsersManager(dirname(__dirname) +'/db/users.json')

router.get('/', async (req, res) => {
    const limit = req.query.limit
    const products = await productsList.getProducts(limit)
    const objeto = {
        styled: "main.css",
        title: "PRODUCTS LIST",
        products
    }
    res.render('index', objeto)

})
router.get('/realTimeProducts', async (req, res) => {
    const limit = req.query.limit
    const products = await productsList.getProducts(limit)
    const data = {
        style: "styleProd.css",
        title: "PRODUCTS LIST",
        products
    }
    res.render('realTimeProducts', data)
})
router.get('/users', async (req, res) => {
    const users = await userList.getUsers()
    console.log(users);
    const data = {
        style: "styleProd.css",
        title: "PRODUCTS LIST",
        users
    }
    res.render('users', data)
})
router.get('/chat', async (req, res) => {
    const messages = await chatManager.getMessages()
    const data = {
        style: 'chat.css',
        messages
    }
    console.log('log message linea 50', data)
    res.render('chat', data)
})

module.exports = router