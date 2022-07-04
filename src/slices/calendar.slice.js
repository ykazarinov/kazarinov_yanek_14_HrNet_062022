import { createSlice } from "@reduxjs/toolkit";

// splitting an array into subarrays
const subarrayCreator = ((myArray, size)=>{
  let subarray = [];
  for (let i = 0; i <Math.ceil(myArray.length/size); i++){
      subarray[i] = myArray.slice((i*size), (i*size) + size);
  }
  return (subarray)
})

// create array of empty dates before current month
const emptyDatesBefore = ((year, month) => {
  
  let firstWeekDay = new Date(year, month-1, 1).getDay()
  let countDaysBefore = firstWeekDay === 0 ? firstWeekDay+7 : firstWeekDay
  let emptyDays = []
  for(let i=1; i< countDaysBefore ; i++){
      emptyDays.push({})
  }
  return emptyDays
})

// create array of empty dates after current month
const emptyDatesAfter = ((lastWeek)=>{
  let countDaysAfter = 7 - lastWeek.length
  let emptyDays = []
  for(let i=0; i< countDaysAfter ; i++){
      emptyDays.push({})
  }

  return emptyDays
  

})

// create array of array (weeks) of objects (days) with dates of given month of given year
const monthDates = ((year, month) => {
  var myDate = new Date(year, month-1, 1)
  var myMonth = myDate.getMonth() + 1
  var end = new Date(myDate.getFullYear(), myMonth, 0).getDate(); 
  var result = [];
  let firstDayOfCurrentMonth

  // 1. create array of dates
  for(let i = 1; i <= end; i++){
      firstDayOfCurrentMonth = new Date(new Date().setDate(i));
      result.push(
      {
          day: i < 10 ? '0'+ i : String(i),
          weekDay: firstDayOfCurrentMonth.getDay(),
          month: myMonth < 10 ? '0' + myMonth : myMonth,
          year: myDate.getFullYear()
      })
  }

  // 2. create array of empty dates before
  let emptyDaysBefore = emptyDatesBefore(year, month)
 
  // 2.1 and add this dates before main array
  for(let i = 0; i< emptyDaysBefore.length; i++){
      result.unshift(emptyDaysBefore[i])
  }

  // 3. create array of empty dates after
  let groupedResult = subarrayCreator(result, 7)
  let emptyDaysAfter = emptyDatesAfter(groupedResult[[groupedResult.length - 1]])
  // 3.1 and add this dates after main array
  for(let i = 0; i< emptyDaysAfter.length; i++){
      result.push(emptyDaysAfter[i])
  }
  // 4. grouping dates by week
  groupedResult = subarrayCreator(result, 7)
  return(groupedResult)
})



const currentState = ((state, sliceName) => {
  return{
    ['isOpen' + sliceName] : state['isOpen' + sliceName],
    ['choosedMonth' + sliceName]: state['choosedMonth' + sliceName],
    ['choosedYear' + sliceName]: state['choosedYear' + sliceName],
    ['currentMonth' + sliceName]: state['currentMonth' + sliceName],
    ['beforeMonth' + sliceName]: state['beforeMonth' + sliceName],
    ['afterMonth' + sliceName]: state['afterMonth' + sliceName],
    ['choosedDay' + sliceName]: state['choosedDay' + sliceName]
  }
})

function createGenericSlice(sliceName) {

  const currentDay = new Date()
  const initialState = {
    ['isOpen' + sliceName]: false,
    ['choosedYear' + sliceName]: currentDay.getFullYear(),
    ['choosedMonth' + sliceName]: currentDay.getMonth() + 1,
    ['currentMonth' + sliceName]: monthDates(currentDay.getFullYear(), currentDay.getMonth() + 1),
    ['beforeMonth' + sliceName]: monthDates(currentDay.getFullYear(), currentDay.getMonth()),
    ['afterMonth' + sliceName]: monthDates(currentDay.getFullYear(), currentDay.getMonth() + 2),
    ['choosedDay' + sliceName]: currentDay.getDate()
  };

  const calendarSlice = createSlice({
      name: "calendar" + sliceName,
      initialState,
      reducers: {
        setIsOpen: (state) => {
          const defaultCurrentState = currentState(state, sliceName)
          defaultCurrentState['isOpen' + sliceName] = state['isOpen' + sliceName] === true ? false : true
          return  defaultCurrentState
        },
        setChoosedYear: (state, action) => {
          const defaultCurrentState = currentState(state, sliceName)
          defaultCurrentState['choosedYear' + sliceName] = action.payload
          return  defaultCurrentState            
        },
        setChoosedMonth: (state, action) => {
          const defaultCurrentState = currentState(state, sliceName)
          defaultCurrentState['choosedMonth' + sliceName] = action.payload


          
          return  defaultCurrentState
        },
        setCurrentMonth: (state) => {
          const defaultCurrentState = currentState(state, sliceName)
          defaultCurrentState['currentMonth' + sliceName] = monthDates(
            state['choosedYear' + sliceName], 
            state['choosedMonth' + sliceName]
          )

          // console.log(defaultCurrentState['currentMonth' + sliceName])

          return  defaultCurrentState
        },
        setBeforeMonth: (state) => {
          const defaultCurrentState = currentState(state, sliceName)
          defaultCurrentState['beforeMonth' + sliceName] = monthDates(
            state['choosedYear' + sliceName], 
            state['choosedMonth' + sliceName] - 1
          )
          return  defaultCurrentState
        },
        setAfterMonth: (state) => {
          const defaultCurrentState = currentState(state, sliceName)
          defaultCurrentState['afterMonth' + sliceName] = monthDates(
            state['choosedYear' + sliceName], 
            state['choosedMonth' + sliceName] + 1
          )
          return  defaultCurrentState
        },
        setChoosedDay: (state, action) => {
          const defaultCurrentState = currentState(state, sliceName)
          String(action.payload).substring(0,1) === '0' || String(action.payload).length > 1 
            ? defaultCurrentState['choosedDay' + sliceName] = action.payload
            : defaultCurrentState['choosedDay' + sliceName] = '0' + action.payload
          return  defaultCurrentState
        },

      },
    });
    const { reducer, actions } = calendarSlice;
    const {setIsOpen, setChoosedYear, setChoosedMonth, setCurrentMonth, setBeforeMonth, setAfterMonth, setChoosedDay } = actions;
    return {setIsOpen, setChoosedYear, setChoosedMonth, setCurrentMonth, setBeforeMonth, setAfterMonth, setChoosedDay, reducer}
  }

  const slice1 = createGenericSlice("1")
  const slice2 = createGenericSlice("2")

  const setIsOpen1 = slice1.setIsOpen
  const setChoosedMonth1 = slice1.setChoosedMonth
  const setChoosedYear1 = slice1.setChoosedYear
  const setCurrentMonth1 = slice1.setCurrentMonth
  const setBeforeMonth1 = slice1.setBeforeMonth
  const setAfterMonth1 = slice1.setAfterMonth
  const setChoosedDay1 = slice1.setChoosedDay
  const calendarReducer1 = slice1.reducer

  const setIsOpen2 = slice2.setIsOpen
  const setChoosedMonth2 = slice2.setChoosedMonth
  const setChoosedYear2 = slice2.setChoosedYear
  const setCurrentMonth2 = slice2.setCurrentMonth
  const setBeforeMonth2 = slice2.setBeforeMonth
  const setAfterMonth2 = slice2.setAfterMonth
  const setChoosedDay2 = slice2.setChoosedDay
  const calendarReducer2 = slice2.reducer

  export {
    setIsOpen1,
    setChoosedMonth1, 
    setChoosedYear1, 
    setCurrentMonth1,
    setBeforeMonth1,
    setAfterMonth1,
    setChoosedDay1,
    calendarReducer1,
    setIsOpen2,  
    setChoosedMonth2,
    setChoosedYear2, 
    setCurrentMonth2,
    setBeforeMonth2,
    setAfterMonth2,
    setChoosedDay2,
    calendarReducer2}

  