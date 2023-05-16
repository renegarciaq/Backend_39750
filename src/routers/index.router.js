const { Router } = require('express')
const products = require('./products.router')
const carts = require('./cart.router')
const users = require('./users.router')
const imgMulter = require('./multer.router')

const router = Router()

router.use("/products", products)
router.use("/carts", carts)
router.use("/", imgMulter)
router.use("/users", users)



module.exports = router