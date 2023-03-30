import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  products:[],
  openModal:false,
  openProductModal:false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.items.find(item => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    openProductModal:(state,action) => {
      const itemInModal =  state.products.find(product => product.id === action.payload.id);
      if(!itemInModal) {
        state.products.push({ ...action.payload });
        state.products=state.products.filter(product => product.id === action.payload.id);        
      };
      state.openProductModal=true;
    },
    openCartModal:(state) => {
      if(!state.openModal) {
        state.openModal=true;
      } else {
        state.openModal=false;
      }
      },
    closeProductModal:(state) => {
      state.openProductModal=false;

    }
    
  }
});

export const { addToCart,openCartModal,openProductModal,closeProductModal } = cartSlice.actions;
export default cartSlice.reducer;
