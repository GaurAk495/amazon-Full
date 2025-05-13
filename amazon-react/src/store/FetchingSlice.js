import { createSlice } from '@reduxjs/toolkit'

const fetchingSlice = createSlice({
    name: 'feetching',
    initialState: {
        fetchedProducts: false,
        fetchingProducts: false
    },
    reducers: {
        fetchedStatus(state) {
            state.fetchedProducts = true
        },
        fetchingStatus(state) {
            state.fetchingProducts = true
        }
    }
})

export const { fetchedStatus, fetchingStatus } = fetchingSlice.actions
export default fetchingSlice.reducer