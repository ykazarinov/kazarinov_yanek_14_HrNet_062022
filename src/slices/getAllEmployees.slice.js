import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import getAllEmployeesService from "../services/getAllEmployees.service";
import {searchPhrase} from '../resurces/searchphrase'

// createAsyncThunk for middleware for update data of User's Profil 
export const getAllEmployees = createAsyncThunk(
    'allEmployees/getAllEmployees',
    async (thunkAPI) => {
        try {
            const data = await getAllEmployeesService()
            return  data 
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
    employeesState: null,
    loading: false,
    sort: 'createdAt',
    sortDirection: 'descending',
    sortedArray : [],
    paginatedArray : [],
    actualPaginNumber: 0,
    paginCount: 5,
    searchResult: [],
    isSearch: false,
    searchValue: ''
}

function byField(field, sortDirection) {
    let result
    sortDirection === 'ascending' ?
    result = ((a, b) => a[field] > b[field] ? 1 : -1) :
    result = ((a, b) => b[field] > a[field] ? 1 : -1)
    return result
}

const createSubarray = ((array, size)=>{
    let subarray = [];
    for (let i = 0; i <Math.ceil(array.length/size); i++){
        subarray[i] = array.slice((i*size), (i*size) + size);
    }
    return subarray;
})


const arrayProcessingAfterSearch = ((state)=>{
    let clone = Object.assign([], state.searchResult);
    state.sortedArray = clone.sort(byField(state.sort, state.sortDirection))
    state.paginatedArray = createSubarray(state.sortedArray, state.paginCount)
   // If search result a small (for just first pagin page) 
   // but actual pagin number is 2 and more, then
   // we downgrade this number 
    if(!state.paginatedArray[state.actualPaginNumber]){
        if(state.actualPaginNumber >= 1){
            state.actualPaginNumber --
        }
         
    }
})

// slice, which content reducers and actions for data of the User's Profil and status of loading 
// after the updating
const allEmployeesSlice = createSlice({
    name: "allEmployees",
    initialState,
    reducers: {
        setSort: (state, action) => {
            state.sort = action.payload
        },
        setSortDirection: (state) => {
            state.sortDirection === 'ascending' ?  
            state.sortDirection = 'descending' :
            state.sortDirection = 'ascending'
        },
        setSortDirectionDefault: (state) => {
            state.sortDirection = 'descending' 
           
        },
        setSortedData: (state, action) => {
            state.sortedArray = action.payload
         },
         setPaginatedData: (state, action) => {
            state.paginatedArray = action.payload
         },
         setActualPaginNumber: (state, action) => {
            state.actualPaginNumber = action.payload
         },
         setPaginCount: (state, action) =>{
            state.paginCount = action.payload
         },
         setSearchResult: (state, action) => {
            state.searchResult = action.payload
            arrayProcessingAfterSearch(state)
         },
         setIsSearch: (state, action) => {
            state.isSearch = action.payload
            if(state.isSearch === false){
                state.searchResult = Object.assign([], state.employeesState);
                let clone = Object.assign([], state.searchResult);
                state.sortedArray = clone.sort(byField(state.sort, state.sortDirection))
                state.paginatedArray = createSubarray(state.sortedArray, state.paginCount)
               
            }
            
         },
         setSearchValue: (state, action) => {
            state.searchValue = action.payload
         }


    },
    extraReducers: {
    
    [getAllEmployees.fulfilled]: (state, action) => {
        state.loading = false
        state.employeesState = action.payload
        if(state.searchValue !== ''){
            let serchRes = searchPhrase(state.searchValue, state.employeesState)
            state.isSearch = serchRes.isSearch
            state.searchResult = serchRes.searchResult
            arrayProcessingAfterSearch(state)
           
        }else{
            state.searchResult = Object.assign([], state.employeesState);
        }
        
        let clone = Object.assign([], state.searchResult);
        state.sortedArray = clone.sort(byField(state.sort, state.sortDirection))
        state.paginatedArray = createSubarray(state.sortedArray, state.paginCount)

        
        
        state.success = true
    },
    [getAllEmployees.rejected]: (state) => {
        state.loading = false
    },
    [getAllEmployees.pending]: (state) => {
        state.loading = true
    },

  },
});
const { reducer, actions } = allEmployeesSlice;
export const { 
    setSort, 
    setSortDirection, 
    setSortedData, 
    setPaginatedData, 
    setActualPaginNumber, 
    setPaginCount, 
    setSortDirectionDefault,
    setSearchResult,
    setIsSearch,
    setSearchValue
} = actions
export default reducer;

