import { createSlice } from "@reduxjs/toolkit";

function createGenericSlice(sliceName) {

  const initialState = {
      ['actualItem' + sliceName]: '',
      ['isOpen' + sliceName]: false
  };

  const selectSlice = createSlice({
      name: "select" + sliceName,
      initialState,
      reducers: {

        setActualItem: (state, action) => {
          return { 
            ['actualItem' + sliceName]: action.payload,
            ['isOpen' + sliceName] : state['isOpen' + sliceName] === true ? false : true,
          };
        },
        setIsOpen: (state) => {
          return { 
            ['actualItem' + sliceName]: state['actualItem' + sliceName],
            ['isOpen' + sliceName] : state['isOpen' + sliceName] === true ? false : true,
          };
        },
        setCloseSelect: (state) => {
          return { 
            ['actualItem' + sliceName]: state['actualItem' + sliceName],
            ['isOpen' + sliceName] : false,
          };
        }
      },
    });
    const { reducer, actions } = selectSlice;
    const { setActualItem, setIsOpen, setCloseSelect } = actions;
    return {setActualItem, setIsOpen, setCloseSelect, reducer}

  }

  let slice = []


  for(let i=1; i<=2; i++){
    slice[i] = createGenericSlice(String(i))
  }

  const setActualItem1 = slice[1].setActualItem
  const setIsOpen1 = slice[1].setIsOpen
  const setCloseSelect1 = slice[1].setCloseSelect
  const selectReducer1 = slice[1].reducer

  const setActualItem2 = slice[2].setActualItem
  const setIsOpen2 = slice[2].setIsOpen
  const setCloseSelect2 = slice[2].setCloseSelect
  const selectReducer2 = slice[2].reducer

  export {
    setActualItem1, 
    setActualItem2,
    setIsOpen1, 
    setIsOpen2,
    setCloseSelect1,
    setCloseSelect2,
    selectReducer1, 
    selectReducer2,
}

  