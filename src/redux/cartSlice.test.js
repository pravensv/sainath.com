import cartReducer, { addToCart, removeFromCart, clearCart, updateQuantity } from '../redux/cartSlice';

describe('cartSlice', () => {
  const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  };

  const mockProduct = {
    id: 'test-product-1',
    name: 'Test Product',
    price: 10000,
  };

  it('should return the initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('addToCart', () => {
    it('should add a new item to cart', () => {
      const state = cartReducer(initialState, addToCart(mockProduct));
      
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual({
        ...mockProduct,
        quantity: 1,
        totalPrice: mockProduct.price,
      });
      expect(state.totalQuantity).toBe(1);
      expect(state.totalAmount).toBe(mockProduct.price);
    });

    it('should increment quantity if item already exists', () => {
      const stateWithItem = {
        items: [{
          ...mockProduct,
          quantity: 1,
          totalPrice: mockProduct.price,
        }],
        totalQuantity: 1,
        totalAmount: mockProduct.price,
      };

      const state = cartReducer(stateWithItem, addToCart(mockProduct));
      
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
      expect(state.items[0].totalPrice).toBe(mockProduct.price * 2);
      expect(state.totalQuantity).toBe(2);
      expect(state.totalAmount).toBe(mockProduct.price * 2);
    });
  });

  describe('removeFromCart', () => {
    it('should decrement quantity if item quantity > 1', () => {
      const stateWithItem = {
        items: [{
          ...mockProduct,
          quantity: 2,
          totalPrice: mockProduct.price * 2,
        }],
        totalQuantity: 2,
        totalAmount: mockProduct.price * 2,
      };

      const state = cartReducer(stateWithItem, removeFromCart(mockProduct.id));
      
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(1);
      expect(state.items[0].totalPrice).toBe(mockProduct.price);
      expect(state.totalQuantity).toBe(1);
      expect(state.totalAmount).toBe(mockProduct.price);
    });

    it('should remove item if quantity is 1', () => {
      const stateWithItem = {
        items: [{
          ...mockProduct,
          quantity: 1,
          totalPrice: mockProduct.price,
        }],
        totalQuantity: 1,
        totalAmount: mockProduct.price,
      };

      const state = cartReducer(stateWithItem, removeFromCart(mockProduct.id));
      
      expect(state.items).toHaveLength(0);
      expect(state.totalQuantity).toBe(0);
      expect(state.totalAmount).toBe(0);
    });

    it('should do nothing if item does not exist', () => {
      const state = cartReducer(initialState, removeFromCart('non-existent'));
      expect(state).toEqual(initialState);
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', () => {
      const stateWithItems = {
        items: [
          { ...mockProduct, quantity: 2, totalPrice: mockProduct.price * 2 },
        ],
        totalQuantity: 2,
        totalAmount: mockProduct.price * 2,
      };

      const state = cartReducer(stateWithItems, clearCart());
      expect(state).toEqual(initialState);
    });
  });

  describe('updateQuantity', () => {
    it('should update quantity of existing item', () => {
      const stateWithItem = {
        items: [{
          ...mockProduct,
          quantity: 2,
          totalPrice: mockProduct.price * 2,
        }],
        totalQuantity: 2,
        totalAmount: mockProduct.price * 2,
      };

      const state = cartReducer(stateWithItem, updateQuantity({ id: mockProduct.id, quantity: 5 }));
      
      expect(state.items[0].quantity).toBe(5);
      expect(state.items[0].totalPrice).toBe(mockProduct.price * 5);
      expect(state.totalQuantity).toBe(5);
      expect(state.totalAmount).toBe(mockProduct.price * 5);
    });

    it('should not update if quantity is 0 or negative', () => {
      const stateWithItem = {
        items: [{
          ...mockProduct,
          quantity: 2,
          totalPrice: mockProduct.price * 2,
        }],
        totalQuantity: 2,
        totalAmount: mockProduct.price * 2,
      };

      const state = cartReducer(stateWithItem, updateQuantity({ id: mockProduct.id, quantity: 0 }));
      expect(state).toEqual(stateWithItem);
    });

    it('should not update if item does not exist', () => {
      const state = cartReducer(initialState, updateQuantity({ id: 'non-existent', quantity: 5 }));
      expect(state).toEqual(initialState);
    });
  });
});
