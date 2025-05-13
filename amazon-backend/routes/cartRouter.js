import express from 'express'
import validToken from '../validation/validatingToken.js'
import { addtoCart, cartItems, shipupdate, orderdItems, updateQty, deleteCart, ordering } from '../controller/cartController.js'

const cartRouter = express.Router()

cartRouter.post('/', validToken, cartItems)
cartRouter.post('/addtocart', validToken, addtoCart)
cartRouter.post('/newquantity', validToken, updateQty)
cartRouter.post('/deleteCart', validToken, deleteCart)
cartRouter.post('/delivery', validToken, shipupdate)
cartRouter.post('/orders', validToken, ordering)
cartRouter.post('/ordered-items', validToken, orderdItems)

export default cartRouter