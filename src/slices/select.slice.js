import { createSlice } from "@reduxjs/toolkit";

let initialState = {}

for(let i = 1; i<=2 ; i++){
  initialState['actualItem'+i] = 'Choose item...'
  initialState['isOpen'+i] = false
}

// const initialState = {
//     actualItem: 'Choose item...',
//     isOpen: false
// };

const selectSlice = createSlice({
    name: "select",
    initialState,
    reducers: {

      setActualItem1: (state, action) => {
        return {
          actualItem1 : action.payload,
          isOpen1 : state.isOpen1 === true ? false : true
        }
       
      },
      ['setIsOpen' + 1]: (state) => {
        return {
          actualItem1 : state.actualItem1,
          isOpen1 : state.isOpen1 === true ? false : true
        }
      
      },
      setActualItem2: (state, action) => {
        return {
          actualItem2 : action.payload,
          isOpen2 : state.isOpen2 === true ? false : true
        }
       
      },
      setIsOpen2: (state) => {
        return {
          actualItem2 : state.actualItem2,
          isOpen2 : state.isOpen2 === true ? false : true
        }
      
      },
    },
  });
  const { reducer, actions } = selectSlice;
  export const { setActualItem1, setIsOpen1, setActualItem2, setIsOpen2 } = actions
  export default reducer;