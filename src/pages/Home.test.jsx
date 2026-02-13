import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Home from '../pages/Home';
import cartReducer from '../redux/cartSlice';
import productsReducer from '../redux/productsSlice';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithProviders = (component) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      products: productsReducer,
    },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('Home', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders hero section with title', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
    expect(screen.getByText(/Sai Nath Mobile/i)).toBeInTheDocument();
  });

  it('renders categories section', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('Shop by Category')).toBeInTheDocument();
  });

  it('renders featured products section', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('Featured Products')).toBeInTheDocument();
  });

  it('renders features section', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('Best Prices')).toBeInTheDocument();
    expect(screen.getByText('Genuine Products')).toBeInTheDocument();
    expect(screen.getByText('Fast Delivery')).toBeInTheDocument();
  });

  it('navigates to products page when CTA button is clicked', () => {
    renderWithProviders(<Home />);
    fireEvent.click(screen.getByText('Explore Products'));
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });

  it('displays category cards', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('Mobile Phones')).toBeInTheDocument();
    expect(screen.getByText('Mobile Accessories')).toBeInTheDocument();
  });
});
