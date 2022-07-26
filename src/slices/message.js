import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

// Slice for set and clear message of an error if form is incorrect
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return action.payload;
    },
    clearMessage: () => {
      return "";
    },
  },
});
const { reducer, actions } = messageSlice;
export const { setMessage, clearMessage } = actions
export default reducer;