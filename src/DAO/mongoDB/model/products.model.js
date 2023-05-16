const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const collection = 'products'

const productSchema = new Schema({
  code: { type: String, required: true, unique: true },
  status: { type: Boolean, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
})
productSchema.plugin(mongoosePaginate)

const productsModel = model(collection, productSchema)

module.exports = {
  productsModel
}