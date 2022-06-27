import { configureStore } from '@reduxjs/toolkit'

import selectReducer from "./slices/select.slice";

const reducer = {
  actualItem: selectReducer,
  isOpen: selectReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;