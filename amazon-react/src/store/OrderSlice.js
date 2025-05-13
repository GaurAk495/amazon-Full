import { createSlice } from '@reduxjs/toolkit'

const OrderSlice = createSlice({
    name: 'order',
    initialState: {
        orderPlacing: false,
        orderList: []
    },
    reducers: {
        placeOrder(state, action) {
            state.orderList = action.payload
        },
        userPlacingOrder(state, action) {
            state.orderPlacing = action.payload
        },
        fetchingOrder(state, action) {
            state.orderList = action.payload
        }
    }
})

export const { placeOrder, userPlacingOrder, fetchingOrder } = OrderSlice.actions
export default OrderSlice.reducer