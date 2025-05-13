import { createSlice } from "@reduxjs/toolkit";

const ProductsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        loadProducts(state, action) {
            return action.payload
        }
    }
})

export const { loadProducts } = ProductsSlice.actions
export default ProductsSlice.reducer