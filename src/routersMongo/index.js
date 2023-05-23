const { Router } = require('express')
const productsRouter = require('./products.router.js')
const usersRouter = require('./users.router.js')
const cartsRouter = require('./carts.router.js')
const viewRouterMongo = require('./views.router.mongo.js')
const sessionRouter = require('./session.router.js')

const router = Router()



router.use('/productsMongo', productsRouter)
// router.use('/usersMongo', usersRouter)
router.use('/cartsMongo', cartsRouter)
router.use('/usersMongo', sessionRouter)


module.exports = router