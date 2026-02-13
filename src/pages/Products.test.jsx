import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Products from '../pages/Products';
import cartReducer from '../redux/cartSlice';
import productsReducer from '../redux/productsSlice';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithProviders = (component, preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      products: productsReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('Products', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders all products title when no category selected', () => {
    renderWithProviders(<Products />);
    expect(screen.getByText('All Products')).toBeInTheDocument();
  });

  it('displays categories when no category is selected', () => {
    renderWithProviders(<Products />);
    expect(screen.getByText('Browse by Category')).toBeInTheDocument();
    expect(screen.getByText('Mobile Phones')).toBeInTheDocument();
    expect(screen.getByText('Mobile Accessories')).toBeInTheDocument();
  });

  it('displays brands when category is selected', () => {
    const preloadedState = {
      products: {
        selectedCategory: 'mobiles',
        selectedBrand: null,
      },
    };

    renderWithProviders(<Products />, preloadedState);
    expect(screen.getByText('Select Brand')).toBeInTheDocument();
  });

  it('displays back button when category is selected', () => {
    const preloadedState = {
      products: {
        selectedCategory: 'mobiles',
        selectedBrand: null,
      },
    };

    renderWithProviders(<Products />, preloadedState);
    expect(screen.getByText('Back')).toBeInTheDocument();
  });
});
