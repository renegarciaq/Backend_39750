const { Router } = require('express')
const productsRouter = require('./products.router.js')
const usersRouter = require('./users.router.js')
const cartsRouter = require('./carts.router.js')

const router = Router()



router.use('/productsMongo', productsRouter)
router.use('/usersMongo', usersRouter)
router.use('/cartsMongo', cartsRouter)


module.exports = router