import { createSlice } from "@reduxjs/toolkit";

function createGenericSlice(sliceName) {

  const currentDay = new Date()

  const initialState = {
      ['choosedYear' + sliceName]: currentDay.getFullYear(),
      ['isOpen' + sliceName]: false
  };

  const calendarSlice = createSlice({
      name: "calendar" + sliceName,
      initialState,
      reducers: {

        setChoosedYear: (state, action) => {
          return { 
            ['choosedYear' + sliceName]: action.payload,
            // ['choosedYear' + sliceName]: state['choosedYear' + sliceName] - 1,
            ['isOpen' + sliceName] : state['isOpen' + sliceName]
          };
        },
        setIsOpen: (state) => {
          return { 
            
            ['isOpen' + sliceName] : state['isOpen' + sliceName] === true ? false : true,
            ['choosedYear' + sliceName]: state['choosedYear' + sliceName]
          };
        },
      },
    });
    const { reducer, actions } = calendarSlice;
    const { setChoosedYear, setIsOpen } = actions;
    return {setChoosedYear, setIsOpen, reducer}

  }

  const slice1 = createGenericSlice("1")
  const slice2 = createGenericSlice("2")

  const setChoosedYear1 = slice1.setChoosedYear
  const setIsOpen1 = slice1.setIsOpen
  const calendarReducer1 = slice1.reducer

  const setChoosedYear2 = slice2.setChoosedYear
  const setIsOpen2 = slice2.setIsOpen
  const calendarReducer2 = slice2.reducer

  export {setChoosedYear1, setIsOpen1, calendarReducer1, setChoosedYear2, setIsOpen2, calendarReducer2}

  