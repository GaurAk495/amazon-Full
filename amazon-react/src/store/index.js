import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './ProductSlice.js'
import cartReducer from './cartSlice.js'
import deliveryReducer from './deliverySlice.js'
import fetchingReducer from './FetchingSlice.js'
import OrderReducer from './OrderSlice.js'
import logStatusReducer from './LogStatusSlice.js'


const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        delivery: deliveryReducer,
        fetching: fetchingReducer,
        order: OrderReducer,
        logStaus: logStatusReducer
    }
})

export default store