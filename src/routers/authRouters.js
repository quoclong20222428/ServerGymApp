/**@format */
const Router = require('express')
const { register } = require('../controllers/authController')

const authRouter = Router()

// authRouter.post('/register',(req, res) => {
//     console.log(req.body)
//     res.send('Go to register')
// })

authRouter.post('/register', register)

module.exports = authRouter