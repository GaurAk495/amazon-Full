import express from 'express'
import { shipOption } from '../controller/shippingController.js'
const shippingRouter = express.Router()

shippingRouter.get('/', shipOption)

export default shippingRouter