import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Cart from '../pages/Cart';
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

describe('Cart', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('displays empty cart message when cart is empty', () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Browse Products')).toBeInTheDocument();
  });

  it('navigates to products when Browse Products is clicked in empty cart', () => {
    renderWithProviders(<Cart />);
    fireEvent.click(screen.getByText('Browse Products'));
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });

  it('displays cart items when cart has products', () => {
    const preloadedState = {
      cart: {
        items: [
          {
            id: 'test-1',
            name: 'Test Product',
            price: 10000,
            quantity: 2,
            totalPrice: 20000,
          },
        ],
        totalQuantity: 2,
        totalAmount: 20000,
      },
    };

    renderWithProviders(<Cart />, preloadedState);
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('displays order summary', () => {
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

    renderWithProviders(<Cart />, preloadedState);
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Proceed to Checkout')).toBeInTheDocument();
  });

  it('navigates to checkout when Proceed to Checkout is clicked', () => {
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

    renderWithProviders(<Cart />, preloadedState);
    fireEvent.click(screen.getByText('Proceed to Checkout'));
    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
  });

  it('navigates to products when Continue Shopping is clicked', () => {
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

    renderWithProviders(<Cart />, preloadedState);
    fireEvent.click(screen.getByText('Continue Shopping'));
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });
});
