
// Handling Operations that be on the authorization section
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { 
        id:1,
        isLoggedIn: true
    },
    reducers:{
        register: (state) => {
            state.isLoggedIn = !state.isLoggedIn;
        }
    }
});

export const { register } = authSlice.actions
export default authSlice.reducer;