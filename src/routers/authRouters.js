/**@format */
const Router = require('express')
const { 
    register,
    login,
    handleLoginWithGoogle,
    verification,
    forgotPassword,
} = require('../controllers/authController')

const authRouter = Router()

// authRouter.post('/register',(req, res) => {
//     console.log(req.body)
//     res.send('Go to register')
// })

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/google-signin', handleLoginWithGoogle);
authRouter.post('/verification', verification);
authRouter.post('/forgotPassword', forgotPassword);

module.exports = authRouter