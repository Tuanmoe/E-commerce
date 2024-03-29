import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartReducer'
import authReducer from './authReducer'
import filterReducer from './filterReducer'
import storesReducer from './StoresReducer'

export const store = configureStore({
  reducer: {
    cart:cartReducer,
    auth:authReducer,
    filter:filterReducer,
    store:storesReducer,
  },
})