import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name : "menu",
    initialState : {
        toggleMenu : false
    },
    reducers : {
        toggle : (state) =>{
            state.toggleMenu = !state.toggleMenu
        },
        closeMenu : (state) =>{
            state.toggleMenu = false
        }
    }
});

export const {toggle, closeMenu} = toggleSlice.actions;
export default toggleSlice.reducer;