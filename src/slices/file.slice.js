import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  
    imageUrl: '',
    fileType: '',

}

// slice, which content reducers and actions for data of the User's Profil and status of loading 
// after the updating
const uploadFileSlice = createSlice({
    name: "uploadFile",
    initialState,
    reducers: {
       
        setImageUrl: (state, action) => {
            state.imageUrl = action.payload
        },
        setFileType: (state, action) => {
            state.fileType = action.payload
        },
       
    },
    extraReducers: {
    
   

  },
});
const { reducer, actions } = uploadFileSlice;
export const { setImageUrl, setFileType} = actions
export default reducer;

