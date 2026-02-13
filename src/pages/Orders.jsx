import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Orders.module.css';

const STATUS_STEPS = ['confirmed', 'processing', 'shipped', 'delivered'];
const STATUS_LABELS = {
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
};
const STATUS_COLORS = {
    confirmed: '#4facfe',
    processing: '#ffa940',
    shipped: '#b37feb',
    delivered: '#52c41a',
};

const statusIcons = {
    confirmed: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    processing: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    ),
    shipped: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
    ),
    delivered: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
    ),
};

const Orders = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { orders } = useSelector((state) => state.orders);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    const userOrders = orders.filter(o => o.userId === user?.id);

    const formatDate = (iso) => {
        return new Date(iso).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStepIndex = (status) => STATUS_STEPS.indexOf(status);

    if (userOrders.length === 0) {
        return (
            <div className={styles.orders}>
                <div className={styles.container}>
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h2>No Orders Yet</h2>
                        <p>You haven't placed any orders. Start shopping to see your orders here!</p>
                        <button className={styles.shopBtn} onClick={() => navigate('/products')}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Start Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.orders}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <h1 className={styles.title}>My Orders</h1>
                    <span className={styles.orderCount}>{userOrders.length} order{userOrders.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Order List */}
                <div className={styles.orderList}>
                    {userOrders.map((order) => {
                        const currentStep = getStepIndex(order.status);
                        return (
                            <div key={order.id} className={styles.orderCard}>
                                <div className={styles.cardGlow} />

                                {/* Order Header */}
                                <div className={styles.orderHeader}>
                                    <div className={styles.orderId}>
                                        <span className={styles.orderIdLabel}>Order</span>
                                        <span className={styles.orderIdValue}>#{order.id}</span>
                                    </div>
                                    <div className={styles.orderDate}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {formatDate(order.placedAt)}
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div
                                    className={styles.statusBadge}
                                    style={{
                                        background: `${STATUS_COLORS[order.status]}20`,
                                        color: STATUS_COLORS[order.status],
                                        borderColor: `${STATUS_COLORS[order.status]}40`,
                                    }}
                                >
                                    {statusIcons[order.status]}
                                    {STATUS_LABELS[order.status]}
                                </div>

                                {/* Status Timeline */}
                                <div className={styles.timeline}>
                                    {STATUS_STEPS.map((step, i) => {
                                        const isCompleted = i <= currentStep;
                                        const isCurrent = i === currentStep;
                                        return (
                                            <div key={step} className={styles.timelineStep}>
                                                <div
                                                    className={`${styles.stepDot} ${isCompleted ? styles.stepCompleted : ''} ${isCurrent ? styles.stepCurrent : ''}`}
                                                    style={isCompleted ? { background: STATUS_COLORS[step], borderColor: STATUS_COLORS[step] } : {}}
                                                >
                                                    {isCompleted && (
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className={`${styles.stepLabel} ${isCompleted ? styles.stepLabelActive : ''}`}>
                                                    {STATUS_LABELS[step]}
                                                </span>
                                                {i < STATUS_STEPS.length - 1 && (
                                                    <div
                                                        className={styles.stepLine}
                                                        style={i < currentStep ? { background: STATUS_COLORS[STATUS_STEPS[i + 1]] } : {}}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Items */}
                                <div className={styles.orderItems}>
                                    <h4 className={styles.itemsTitle}>Items Ordered</h4>
                                    {order.items.map((item) => (
                                        <div key={item.id} className={styles.orderItem}>
                                            <div className={styles.itemDetails}>
                                                <span className={styles.itemName}>{item.name}</span>
                                                <span className={styles.itemQty}>x{item.quantity}</span>
                                            </div>
                                            <span className={styles.itemPrice}>₹{item.totalPrice.toLocaleString('en-IN')}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className={styles.orderFooter}>
                                    <div className={styles.shippingInfo}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{order.shippingInfo.address}, {order.shippingInfo.city} - {order.shippingInfo.pincode}</span>
                                    </div>
                                    <div className={styles.paymentInfo}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        <span>{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod === 'upi' ? 'UPI' : 'Card'}</span>
                                    </div>
                                    <div className={styles.orderTotal}>
                                        <span className={styles.totalLabel}>Total</span>
                                        <span className={styles.totalValue}>₹{order.totalAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Orders;
