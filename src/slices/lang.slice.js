import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
      actualLang: 'English'
  };

  const langSlice = createSlice({
      name: "lang",
      initialState,
      reducers: {

        setActualLang: (state, action) => {
          return { 
            actualLang: action.payload
            
          };
        },
       
      },
    });
    const { reducer, actions } = langSlice
    export const { setActualLang, } = actions
    export default reducer

