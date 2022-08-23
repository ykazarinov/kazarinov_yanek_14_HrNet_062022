import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import patchEmployeeService from "../services/patchEmployee.service";

// createAsyncThunk for middleware for update data of User's Profil 
export const patchEmployee = createAsyncThunk(
    'editEmployee/patchEmployee',
    async ({  
        id,
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
            const data = await patchEmployeeService.patchEmployee(
                id,
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

    editedEmployee: null,
    loading: false,
    editEmployeeSuccess: false,
    imageUrl: '',
    fileType: '',

}

// slice, which content reducers and actions for data of the User's Profil and status of loading 
// after the updating
const editEmployeeSlice = createSlice({
    name: "editEmployee",
    initialState,
    reducers: {
        setEditSuccessFalse: (state, action) => {
            state.editEmployeeSuccess = false
        },
        setEditImageUrl: (state, action) => {
            state.imageUrl = action.payload
        },
        setEditFileType: (state, action) => {
            state.fileType = action.payload
        },
        setEditEmployee: (state, action) => {
            state.editedEmployee = action.payload
        },
        afterEditSuccess: (state, action) => {
            state.editedEmployee = null
            state.editEmployeeSuccess = false
        }
       
    },
    extraReducers: {
    
    [patchEmployee.fulfilled]: (state, action) => {
        state.loading = false
        state.editEmployeeSuccess = action.payload
    },
    [patchEmployee.rejected]: (state) => {
        state.loading = false
    },
    [patchEmployee.pending]: (state) => {
        state.loading = true
    },

  },
});
const { reducer, actions } = editEmployeeSlice;
export const { setEditSuccessFalse, setEditImageUrl, setEditFileType, setEditEmployee, afterEditSuccess} = actions
export default reducer;

