import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import deleteEmployeeService from "../services/deleteEmployee.service";

// createAsyncThunk for middleware for update data of User's Profil 
export const deleteEmployee = createAsyncThunk(
    'delEmployee/deleteEmployee',
    async (id, thunkAPI) => {
        
        try {
            const data = await deleteEmployeeService(id)
           
            return  data.success 
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
    loading: false,
    success: false,

}

const delEmployeeSlice = createSlice({
    name: "delEmployee",
    initialState,
    reducers: {
        setSuccessFalse: (state) =>{
            state.success = false
         }
    },
    extraReducers: {
    
    [deleteEmployee.fulfilled]: (state, action) => {
        state.loading = false
        state.success = action.payload
       
        

        
    },
    [deleteEmployee.rejected]: (state) => {
        state.loading = false
        
    },
    [deleteEmployee.pending]: (state) => {
        state.loading = true
        
    },

  },
});
const { reducer, actions } = delEmployeeSlice;
 export const { setSuccessFalse } = actions
export default reducer;

