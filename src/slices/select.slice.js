import { createSlice } from "@reduxjs/toolkit";

function createGenericSlice(sliceName) {

  const initialState = {
      ['actualItem' + sliceName]: 'Choose item...',
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
      },
    });
    const { reducer, actions } = selectSlice;
    const { setActualItem, setIsOpen } = actions;
    return {setActualItem, setIsOpen, reducer}

  }

  let slice = []


  for(let i=1; i<=6; i++){
    slice[i] = createGenericSlice(String(i))
  }

  const setActualItem1 = slice[1].setActualItem
  const setIsOpen1 = slice[1].setIsOpen
  const selectReducer1 = slice[1].reducer

  const setActualItem2 = slice[2].setActualItem
  const setIsOpen2 = slice[2].setIsOpen
  const selectReducer2 = slice[2].reducer

//   const setActualItem3 = slice[3].setActualItem
//   const setIsOpen3 = slice[3].setIsOpen
//   const selectReducer3 = slice[3].reducer

//   const setActualItem4 = slice[4].setActualItem
//   const setIsOpen4 = slice[4].setIsOpen
//   const selectReducer4 = slice[4].reducer

//   const setActualItem5 = slice[5].setActualItem
//   const setIsOpen5 = slice[5].setIsOpen
//   const selectReducer5 = slice[5].reducer

//   const setActualItem6 = slice[5].setActualItem
//   const setIsOpen6 = slice[5].setIsOpen
//   const selectReducer6 = slice[5].reducer



  export {
    setActualItem1, 
    setActualItem2,
    // setActualItem3,
    // setActualItem4,
    // setActualItem5,
    // setActualItem6,
    setIsOpen1, 
    setIsOpen2,
    // setIsOpen3,
    // setIsOpen4,
    // setIsOpen5,
    // setIsOpen6,
    selectReducer1, 
    selectReducer2,
    // selectReducer3,
    // selectReducer4,
    // selectReducer5,
    // selectReducer6,
}

  