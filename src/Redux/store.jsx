import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import toggleSlice from "./toggleSlice";
const store = configureStore({
    reducer : {
        cart : cartSlice,
        toggleMenu : toggleSlice
    }})

export default store;