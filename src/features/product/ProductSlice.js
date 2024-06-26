import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchAllProducts, fetchProductsByFilters} from './ProductAPI';

const initialState = {
  products: [],
  status: 'idle',
};


export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFiltersAsync',
  async (filter) => {
    const response = await fetchProductsByFilters(filter);
    return response.data;
  }
);

export const ProductSlice = createSlice({
  name: 'product',
  // status : 'idle',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {        
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      });
  },
});


export const { increment} = ProductSlice.actions;


export const selectAllProducts = (state) => state.product.products;


export default ProductSlice.reducer;
