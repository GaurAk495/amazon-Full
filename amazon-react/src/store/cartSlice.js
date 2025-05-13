import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        fetchCart: (state, action) => {
            return action.payload
        },
        addtoCart(state, action) {
            const index = state.findIndex(item => item._id === action.payload._id);

            index !== -1
                ? (state[index] = action.payload)
                : state.unshift(action.payload);
        },
        updateCartQty(state, action) {
            const itemToUpdate = state.find((currentItem) => {
                return currentItem._id === action.payload.cartId

            })
            itemToUpdate.quantity = action.payload.newQty
        },
        deleteItem(state, action) {
            const updatedCart = state.filter((currentItem) => {
                return currentItem._id !== action.payload
            })
            return updatedCart

        },
        deliveryUpdate(state, action) {
            const index = state.findIndex(item => item._id === action.payload._id);
            if (index !== -1) {
                state[index] = action.payload; // ✅ This updates the item in the state array
            }
        },
        emptyCart() {
            return []
        }
    }
})

export const { fetchCart, addtoCart, updateCartQty, deleteItem, deliveryUpdate, emptyCart } = cartSlice.actions
export default cartSlice.reducer