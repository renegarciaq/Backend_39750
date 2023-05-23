const { Router } = require('express')
const userManager = require('../dao/mongoDb/users.mongo')
const { hasData } = require('../utils/usersHash')

const router = Router()


router.get("/register", (req, res) => {
    res.render("register")
})
router.get("/registerError", (req, res) => {
    res.render("registerError")
})
router.get("/loginError", (req, res) => {
    res.render("loginError")
})
router.get("/logout", (req, res) => {
    res.render("logout")
})
router.get('/admin', (req, res) => {
    res.render('admin')
})

// http://localhost:8080/api/usersMongo/login
router.get('/login', (req, res) => {
    res.render('login', {
        style: "cookie.css"
    })
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const userOk = await userManager.loginUser(email, password)
    console.log('log linea 30 de session router js', userOk)
    if (userOk) {
        req.session["email"] = userOk.email
        req.session["password"] = userOk.password
        req.session["first_name"] = userOk.first_name
        req.session["last_name"] = userOk.last_name
        req.session["age"] = userOk.age
        req.session["logged"] = true
        if (email === "adminCoder@coder.com" && password === "admincoder") {
            req.session["rol"] = "admin"
        } else {
            req.session["rol"] = "user"
        }
        res.redirect("/api/productsMongo")
    } else {
        res.redirect("/api/usersMongo/loginError")
    }
})
// http://localhost:8080/api/usersMongo/register
router.post("/register", async (req, res) => {
    const user = req.body
    const hashPassword = await hasData(user.password)
    const newUser = { ...user, password: hashPassword }
    const userValidator = await userManager.createUser(newUser)
    if (userValidator) {
        res.redirect("/api/productsMongo")
    } else {
        res.redirect("/api/usersMongo/registerError")
    }
})
router.get("/test", (req, res) => {
    console.log("session", req.session)
    res.send("Probando")
})
router.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            console.log(error.message)
            res.send({ message: error })
        } else {
            res.redirect("/")
        }
    })
})
router.get('/counter', (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`se ha visitado el sitio ${req.session.counter} veces`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido')
    }
})

module.exports = router