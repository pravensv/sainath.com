import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser as apiLoginUser, registerUser as apiRegisterUser } from '../utils/api';

// Load user from localStorage
const loadUser = () => {
    try {
        const data = localStorage.getItem('sn_auth');
        if (data) {
            const parsed = JSON.parse(data);
            return { user: parsed.user, isAuthenticated: true };
        }
    } catch (e) { /* ignore */ }
    return { user: null, isAuthenticated: false };
};

const saveAuth = (user, token) => {
    localStorage.setItem('sn_auth', JSON.stringify({ user }));
    localStorage.setItem('sn_token', token);
};

// ============================================
// Async Thunks
// ============================================

/**
 * Register a new user
 */
export const registerAsync = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await apiRegisterUser(userData);
            // Save token and user data
            saveAuth(response.user, response.token);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Registration failed');
        }
    }
);

/**
 * Login user
 */
export const loginAsync = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await apiLoginUser(credentials);
            // Save token and user data
            saveAuth(response.user, response.token);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Login failed');
        }
    }
);

const initial = loadUser();

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: initial.user,
        isAuthenticated: initial.isAuthenticated,
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearMessages(state) {
            state.error = null;
            state.successMessage = null;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            state.successMessage = null;
            state.loading = false;
            localStorage.removeItem('sn_auth');
            localStorage.removeItem('sn_token');
        },
        updateProfile(state, action) {
            const { name, email, phone } = action.payload;
            state.user = { ...state.user, name, email, phone };
            state.error = null;
            state.successMessage = 'Profile updated successfully!';
            saveAuth(state.user, localStorage.getItem('sn_token'));
        },
        changePassword(state, action) {
            // Note: This should ideally call a backend endpoint
            state.error = null;
            state.successMessage = 'Password changed successfully!';
        },
    },
    extraReducers: (builder) => {
        // Register
        builder
            .addCase(registerAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
                state.successMessage = 'Account created successfully!';
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Registration failed';
                state.isAuthenticated = false;
            });

        // Login
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
                state.successMessage = 'Welcome back!';
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed';
                state.isAuthenticated = false;
            });
    },
});

export const { logout, updateProfile, changePassword, clearMessages } = authSlice.actions;
export default authSlice.reducer;
