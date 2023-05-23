const socket = io()

const cart = document.querySelector('#cartsId')
const searchCart = document.querySelector('#searchCart')

searchCart.addEventListener('submit', e => {
  e.preventDefault()
  socket.emit('cart', cart.value)
  searchCart.reset()
})

socket.on("cart", data => {
  render(data)
})

const render = (data) => {
  let message = data.cart.message
  let status = data.cart.status
  if (status != 'success') {
    const html = `<h1>${message}</h1>`
    return (document.getElementById("cart").innerHTML = html)
  }

  const html = data.cart.cart.products
    .map(item => {
      return `<div class="productsCard">
      <h3>${item.product.title}</h3>
      <img src="${item.product.thumbnail}" />
      <h4>Precio: ${item.product.price}</h4>
      <h5>Cantidad: ${item.quantity}</h5>
      <div>
        <button id="plusOne">mas detalles</button>
        <button id="minusOne">finalizar compra</button>
      </div>
    </div>
      `
    })
    .join(" ");
  document.getElementById("cart").innerHTML = html
}