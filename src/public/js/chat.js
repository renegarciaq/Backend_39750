console.log('Socket')
const socket = io()
let user
let chatbox = document.querySelector('#chatbox')
let sarasa = document.querySelector('#SARASA')

Swal.fire({
  title: 'Identificate',
  input: 'text',
  text: 'Ingresar el nombre de usuario',
  inputValidator: (value) => {
    return !value && 'El nombre de usuario es obligatorio'
  },
  allowOutsideClick: false
}).then(result => {
  user = result.value
})

chatbox.addEventListener('keyup', evt => {
  if (evt.key === 'Enter') {
    if (chatbox.value.trim().length > 0) {
      socket.emit('message', {
        user, message: chatbox.value
      })
      chatbox.value = ''
    }
  }
})
let mensajes
socket.on('messageLog', (data) => {
  // console.log(typeof(data))
  const mensajes = data.map(({ user, message }) => `<li>${user} dice: ${message}</li>`).join("");
  sarasa.innerHTML = mensajes
})