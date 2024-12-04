/**@format */
const Router = require('express')
const { 
    register,
    login,
    handleLoginWithGoogle,
} = require('../controllers/authController')

const authRouter = Router()

// authRouter.post('/register',(req, res) => {
//     console.log(req.body)
//     res.send('Go to register')
// })

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/google-signin', handleLoginWithGoogle);

module.exports = authRouter