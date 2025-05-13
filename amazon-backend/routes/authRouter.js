import express from 'express'
import { validateSignup, validateLogin } from '../validation/userSchema.js'
import { login, signup, logStatus } from '../controller/authController.js'
import validToken from '../validation/validatingToken.js'

const authRouter = express.Router()

authRouter.post('/valid', validToken, logStatus)
authRouter.post('/login', validateLogin, login)
authRouter.post('/signup', validateSignup, signup)

export default authRouter