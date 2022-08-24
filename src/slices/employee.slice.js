import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import editService from "../services/edit.service";

// createAsyncThunk for middleware for update data of User's Profil 
export const setEmployee = createAsyncThunk(
    'newEmployee/setEmployee',
    async ({
        employeeId,  
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
                employeeId,
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
    inputValues: {},
    entities: null,
    loading: false,
    createEmployeeSuccess: false,
    imageUrl: '',
    fileType: '',
    uploadedFile: null
}

// slice, which content reducers and actions for data of the User's Profil and status of loading 
// after the updating
const newEmployeeSlice = createSlice({
    name: "newEmployee",
    initialState,
    reducers: {
        setSuccessFalse: (state, action) => {
            state.createEmployeeSuccess = false
            
            // state.actualItem1 = 'Choose item...'
            // state.actualItem2 = 'Choose item...'
            // state.inputDate1 = ''
            // state.inputDate2 = ''
            // state.entities = '111'
            

        },
        setImageUrl: (state, action) => {
            state.imageUrl = action.payload
        },
        setFileType: (state, action) => {
            state.fileType = action.payload
        },
        setUploadedFile: (state, action) => {
            state.uploadedFile = action.payload
        }
    },
    extraReducers: {
    
    [setEmployee.fulfilled]: (state, action) => {
        state.loading = false
        state.entities = action.payload.entities
        state.createEmployeeSuccess = true
    },
    [setEmployee.rejected]: (state) => {
        state.loading = false
    },
    [setEmployee.pending]: (state) => {
        state.loading = true
    },

  },
});
const { reducer, actions } = newEmployeeSlice;
export const { setSuccessFalse, setImageUrl, setFileType, setUploadedFile} = actions
export default reducer;

