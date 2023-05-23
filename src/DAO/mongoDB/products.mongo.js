const { productsModel } = require('./model/products.model.js')

class ProductManagerMongo {
  addProduct = async (product) => {
    try {
      /* verifico que el producto tenga todos los parametros */
      if (this.#paramsValidator(product)) {
        product = {
          code: this.#codeGenerator(),
          status: true,
          ...product,
        }
        const newProduct = await productsModel.create(product)
        return newProduct
      }
    } catch (error) {
      console.log(`Error agregando producto: ${error.message}`)
    }
  }

  getAll = async () => {
    try {
      const allProducts = await productsModel.find().lean(); //leer lean()
      return allProducts;
    } catch (error) {
      console.log(`Error obteniendo todos los productos: ${error.message}`)
    }
  }

  getAllPaginated = async (limit, page, sort, title = "", category = "") => {
    try {
      const search = {
        stock: { $gte: 0 },
        category: { $regex: category, $options: "i" },
        title: { $regex: title, $options: "i" },
      }

      if (sort === "asc") {
        sort = { price: 1 }
      }
      else if (sort === "desc") {
        sort = { price: -1 }
      }
      const options = {
        page,
        limit,
        sort,
        lean: true,
      }
      const allProducts = await productsModel.paginate(search, options)
      return allProducts
    } catch (error) {
      console.log(`Error obteniendo todos los productos: ${error.message}`)
    }
  }

  getById = async (id) => {
    try {
      const product = await productsModel.find({ _id: id })
      if (product) {
        return product;
      } else {
        throw new Error(`Producto con id ${id} no encontrado`);
      }
    } catch (error) {
      console.log(
        `Error al buscar producto con el id solicitado: ${error.message}`
      );
    }
  }

  updateProduct = async (id, product) => {
    try {
      const productFinded = await this.getById(id);
      if (productFinded) {
        await productsModel.findOneAndUpdate({ _id: id }, data)
        const updatedProduct = await this.getById(id)
        return {status: "success", data: updatedProduct}
      } else {
        throw new Error(`No se encontro el producto con el id solicitado`)
      }
    } catch (error) {
      console.log(
        `Error al modificar producto con el id ${id}: ${error.message}`
      );
    }
  }

  deleteById = async (id) => {
    try {
      const deletedProduct = await this.getById(id)
      if (deletedProduct) {
        await productsModel.deleteOne({ _id: id })
        return "Producto eliminado"
      } else {
        throw new Error(`Producto con id ${id} no encontrado`)
      }
    } catch (error) {
      console.log(
        `Error al eliminar el producto con el id solicitado: ${error.message}`
      );
    }
  }

  deleteAll = async () => {
    try {
      await productsModel.deleteMany()
      return "Productos eliminados"
    } catch (error) {
      console.log(`Ocurrio un error eliminando los datos: ${error.message}`)
    }
  }

  #codeGenerator(codeLength = 15) {
    const numeros = "0123456789"
    const letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numYLetras = numeros + letras
    let code = ""
    for (let i = 0; i < codeLength; i++) {
      const random = Math.floor(Math.random() * numYLetras.length)
      code += numYLetras.charAt(random)
    }
    return code
  }

  #paramsValidator(product) {
    if (
      product.title &&
      product.description &&
      product.price &&
      product.stock &&
      product.category &&
      !product.id &&
      !product.code
    ) {
      return true;
    } else {
      if (!product.title) {
        throw new Error(`Falta el title del producto.`)
      } else if (!product.description) {
        throw new Error(`Falta la descripcion del producto.`)
      } else if (!product.price) {
        throw new Error(`Falta el precio del producto.`)
      } else if (!product.stock) {
        throw new Error(`Falta el stock del producto.`)
      } else if (!product.category) {
        throw new Error(`Falta la categoria del producto.`)
      } else if (product.id) {
        throw new Error(`El producto no se debe cargar con el id`)
      } else if (product.code) {
        throw new Error(`El producto no se debe cargar con el code`)
      }
    }
  }
}

module.exports = new ProductManagerMongo