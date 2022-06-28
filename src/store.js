import { configureStore } from '@reduxjs/toolkit'

import selectReducer1 from "./slices/select.slice";
import selectReducer2 from "./slices/select.slice";


const reducer = {
  actualItem1: selectReducer1,
  isOpen1: selectReducer1,
  actualItem2: selectReducer2,
  isOpen2: selectReducer2,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;