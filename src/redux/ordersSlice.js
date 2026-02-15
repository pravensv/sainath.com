import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    placeOrder as apiPlaceOrder,
    fetchUserOrders as apiFetchUserOrders
} from '../utils/api';

// ============================================
// Async Thunks
// ============================================

/**
 * Place a new order (requires authentication)
 */
export const placeOrderAsync = createAsyncThunk(
    'orders/placeOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const order = await apiPlaceOrder(orderData);
            return order;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to place order');
        }
    }
);

/**
 * Fetch user's orders (requires authentication)
 */
export const fetchOrdersAsync = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const orders = await apiFetchUserOrders();
            return orders;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch orders');
        }
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
        clearOrders: (state) => {
            state.orders = [];
        },
    },
    extraReducers: (builder) => {
        // Place Order
        builder
            .addCase(placeOrderAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(placeOrderAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.unshift(action.payload);
                state.error = null;
                state.successMessage = 'Order placed successfully!';
            })
            .addCase(placeOrderAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.successMessage = null;
            });

        // Fetch Orders
        builder
            .addCase(fetchOrdersAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.error = null;
            })
            .addCase(fetchOrdersAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearMessages, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
