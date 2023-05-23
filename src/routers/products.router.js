const { Router } = require('express')
const { uploader } = require('../utils/multer')
const ProductManager = require('../dao/fileSystem/productsManager')
const { dirname } = require('path')
const { auth } = require('../middlewares/auth.middlewares')

const router = Router()
const productsList = new ProductManager(`${dirname(__dirname)}/db/products.json`)
const notFound = { status: 'error', error: "Product not found" }

router.get("/", auth, async (req, res) => {
    try {
        const limit = req.query.limit
        const products = await productsList.getProducts(limit)
        res.status(200).send({ status: 'success', payload: products })
    } catch (error) {
        return []
    }
})
router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const product = await productsList.getProductById(parseInt(pid))
        !product ?
            res.status(404).send(notFound)
            :
            res.status(200).send({ status: 'success', payload: product })
    } catch (error) {
        return notFound
    }
})
router.post("/", async (req, res) => {
    try {
        const product = req.body
        const addedProduct = await productsList.addProduct(product)
        !addedProduct
            ? res.status(400).send({ error: "Could not add product" })
            : res.status(201).send({ status: 'success', payload: product })
    } catch (error) {
        return { status: 'error', error }
    }
})
router.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const modification = req.body
        const modifiedProduct = await productsList.updateProduct(
            parseInt(pid),
            modification
        )
        !modifiedProduct
            ? res.status(400).send({ error: `Could not modify product` })
            : res.status(200).send({ status: 'success', payload: modifiedProduct })
    } catch (error) {
        return { notFound }
    }
})
router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const removedProduct = await productsList.deleteById(parseInt(pid))
        !removedProduct
            ? res.status(200).send({ status: 'success', message: 'product removed' })
            : res.status(404).send(notFound)
    } catch (error) {
        return { status: 'error', error }
    }
})
//  form desde el front
router.post('/formulario', uploader.single('thumbnail'), async (req, res) => {
    try {
        const product = req.body
        const imagePath = req.file.path
        const imageName = req.file.filename
        const addedProduct = await productsList.addProduct(product, imagePath)
        !addedProduct
            ? res.status(400).send({ error: "Could not add product" })
            : res.status(201).send({ status: 'success', payload: addedProduct })
    } catch (error) {
        return { status: 'error', error }
    }
})
module.exports = router