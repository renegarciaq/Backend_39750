const express = require('express')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const { Server } = require('socket.io')
const http = require('http')
const routers = require('./routers/index.router')
const routersMongo = require('./routersMongo/index')
const viewsRouter = require('./routers/views.router')
const ProductManager = require('./dao/fileSystem/productsManager')
const configServer = require('./config/configServer.js')
const UsersManager = require('./dao/fileSystem/usersManager')
const chatManager = require('./dao/mongoDb/chat.mongo')
const viewRouterMongo = require('./routersMongo/views.router.mongo')
const CartManager = require('./dao/mongoDb/cart.mongo')


const productsList = new ProductManager(__dirname + '/db/products.json')
const userList = new UsersManager(__dirname + '/db/users.json')


// -------------------------------------------------------------------------//

const app = express()
const PORT = 8080

configServer.connectDB()

const httpServer = http.createServer(app)

const io = new Server(httpServer)
httpServer.listen(PORT, () => {
    console.log(`Listening app port ${PORT}`)
})


//hbs--------------------------
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
//hbs--------------------------


app.use('/static', express.static(__dirname + '/public'))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api", routers)
app.use('/api', routersMongo)
app.use("/", viewsRouter)
app.use('/', viewRouterMongo)

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado', socket.id)

    socket.on('client:productDelete', async (pid, cid) => {
        const id = await productsList.getProductById(parseInt(pid.id))
        if (id) {
            await productsList.deleteById(parseInt(pid.id))
            const data = await productsList.getProducts()
            return io.emit('newList', data)
        }
        const dataError = { status: "error", message: "Product not found" }
        return socket.emit('newList', dataError)
    })
    socket.on('client:newProduct', async data => {
        const productAdd = await productsList.addProduct(data)
        if (productAdd.status === 'error') {
            let errorMess = productAdd.message
            socket.emit('server:producAdd', { status: 'error', errorMess })
        }
        const newData = await productsList.getProducts()
        console.log('log de app', newData);
        return io.emit('server:productAdd', newData)
    })
    socket.on('client:userToDelete', async uid => {
        const id = await userList.getUserById(parseInt(uid.id))
        if (id) {
            await userList.deleteById(parseInt(uid.id))
            const data = await userList.getUsers()
            return io.emit('newList', data)
        }
        const dataError = { status: "error", message: "Product not found" }
        return socket.emit('newList', dataError)
    })
    socket.on('client:newUser', async data => {
        const userAdd = await userList.createUser(data)
        if (userAdd.status === 'error') {
            let errorMess = userAdd.message
            socket.emit('server:userAdd', { status: 'error', errorMess })
        }
        const newData = await userList.getUsers()

        return io.emit('server:userAdd', newData)
    })
    socket.on('message', async data => {
        // console.log(data);
        // mensages.push(data)
        const messages = await chatManager.addMessages(data)
        io.emit('messageLog', messages)
    })
    socket.on("cart", async id => {
        const cart = await CartManager.getById(id)
        socket.emit("cart", cart);
    })
})

httpServer.on('error', (error) => {
    console.log('Error', error)
})