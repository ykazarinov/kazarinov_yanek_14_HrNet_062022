import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import getDepartmentsService from "../services/getDepartments.service";

export const getDepartments = createAsyncThunk(
    'departments/getDepartments',
    async (thunkAPI) => {
        try{
            const data = await getDepartmentsService()
            return data
        } catch (err){
            let message
            if(err.response) {
                message = err.response.data;
            } else if (err.request) {
                message = err.request.data;
            } else {
                message = err.toJSON();
            }

            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)

const initialState = {
    departmentsList: null,
    loading: false
}

const getDepartmentsSlice = createSlice({
    name: "departments",
    initialState,
    reducers: {},
    extraReducers: {
        [getDepartments.fulfilled]: (state, action) => {
            state.loading = false
            state.departmentsList = action.payload
        },
        [getDepartments.rejected]: (state, action) => {
            state.loading = false
        },
        [getDepartments.pending]: (state, action) => {
            state.loading = true
        }
    }
})

const {reducer} = getDepartmentsSlice;
export default reducer;