const cartsModel = require('./model/cart.model.js')

class CartManagerMongo {
  createCart = async () => {
    try {
      const cart = await cartsModel.create({})
      return cart
    } catch (error) {
      console.log(`Error creando carrito: ${error.message}`)
    }
  }
  deleteCart = async (id) => {
    try {
      const cart = await this.getById(id)
      if (!cart) {
        throw new Error(`No se encontro carrito con el id solicitado.`)
      } else {
        await cartsModel.findOneAndDelete({ _id: id }, { new: true })
        return "Carrito eliminado correctamente"
      }
    } catch (error) {
      console.log(`Error eliminando el carrito: ${error.message}`)
    }
  }
  getById = async (id) => {
    try {
      const cart = await cartsModel
        .findOne({ _id: id })
        .populate("products.product")
        .lean()
      if (!cart) {
        return { status: 'error', message: 'Carrito no existe' }
      }
      if (cart.products.length === 0) {
        return { status: 'error', message: 'No hay productos en el carrito.' }
      }
      return { status: 'success', data: cart }
    } catch (error) {
      console.log(
        `Error buscando el carrito con el id solicitado: ${error.message}`
      )
    }
  }
  addToCart = async (cid, pid) => {
    try {
      const cart = await cartsModel.findOneAndUpdate(
        { _id: cid, "products.product": pid },
        { $inc: { "products.$.quantity": 1 } },
        { new: true }
      )
      if (!cart) {
        const cart = await cartsModel.findOneAndUpdate(
          { _id: cid },
          { $addToSet: { products: { product: pid, quantity: 1 } } },
          { new: true }
        )
        return cart
      }
      return cart
    } catch (error) {
      console.log(`Error agregando producto al carrito: ${error.message}`)
    }
  }
  deleteProduct = async (cid, pid) => {
    try {
      const cart = await this.getById(cid)
      const quantity = cart.products.find(item => item.product._id).quantity
      if (quantity > 1) {
        const cart = await cartsModel.findOneAndUpdate(
          { _id: cid, "products.product": pid },
          { $set: { "products.$.quantity": quantity - 1 } },
          { new: true }
        )
        return cart
      } else {
        const cart = await cartsModel.findOneAndUpdate(
          { _id: cid },
          { $pull: { "products": { "product": pid } } },
          { new: true }
        )
        return cart;
      }
    } catch (error) {
      console.log(`Error eliminando producto del carrito: ${error.message}`)
    }
  }
  deleteAllProducts = async (id) => {
    try {
      const cart = await cartsModel.findOneAndUpdate(
        { _id: id },
        { $set: { products: [] } }
      )
      return cart
    } catch (error) {
      console.log(
        `Error eliminando todos los productos del carrito: ${error.message}`
      )
    }
  }
}

module.exports = new CartManagerMongo