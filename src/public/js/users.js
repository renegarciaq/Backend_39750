const socket = io()

const userForm = document.querySelector('#userDelete')
const id = document.querySelector('#deleteUser')



userForm.addEventListener('submit', evt => {
    evt.preventDefault()
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this user.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, enviamos la petición al servidor para eliminar el producto
            socket.emit('client:userToDelete', {
                id: id.value
            })
            console.log(id.value)
        }
    })
})

socket.on('newList', data => {
    if (data.status === 'error') {
        Swal.fire({
            title: 'User not Found',
            text: 'Enter another id',
            icon: 'error'
        })
        return { status: 'error', mesage: 'User not found' }
    }
    let list
    data.forEach(({ first_name, lastName, age, address, email, genero, password }) => {
        list += `
        <tr>
        <td>${first_name}</td>
        <td>${lastName}</td>
        <td>${age}</td>
        <td>${address}</td>
        <td>${email}</td>
        <td>${genero}</td>
        <td>${password}</td>
        </tr>`
    })
    const listAct = `
            <tr>
            <th scope="col">first_name</th>
            <th scope="col">lastName</th>
            <th scope="col">age</th>
            <th scope="col">address</th>
            <th scope="col">email</th>
            <th scope="col">genero</th>
            <th scope="col">password</th>
            </tr>` + list
    document.getElementById('tableUsers').innerHTML = listAct
    Swal.fire({
        title: 'Removed user',
        timer: 5000,
        icon: 'success'
    })
})

const addForm = document.querySelector('#addUser')
const first_name = document.getElementById('first_name')
const lastName = document.getElementById('lastName')
const age = document.getElementById('age')
const address = document.getElementById('address')
const email = document.getElementById('email')
const genero = document.getElementById('genero')
const password = document.getElementById('password')


addForm.addEventListener('submit', e => {
    e.preventDefault()

    socket.emit('client:newUser', {
        first_name: first_name.value,
        lastName: lastName.value,
        age: age.value,
        address: address.value,
        email: email.value,
        genero: genero.value,
        password: password.value
    })
})
socket.on('server:userAdd', (newData) => {
    if (newData.status === 'error') {
        let errorMess = newData.message
        Swal.fire({
            title: 'Error adding user',
            text: newData.message,
            icon: 'error'
        })
        return { status: 'error', errorMess }
    }
    let list
    newData.forEach(({ first_name, lastName, age, address, email, genero, password }) => {
        list += `
        <tr>
        <td>${first_name}</td>
        <td>${lastName}</td>
        <td>${age}</td>
        <td>${address}</td>
        <td>${email}</td>
        <td>${genero}</td>
        <td>${password}</td>
        </tr>`
    })
    const listAct = `
        <tr>
        <th scope="col">first_name</th>
        <th scope="col">lastName</th>
        <th scope="col">age</th>
        <th scope="col">address</th>
        <th scope="col">email</th>
        <th scope="col">genero</th>
        <th scope="col">password</th>
        </tr>` + list
    document.getElementById('tableUsers').innerHTML = listAct
    Swal.fire({
        title: 'User added successfully',
        timer: 5000,
        icon: 'success'
    })
})