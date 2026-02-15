import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProducts as apiFetchProducts,
  fetchCategories as apiFetchCategories,
  fetchBrands as apiFetchBrands,
  fetchProductById as apiFetchProductById
} from '../utils/api';

// ============================================
// Async Thunks
// ============================================

/**
 * Fetch all products with optional filters
 */
export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const products = await apiFetchProducts(params);
      return products;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

/**
 * Fetch all categories
 */
export const fetchCategoriesAsync = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await apiFetchCategories();
      return categories;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch categories');
    }
  }
);

/**
 * Fetch all brands
 */
export const fetchBrandsAsync = createAsyncThunk(
  'products/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const brands = await apiFetchBrands();
      return brands;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch brands');
    }
  }
);

/**
 * Fetch a single product by ID
 */
export const fetchProductByIdAsync = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const product = await apiFetchProductById(id);
      return product;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch product');
    }
  }
);

const initialState = {
  categories: [],
  brands: [],
  products: [],
  selectedCategory: null,
  selectedBrand: null,
  selectedProduct: null,
  loading: false,
  error: null,
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
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Categories
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Brands
    builder
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
        state.error = null;
      })
      .addCase(fetchBrandsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Product By ID
    builder
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedCategory,
  setSelectedBrand,
  setSelectedProduct,
  clearSelection,
  clearError,
} = productsSlice.actions;

export default productsSlice.reducer;
