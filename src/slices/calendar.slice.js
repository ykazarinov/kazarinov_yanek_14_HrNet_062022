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
  console.log(firstWeekDay)
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

function createGenericSlice(sliceName) {

  const currentDay = new Date()

  const initialState = {
    ['isOpen' + sliceName]: false,
    ['choosedYear' + sliceName]: currentDay.getFullYear(),
    ['choosedMonth' + sliceName]: currentDay.getMonth() + 1,
    ['currentMonth' + sliceName]: monthDates(currentDay.getFullYear(), currentDay.getMonth() + 1),
      
  };

  const calendarSlice = createSlice({
      name: "calendar" + sliceName,
      initialState,
      reducers: {

        setChoosedYear: (state, action) => {
          return { 
            ['isOpen' + sliceName] : state['isOpen' + sliceName],
            ['choosedMonth' + sliceName]: state['choosedMonth' + sliceName],
            ['choosedYear' + sliceName]: action.payload,
            ['currentMonth' + sliceName]: state['currentMonth' + sliceName],
          };
        },
        setChoosedMonth: (state, action) => {
          return { 
            ['isOpen' + sliceName] : state['isOpen' + sliceName],
            ['choosedMonth' + sliceName]: action.payload,
            ['choosedYear' + sliceName]: state['choosedYear' + sliceName],
            ['currentMonth' + sliceName]: state['currentMonth' + sliceName],
          };
        },
        setCurrentMonth: (state, action) => {
          return { 
            ['isOpen' + sliceName] : state['isOpen' + sliceName],
            ['choosedMonth' + sliceName]: state['choosedMonth' + sliceName],
            ['choosedYear' + sliceName]: state['choosedYear' + sliceName],
            ['currentMonth' + sliceName]: monthDates(state['choosedYear' + sliceName], state['choosedMonth' + sliceName]),
          };
        },
        setIsOpen: (state) => {
          return { 
            ['isOpen' + sliceName] : state['isOpen' + sliceName] === true ? false : true,
            ['choosedMonth' + sliceName]: state['choosedMonth' + sliceName],
            ['choosedYear' + sliceName]: state['choosedYear' + sliceName],
            ['currentMonth' + sliceName]: state['currentMonth' + sliceName],
          };
        },
      },
    });
    const { reducer, actions } = calendarSlice;
    const {setIsOpen, setChoosedYear, choosedMonth, setCurrentMonth,  } = actions;
    return {setIsOpen, setChoosedYear, choosedMonth, setCurrentMonth, reducer}

  }

  const slice1 = createGenericSlice("1")
  const slice2 = createGenericSlice("2")

  const setIsOpen1 = slice1.setIsOpen
  const setChoosedMonth1 = slice1.choosedMonth
  const setChoosedYear1 = slice1.setChoosedYear
  const setCurrentMonth1 = slice1.setCurrentMonth
  const calendarReducer1 = slice1.reducer

  const setIsOpen2 = slice2.setIsOpen
  const setChoosedMonth2 = slice2.choosedMonth
  const setChoosedYear2 = slice2.setChoosedYear
  const setCurrentMonth2 = slice2.setCurrentMonth
  const calendarReducer2 = slice2.reducer

  export {
    setIsOpen1,
    setChoosedMonth1, 
    setChoosedYear1, 
    setCurrentMonth1,
    calendarReducer1,
    setIsOpen2,  
    setChoosedMonth2,
    setChoosedYear2, 
    setCurrentMonth2,
    calendarReducer2}

  