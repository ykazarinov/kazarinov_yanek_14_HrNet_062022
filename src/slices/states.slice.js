import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import getStatesService from "../services/getStates.service";

export const getStates = createAsyncThunk(
    'states/getStates',
    async (thunkAPI) => {
        try{
            const data = await getStatesService()
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
    statesList: null,
    loading: false
}

const getStatesSlice = createSlice({
    name: "states",
    initialState,
    reducers: {},
    extraReducers: {
        [getStates.fulfilled]: (state, action) => {
            state.loading = false
            state.statesList = action.payload
        },
        [getStates.rejected]: (state, action) => {
            state.loading = false
        },
        [getStates.pending]: (state, action) => {
            state.loading = true
        }
    }
})

const {reducer} = getStatesSlice;
export default reducer;