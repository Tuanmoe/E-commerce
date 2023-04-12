import { createSlice } from '@reduxjs/toolkit';

const initialState= {
    category:[],
    hidden:false,
}
const filterSlice=createSlice({
    name:'filter',
    initialState,
    reducers:{
        filterByCategory:(state,action)=> {
            state.category=action.payload;
        },
        isHidden:(state)=>{
            state.hidden=true;
        }
    }
})
export const {filterByCategory,isHidden}=filterSlice.actions
export default filterSlice.reducer;