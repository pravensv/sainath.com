import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Navbar from '../components/Navbar';
import cartReducer from '../redux/cartSlice';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithProviders = (component, initialState = {}) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: initialState,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders navbar with logo', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Sai Nath')).toBeInTheDocument();
    expect(screen.getByText('Mobile')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('renders profile and cart buttons', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByLabelText('User Profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Shopping Cart')).toBeInTheDocument();
  });

  it('displays cart badge when cart has items', () => {
    const initialState = {
      cart: {
        items: [{ id: '1', quantity: 2 }],
        totalQuantity: 2,
        totalAmount: 1000,
      },
    };

    renderWithProviders(<Navbar />, initialState);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('does not display cart badge when cart is empty', () => {
    renderWithProviders(<Navbar />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('navigates to profile when profile button is clicked', () => {
    renderWithProviders(<Navbar />);
    fireEvent.click(screen.getByLabelText('User Profile'));
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  it('navigates to cart when cart button is clicked', () => {
    renderWithProviders(<Navbar />);
    fireEvent.click(screen.getByLabelText('Shopping Cart'));
    expect(mockNavigate).toHaveBeenCalledWith('/cart');
  });
});
