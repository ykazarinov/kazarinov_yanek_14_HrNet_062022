import { createSlice } from "@reduxjs/toolkit";

function createGenericSlice(sliceName) {

  const initialState = {
      ['actualItem' + sliceName]: 'Choose item...',
      ['isOpen' + sliceName]: false
  };

  const calendarSlice = createSlice({
      name: "calendar" + sliceName,
      initialState,
      reducers: {

        setActualItem: (state, action) => {
          return { 
            ['actualItem' + sliceName]: action.payload,
            ['isOpen' + sliceName] : state['isOpen' + sliceName] === true ? false : true
          };
        },
        setIsOpen: (state) => {
          return { 
            ['actualItem' + sliceName]: state['actualItem' + sliceName],
            ['isOpen' + sliceName] : state['isOpen' + sliceName] === true ? false : true
          };
        },
      },
    });
    const { reducer, actions } = calendarSlice;
    const { setActualItem, setIsOpen } = actions;
    return {setActualItem, setIsOpen, reducer}

  }

  const slice1 = createGenericSlice("1")
  const slice2 = createGenericSlice("2")

  const setActualItem1 = slice1.setActualItem
  const setIsOpen1 = slice1.setIsOpen
  const reducer1 = slice1.reducer

  const setActualItem2 = slice2.setActualItem
  const setIsOpen2 = slice2.setIsOpen
  const reducer2 = slice2.reducer

  export {setActualItem1, setIsOpen1, reducer1, setActualItem2, setIsOpen2, reducer2}

  