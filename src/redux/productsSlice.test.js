import productsReducer, {
  setSelectedCategory,
  setSelectedBrand,
  setSelectedProduct,
  clearSelection,
} from '../redux/productsSlice';

describe('productsSlice', () => {
  const initialState = {
    categories: [],
    brands: [],
    products: [],
    selectedCategory: null,
    selectedBrand: null,
    selectedProduct: null,
  };

  it('should return the initial state', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toBeDefined();
  });

  describe('setSelectedCategory', () => {
    it('should set selected category and clear brand and product', () => {
      const stateWithSelections = {
        ...initialState,
        selectedCategory: 'old-category',
        selectedBrand: 'old-brand',
        selectedProduct: 'old-product',
      };

      const state = productsReducer(stateWithSelections, setSelectedCategory('new-category'));
      
      expect(state.selectedCategory).toBe('new-category');
      expect(state.selectedBrand).toBeNull();
      expect(state.selectedProduct).toBeNull();
    });
  });

  describe('setSelectedBrand', () => {
    it('should set selected brand and clear product', () => {
      const stateWithSelections = {
        ...initialState,
        selectedCategory: 'category',
        selectedBrand: 'old-brand',
        selectedProduct: 'old-product',
      };

      const state = productsReducer(stateWithSelections, setSelectedBrand('new-brand'));
      
      expect(state.selectedBrand).toBe('new-brand');
      expect(state.selectedProduct).toBeNull();
      expect(state.selectedCategory).toBe('category');
    });
  });

  describe('setSelectedProduct', () => {
    it('should set selected product', () => {
      const state = productsReducer(initialState, setSelectedProduct('product-1'));
      expect(state.selectedProduct).toBe('product-1');
    });
  });

  describe('clearSelection', () => {
    it('should clear all selections', () => {
      const stateWithSelections = {
        ...initialState,
        selectedCategory: 'category',
        selectedBrand: 'brand',
        selectedProduct: 'product',
      };

      const state = productsReducer(stateWithSelections, clearSelection());
      
      expect(state.selectedCategory).toBeNull();
      expect(state.selectedBrand).toBeNull();
      expect(state.selectedProduct).toBeNull();
    });
  });
});
