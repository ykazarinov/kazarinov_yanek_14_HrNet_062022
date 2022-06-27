import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    actualItem: 'Choose item...',
    isOpen: false
};

const selectSlice = createSlice({
    name: "select",
    initialState,
    reducers: {

      setActualItem: (state, action) => {
        return { 
          actualItem: action.payload,
          isOpen : state.isOpen === true ? false : true
        };
      },
      setIsOpen: (state) => {
        return { 
          actualItem: state.actualItem,
          isOpen : state.isOpen === true ? false : true
        };
      },
    },
  });
  const { reducer, actions } = selectSlice;
  export const { setActualItem, setIsOpen } = actions
  export default reducer;