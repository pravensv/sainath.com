import { createSlice } from '@reduxjs/toolkit';
import productsData from '../data/products.json';

const initialState = {
  categories: productsData.categories,
  brands: productsData.brands,
  products: productsData.products,
  selectedCategory: null,
  selectedBrand: null,
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.selectedBrand = null;
      state.selectedProduct = null;
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
      state.selectedProduct = null;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelection: (state) => {
      state.selectedCategory = null;
      state.selectedBrand = null;
      state.selectedProduct = null;
    },
  },
});

export const {
  setSelectedCategory,
  setSelectedBrand,
  setSelectedProduct,
  clearSelection,
} = productsSlice.actions;

export default productsSlice.reducer;
