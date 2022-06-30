import { createSlice } from "@reduxjs/toolkit";

function createGenericSlice(sliceName) {

  const currentDay = new Date()

  const initialState = {
      ['choosedYear' + sliceName]: currentDay.getFullYear(),
      ['choosedMonth' + sliceName]: currentDay.getMonth() + 1,
      ['isOpen' + sliceName]: false
  };

  const calendarSlice = createSlice({
      name: "calendar" + sliceName,
      initialState,
      reducers: {

        setChoosedYear: (state, action) => {
          return { 
            ['isOpen' + sliceName] : state['isOpen' + sliceName],
            ['choosedMonth' + sliceName]: state['choosedMonth' + sliceName],
            ['choosedYear' + sliceName]: action.payload
          };
        },
        setChoosedMonth: (state, action) => {
          return { 
            ['isOpen' + sliceName] : state['isOpen' + sliceName],
            ['choosedMonth' + sliceName]: action.payload,
            ['choosedYear' + sliceName]: state['choosedYear' + sliceName]
          };
        },
        setIsOpen: (state) => {
          return { 
            ['isOpen' + sliceName] : state['isOpen' + sliceName] === true ? false : true,
            ['choosedMonth' + sliceName]: state['choosedMonth' + sliceName],
            ['choosedYear' + sliceName]: state['choosedYear' + sliceName]
          };
        },
      },
    });
    const { reducer, actions } = calendarSlice;
    const { setChoosedYear, choosedMonth, setIsOpen } = actions;
    return {setChoosedYear, choosedMonth, setIsOpen, reducer}

  }

  const slice1 = createGenericSlice("1")
  const slice2 = createGenericSlice("2")

  const setChoosedMonth1 = slice1.choosedMonth
  const setChoosedYear1 = slice1.setChoosedYear
  const setIsOpen1 = slice1.setIsOpen
  const calendarReducer1 = slice1.reducer

  const setChoosedMonth2 = slice2.choosedMonth
  const setChoosedYear2 = slice2.setChoosedYear
  const setIsOpen2 = slice2.setIsOpen
  const calendarReducer2 = slice2.reducer

  export {
    setChoosedMonth1, 
    setChoosedYear1, 
    setIsOpen1, 
    calendarReducer1, 
    setChoosedMonth2,
    setChoosedYear2, 
    setIsOpen2, 
    calendarReducer2}

  