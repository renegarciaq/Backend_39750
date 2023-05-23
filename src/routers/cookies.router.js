const { Router } = require('express')

const router = Router()


router.post('/getcookieuser', (req, res) => {
    const { username, email } = req.body

    res.cookie(username, email, { maxAge: 1000000, signed: true }).send({ message: 'seteado' })
})
router.get('/setCookie', (req, res) => {
    res.cookie('cookiePrueba', 'Esta es una cookie de prueba', { maxAge: 1000000 }).send('Cookie seteada')
})
router.get('/setSignedCookie', (req, res) => {
    res.cookie('signedCookie', 'Esta es una cookie firmada', { maxAge: 1000000, signed: true }).send('Cookie seteada')
})
router.get('/getCookie', (req, res) => {
    res.send(req.cookies)
})
router.get('/getSignedCookie', (req, res) => {
    res.send(req.signedCookies)
})
router.get('/deleteCookie', (req, res) => {
    res.clearCookie('cookiePrueba').send('Cookie removed')
})


module.exports = router