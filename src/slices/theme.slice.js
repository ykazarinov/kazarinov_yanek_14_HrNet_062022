import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    actualTheme: 'theme-light'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setActualTheme: (state) => {
            return {actualTheme : state.actualTheme === 'theme-light' ? 'theme-dark' : 'theme-light',}
        }
    } 
})

const {reducer, actions} = themeSlice
export const { setActualTheme } = actions
export default reducer