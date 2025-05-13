import express from 'express'
import { fetchProducts } from '../controller/ProductsController.js'
const productsRouter = express.Router()

productsRouter.get('/', fetchProducts)

export default productsRouter