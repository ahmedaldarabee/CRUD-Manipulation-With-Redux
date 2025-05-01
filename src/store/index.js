// Main store of this project
import { configureStore } from '@reduxjs/toolkit'
import postSlice from "./postSlice"
import authSlice from "./authSlice";

const store = configureStore({
    // you must to define posts [ slice-name ]: [ slice-handler ]
    reducer:{
        posts: postSlice,
        auth: authSlice,
    },
});

export default store;