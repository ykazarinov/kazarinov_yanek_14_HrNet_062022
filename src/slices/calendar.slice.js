import { createSlice } from "@reduxjs/toolkit";

// splitting an array into subarrays
const subarrayCreator = ((myArray, size)=>{
  let subarray = [];
  for (let i = 0; i <Math.ceil(myArray.length/size); i++){
      subarray[i] = myArray.slice((i*size), (i*size) + size);
  }
  return (subarray)
})

const createArrayOfDates = ((year, month)=>{
  var myDate = new Date(year, month, 1)
  var myMonth = myDate.getMonth() != 0 ? myDate.getMonth() : 12
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
        year: myMonth === 12 ? myDate.getFullYear()-1 : myDate.getFullYear()
    })
  }

  return result
})

// create array of empty dates before current month
const datesBefore = ((year, month) => {
  let firstWeekDay = new Date(year, month-1, 1).getDay()
  let countDaysBefore = firstWeekDay === 0 ? firstWeekDay+7 : firstWeekDay
  let lastDaysOfThePreviousMonth = []
  
  let result = createArrayOfDates(month===1? year-1 : year, month>1 ? month-1 : 12)
  
  let beforeDates = result.slice(-countDaysBefore)

    for(let i=countDaysBefore-1; i>=1  ; i--){
      lastDaysOfThePreviousMonth.push(beforeDates[i])
  }
  
  return lastDaysOfThePreviousMonth
})

// create array of empty dates after current month
const datesAfter = ((lastWeek, year, month)=>{
  let countDaysAfter = 7 - lastWeek.length
  let firstDaysOfNextMonth = []
  let result = createArrayOfDates(month===12? year+1 : year, month<12 ? month + 1: 1)
  
  let afterDates = result.slice(0, countDaysAfter)
  for(let i=0; i< countDaysAfter ; i++){
    firstDaysOfNextMonth.push(afterDates[i])
  }
  return firstDaysOfNextMonth

})



// create array of array (weeks) of objects (days) with dates of given month of given year
const monthDates = ((year, month) => {
    // 1. create array of main dates of month
    let result = createArrayOfDates(year, Number(month) != 0 ? month : 12)
    
 
    // 2. create array of last days of the previous month
    let daysBefore = datesBefore(year, month)
  
    // 2.1 and add this dates before main array
    for(let i = 0; i< daysBefore.length; i++){
        result.unshift(daysBefore[i])
    }

    // 3. create array of first days of next month
    let groupedResult = subarrayCreator(result, 7)
    let emptyDaysAfter = datesAfter(groupedResult[[groupedResult.length - 1]], year, month)
    
    // 3.1 and add this dates after main array
    for(let i = 0; i< emptyDaysAfter.length; i++){
        result.push(emptyDaysAfter[i])
    }
    // 4. grouping dates by weeks
    groupedResult = subarrayCreator(result, 7)

    return(groupedResult)
 
})



const currentState = ((state, sliceName) => {
  return{
    ['isOpen' + sliceName] : state['isOpen' + sliceName],
    ['choosedMonth' + sliceName]: state['choosedMonth' + sliceName],
    ['choosedYear' + sliceName]: state['choosedYear' + sliceName],
    ['currentMonth' + sliceName]: state['currentMonth' + sliceName],
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
        setClose: (state) => {
          const defaultCurrentState = currentState(state, sliceName)
          defaultCurrentState['isOpen' + sliceName] = false
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
    const {setIsOpen, setClose, setChoosedYear, setChoosedMonth, setCurrentMonth, setChoosedDay } = actions;
    return {setIsOpen, setClose, setChoosedYear, setChoosedMonth, setCurrentMonth, setChoosedDay, reducer}
  }

  const slice1 = createGenericSlice("1")
  const slice2 = createGenericSlice("2")

  const setIsOpen1 = slice1.setIsOpen
  const setClose1 = slice1.setClose
  const setChoosedMonth1 = slice1.setChoosedMonth
  const setChoosedYear1 = slice1.setChoosedYear
  const setCurrentMonth1 = slice1.setCurrentMonth
  const setChoosedDay1 = slice1.setChoosedDay
  const calendarReducer1 = slice1.reducer

  const setIsOpen2 = slice2.setIsOpen
  const setClose2 = slice2.setClose
  const setChoosedMonth2 = slice2.setChoosedMonth
  const setChoosedYear2 = slice2.setChoosedYear
  const setCurrentMonth2 = slice2.setCurrentMonth
  const setChoosedDay2 = slice2.setChoosedDay
  const calendarReducer2 = slice2.reducer

  export {
    setIsOpen1,
    setClose1,
    setChoosedMonth1, 
    setChoosedYear1, 
    setCurrentMonth1,
    setChoosedDay1,
    calendarReducer1,
    setIsOpen2,
    setClose2,  
    setChoosedMonth2,
    setChoosedYear2, 
    setCurrentMonth2,
    setChoosedDay2,
    calendarReducer2}

  