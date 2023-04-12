import {createSlice} from '@reduxjs/toolkit'

const initialState={
    currentUser:false,
}
const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state) => {
            state.currentUser=true;
        },
        logout:(state) => {
            state.currentUser=false;
        }
    }
})
export const {login,logout}=authSlice.actions;
export default authSlice.reducer;