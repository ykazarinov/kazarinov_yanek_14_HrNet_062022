import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../services/auth.service";
const user = JSON.parse(localStorage.getItem("user"));

//createAsyncThunk is an abstracts the standard recommended approach 
//for handling async request lifecycles.
//Allowing to perform delayed, asynchronous logic before 
//sending the processed result to the reducers.

// createAsyncThunk for action login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password)
      return { user: data };
    } catch (error) {
      const message = 
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      //rejectWithValue is a utility function that you can return (or throw) 
      //in your action creator to return a rejected response 
      //with a defined payload and meta.
      return thunkAPI.rejectWithValue();
    }
  }
);
// createAsyncThunk for action logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

// Initial state: if user is exist then isLoggedIn is true and user consist the data
//else isLoggedIn is false and user is null
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

//This Slice creates actions and reducers 
//for authorization and exit from the authorized mode.
//And also to ensure the operation of the "Remember me" mode.
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //Switch to "Logged in" mode
    rememberMe: (state, action) => {
      state.isLoggedIn = true;
    },
  },
  //extraReducers allows createSlice to respond to other action types
  // besides the types it has generated.
  //In our case, asynchronous actions.
  extraReducers: {

    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
const { reducer, actions } = authSlice;

export const { rememberMe } = actions;
export default reducer;