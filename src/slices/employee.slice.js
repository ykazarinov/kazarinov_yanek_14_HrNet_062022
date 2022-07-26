import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import editService from "../services/edit.service";

// createAsyncThunk for middleware for update data of User's Profil 
export const setEmployee = createAsyncThunk(
    'newEmployee/setEmployee',
    async ({  
        photo, 
        firstName, 
        lastName, 
        email,
        phone,
        birthday,
        startday,
        street,
        city,
        state,
        zipcode,
        department,
     }, thunkAPI) => {
        try {
            const data = await editService.postEmployee(
                photo, 
                firstName, 
                lastName, 
                email,
                phone,
                birthday,
                startday,
                street,
                city,
                state,
                zipcode,
                department,)
            return { user: data }
        } catch (err) {

            let message
            
            if (err.response) { 
                // client received an error response (5xx, 4xx)
                message = err.response.data;
              } else if (err.request) { 
                // client never received a response, or request never left 
                message = err.request.data;
              } else { 
                // anything else 
                message = err.toJSON();
              } 


            
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)

const initialState = {
    entities: null,
    loading: false,
}

// slice, which content reducers and actions for data of the User's Profil and status of loading 
// after the updating
const newEmployeeSlice = createSlice({
    name: "newEmployee",
    initialState,
    reducers: {},
    extraReducers: {
    
    [setEmployee.fulfilled]: (state, action) => {
        state.loading = false
        state.entities = action.payload.entities
    },
    [setEmployee.rejected]: (state) => {
        state.loading = false
    },
    [setEmployee.pending]: (state) => {
        state.loading = true
    },

  },
});
const { reducer } = newEmployeeSlice;
export default reducer;