import { configureStore } from '@reduxjs/toolkit'

import {reducer1, reducer2} from "./slices/calendar.slice";

const reducer = {
  reducer1: reducer1,
  reducer2: reducer2,
  
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;