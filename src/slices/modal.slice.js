import { createSlice } from "@reduxjs/toolkit";

function createGenericSlice(sliceName) {

  const initialState = {
      ['hidden' + sliceName]: true,
      ['elemModalImage' + sliceName]: '',
      ['elemModalId' + sliceName]: null
  };

  const modalSlice = createSlice({
      name: "modal" + sliceName,
      initialState,
      reducers: {

        setHidden: (state, action) => {
            state['hidden' + sliceName] = action.payload
          
        },
        setElemModalImage: (state, action) => {
            state['elemModalImage' + sliceName] = action.payload
         
        },
        setElemModalId: (state, action) => {
            state['elemModalId' + sliceName] = action.payload
         
        },
       
      },
    });
    const { reducer, actions } = modalSlice;
    const { setHidden, setElemModalImage, setElemModalId } = actions;
    return {setHidden, setElemModalImage, setElemModalId, reducer}

  }

  let slice = []


  for(let i=1; i<=3; i++){
    slice[i] = createGenericSlice(String(i))
  }

  const setHidden1 = slice[1].setHidden
  const setElemModalImage1 = slice[1].setElemModalImage
  const setElemModalId1 = slice[1].setElemModalId
  const modalReducer1 = slice[1].reducer

  const setHidden2 = slice[2].setHidden
  const setElemModalImage2 = slice[2].setElemModalImage
  const setElemModalId2 = slice[2].setElemModalId
  const modalReducer2 = slice[2].reducer

  const setHidden3 = slice[3].setHidden
  const setElemModalImage3 = slice[3].setElemModalImage
  const setElemModalId3 = slice[3].setElemModalId
  const modalReducer3 = slice[3].reducer

  export {
    setHidden1, 
    setHidden2,
    setHidden3,
    setElemModalImage1, 
    setElemModalImage2,
    setElemModalImage3,
    setElemModalId1,
    setElemModalId2,
    setElemModalId3,
    modalReducer1, 
    modalReducer2,
    modalReducer3,
}