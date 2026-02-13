import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Checkout from '../pages/Checkout';
import cartReducer from '../redux/cartSlice';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithProviders = (component, preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('Checkout', () => {
  const preloadedState = {
    cart: {
      items: [
        {
          id: 'test-1',
          name: 'Test Product',
          price: 10000,
          quantity: 1,
          totalPrice: 10000,
        },
      ],
      totalQuantity: 1,
      totalAmount: 10000,
    },
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders checkout form', () => {
    renderWithProviders(<Checkout />, preloadedState);
    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });

  it('displays delivery information section', () => {
    renderWithProviders(<Checkout />, preloadedState);
    expect(screen.getByText('Delivery Information')).toBeInTheDocument();
  });

  it('displays payment method section', () => {
    renderWithProviders(<Checkout />, preloadedState);
    expect(screen.getByText('Payment Method')).toBeInTheDocument();
  });

  it('displays order summary', () => {
    renderWithProviders(<Checkout />, preloadedState);
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    renderWithProviders(<Checkout />, preloadedState);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pincode/i)).toBeInTheDocument();
  });

  it('displays payment options', () => {
    renderWithProviders(<Checkout />, preloadedState);
    expect(screen.getByText('Credit/Debit Card')).toBeInTheDocument();
    expect(screen.getByText('UPI')).toBeInTheDocument();
    expect(screen.getByText('Cash on Delivery')).toBeInTheDocument();
  });

  it('shows success message after form submission', () => {
    renderWithProviders(<Checkout />, preloadedState);
    
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: 'Test Address' } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Test City' } });
    fireEvent.change(screen.getByLabelText(/Pincode/i), { target: { value: '123456' } });
    
    fireEvent.click(screen.getByText('Place Order'));
    
    expect(screen.getByText('Order Placed Successfully!')).toBeInTheDocument();
  });
});
