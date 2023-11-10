import { createSlice } from '@reduxjs/toolkit';
import ProductState from './types/ProductState';
import { loadProducts } from './productAction';

const initial: ProductState = {
  products: [],
  basket: [],
  isLoading: false,
  error: null,
  favorites: []
};

export const productSlice = createSlice({
  name: 'products',
  initialState: initial,
  reducers: {
    addToBasket: (state, action) => {
      const productID = action.payload;
      console.log(productID);
      const index = state.basket.indexOf(productID);
      if (index === -1) {
        state.basket.push(productID);
      } else {
        state.basket.splice(index, 1);
      }
    },
    toggleFavorites: (state, action) => {
      const productID = action.payload;

      const index = state.favorites.indexOf(productID);
      if (index === -1) {
        state.favorites.push(productID);
      } else {
        state.favorites.splice(index, 1);
      }
    }
  },
    extraReducers: (builder) => {
      builder

        .addCase(loadProducts.pending, (state) => {
          state.isLoading = true
        })

        .addCase(loadProducts.fulfilled, (state, action) => {
          state.isLoading = false
          state.products = action.payload
        })

        .addCase(loadProducts.rejected, (state, action) => {
          state.isLoading = false
          state.products = []
          state.error = action.payload as string
        })
    }
  })

  export const { addToBasket, toggleFavorites } = productSlice.actions
