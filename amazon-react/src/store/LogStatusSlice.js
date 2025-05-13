import { createSlice } from "@reduxjs/toolkit";

const logStatusSlice = createSlice({
    name: 'loggedStatus',
    initialState: {
        status: false,
        user: {
            username: ""
        }
    },
    reducers: {
        setUserLoginStatus: (state, action) => {
            state.status = action.payload.isLoggedIn;
            state.user = action.payload.userInfo;
        }
    }
});

export const { setUserLoginStatus } = logStatusSlice.actions;
export default logStatusSlice.reducer;
