import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('sn_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            if (status === 401) {
                // Unauthorized - clear token and redirect to login
                localStorage.removeItem('sn_token');
                localStorage.removeItem('sn_auth');
                window.location.href = '/sainath.com/signin';
            }

            // Return formatted error
            return Promise.reject({
                message: data.message || data || 'An error occurred',
                status,
                data,
            });
        } else if (error.request) {
            // Request made but no response
            return Promise.reject({
                message: 'Network error. Please check your connection.',
                status: 0,
            });
        } else {
            // Error in request setup
            return Promise.reject({
                message: error.message || 'An unexpected error occurred',
                status: 0,
            });
        }
    }
);

// ============================================
// Auth API Methods
// ============================================

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email
 * @param {string} userData.phone - User's phone number
 * @param {string} userData.password - User's password
 * @returns {Promise<{user: Object, token: string}>}
 */
export const registerUser = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

/**
 * Login user
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User's email
 * @param {string} credentials.password - User's password
 * @returns {Promise<{user: Object, token: string}>}
 */
export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

// ============================================
// Products API Methods
// ============================================

/**
 * Fetch all products with optional filters
 * @param {Object} params - Query parameters
 * @param {string} params.brandId - Filter by brand ID
 * @param {string} params.categoryId - Filter by category ID
 * @returns {Promise<Array>}
 */
export const fetchProducts = async (params = {}) => {
    const response = await api.get('/api/products', { params });
    return response.data;
};

/**
 * Fetch a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>}
 */
export const fetchProductById = async (id) => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
};

/**
 * Fetch all categories
 * @returns {Promise<Array>}
 */
export const fetchCategories = async () => {
    const response = await api.get('/api/categories');
    return response.data;
};

/**
 * Fetch all brands
 * @returns {Promise<Array>}
 */
export const fetchBrands = async () => {
    const response = await api.get('/api/brands');
    return response.data;
};

// ============================================
// Orders API Methods
// ============================================

/**
 * Place a new order (requires authentication)
 * @param {Object} orderData - Order details
 * @param {Array} orderData.items - Order items
 * @param {number} orderData.totalAmount - Total amount
 * @param {Object} orderData.shippingInfo - Shipping information
 * @param {string} orderData.paymentMethod - Payment method
 * @returns {Promise<Object>}
 */
export const placeOrder = async (orderData) => {
    const response = await api.post('/api/orders', orderData);
    return response.data;
};

/**
 * Fetch user's orders (requires authentication)
 * @returns {Promise<Array>}
 */
export const fetchUserOrders = async () => {
    const response = await api.get('/api/orders');
    return response.data;
};

export default api;
