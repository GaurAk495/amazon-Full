import { createSlice } from "@reduxjs/toolkit";

const deliverySlice = createSlice({
    name: 'delivery',
    initialState: [],
    reducers: {
        fetchDelivey: (state, action) => {
            return action.payload
        }
    }
})

export const { fetchDelivey } = deliverySlice.actions
export default deliverySlice.reducer