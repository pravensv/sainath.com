import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductDetails from '../pages/ProductDetails';
import cartReducer from '../redux/cartSlice';
import productsReducer from '../redux/productsSlice';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: 'iphone-15-pro' }),
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={component} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

describe('ProductDetails', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders product details', () => {
    renderWithProviders(<ProductDetails />);
    expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
  });

  it('displays product specifications', () => {
    renderWithProviders(<ProductDetails />);
    expect(screen.getByText('Specifications')).toBeInTheDocument();
  });

  it('displays add to cart button', () => {
    renderWithProviders(<ProductDetails />);
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('displays buy now button', () => {
    renderWithProviders(<ProductDetails />);
    expect(screen.getByText('Buy Now')).toBeInTheDocument();
  });

  it('navigates to cart when Buy Now is clicked', () => {
    renderWithProviders(<ProductDetails />);
    fireEvent.click(screen.getByText('Buy Now'));
    expect(mockNavigate).toHaveBeenCalledWith('/cart');
  });

  it('displays back button', () => {
    renderWithProviders(<ProductDetails />);
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('navigates back when back button is clicked', () => {
    renderWithProviders(<ProductDetails />);
    fireEvent.click(screen.getByText('Back'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
