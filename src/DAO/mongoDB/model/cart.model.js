const { Schema, model } = require('mongoose')

const collection = 'carts'

const cartsSchema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number },
    },
  ],
})

const cartsModel = model(collection, cartsSchema)

module.exports = cartsModel