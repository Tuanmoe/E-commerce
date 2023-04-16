import { createSlice } from '@reduxjs/toolkit';

const initialState= {
    stores:[],
}
const storesSlice=createSlice({
    name:'store',
    initialState,
    reducers:{
        addToStores:(state,action) =>{
            state.stores.push(...action.payload);
        }
    }
})
export const {addToStores}=storesSlice.actions
export default storesSlice.reducer;