import { createSlice } from '@reduxjs/toolkit';

const initialState= {
    category:"",
    search:"",
    range:0,
}
const filterSlice=createSlice({
    name:'filter',
    initialState,
    reducers:{
        filterByCategory:(state,action)=> {
            state.category=action.payload;
        },
        filterBySearch:(state,action)=> {
            state.search=action.payload;
        },
        filterByRange:(state,action)=> {
            state.range=action.payload;
        },
        
    }
})
export const {filterByCategory,filterBySearch,filterByRange}=filterSlice.actions
export default filterSlice.reducer;