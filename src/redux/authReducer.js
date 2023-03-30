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
        }
    }
})
export const {login}=authSlice.actions;
export default authSlice.reducer;