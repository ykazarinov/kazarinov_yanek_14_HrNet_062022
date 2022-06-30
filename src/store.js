import { configureStore } from '@reduxjs/toolkit'

import {calendarReducer1, calendarReducer2} from "./slices/calendar.slice";
import {
  selectReducer1, 
  selectReducer2,

} from "./slices/select.slice";

const reducer = {
  calendarReducer1: calendarReducer1,
  calendarReducer2: calendarReducer2,
  selectReducer1: selectReducer1,
  selectReducer2: selectReducer2,

  
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;