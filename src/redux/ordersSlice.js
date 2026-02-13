import { createSlice } from '@reduxjs/toolkit';

// Persist helpers
const loadOrders = () => {
    try {
        const data = localStorage.getItem('sn_orders');
        return data ? JSON.parse(data) : [];
    } catch { return []; }
};

const saveOrders = (orders) => {
    localStorage.setItem('sn_orders', JSON.stringify(orders));
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: loadOrders(),
    },
    reducers: {
        placeOrder: (state, action) => {
            const {
                items,
                totalAmount,
                shippingInfo,
                paymentMethod,
                userId,
            } = action.payload;

            const order = {
                id: `ORD-${Date.now()}`,
                items: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    totalPrice: item.totalPrice,
                    image: item.image,
                })),
                totalAmount,
                shippingInfo,
                paymentMethod,
                status: 'confirmed',
                placedAt: new Date().toISOString(),
                userId,
                statusHistory: [
                    { status: 'confirmed', date: new Date().toISOString() },
                ],
            };

            state.orders.unshift(order);
            saveOrders(state.orders);
        },

        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload;
            const order = state.orders.find(o => o.id === orderId);
            if (order) {
                order.status = status;
                order.statusHistory.push({
                    status,
                    date: new Date().toISOString(),
                });
                saveOrders(state.orders);
            }
        },

        clearOrders: (state) => {
            state.orders = [];
            saveOrders(state.orders);
        },
    },
});

export const { placeOrder, updateOrderStatus, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
