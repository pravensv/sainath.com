# Sai Nath Mobile - Technical Documentation

## Architecture Overview

### Technology Stack

**Frontend Framework**
- React 18.2.0
- React Router DOM 6.20.0 for routing
- Vite 5.0.8 as build tool

**State Management**
- Redux Toolkit 1.9.7
- React Redux 8.1.3

**Styling**
- CSS Modules for component-scoped styling
- Custom CSS variables for theming
- Google Fonts (Righteous, Work Sans)

**Testing**
- Jest 29.7.0
- React Testing Library 14.1.2
- Jest DOM for DOM assertions
- 100% code coverage requirement

### Project Architecture

```
┌─────────────────┐
│   React App     │
│   (main.jsx)    │
└────────┬────────┘
         │
    ┌────▼─────┐
    │   App    │
    │  Router  │
    └────┬─────┘
         │
    ┌────▼─────────────────────┐
    │   Redux Provider          │
    │   (store.js)              │
    └────┬──────────────────────┘
         │
    ┌────▼────────────┐
    │   Components     │
    │   - Navbar       │
    │   - Pages        │
    └──────────────────┘
```

## Component Structure

### Navbar Component
**Location**: `src/components/Navbar.jsx`

**Responsibilities**:
- Display application logo and branding
- Navigation links (Home, Products)
- User profile access
- Shopping cart with item count badge

**Props**: None (uses Redux store)

**State**:
- `cartQuantity` - from Redux store

### Home Page
**Location**: `src/pages/Home.jsx`

**Sections**:
1. Hero Section - Welcome banner with CTA
2. Categories - Browse by category
3. Featured Products - Top 6 products
4. Features - Key selling points

**Interactions**:
- Category selection → navigates to Products page
- Product click → navigates to ProductDetails page
- CTA button → navigates to Products page

### Products Page
**Location**: `src/pages/Products.jsx`

**Flow**:
1. Show all categories (initial state)
2. Show brands for selected category
3. Show products for selected brand/category

**Redux Actions**:
- `setSelectedCategory`
- `setSelectedBrand`
- Back button resets selections

### ProductDetails Page
**Location**: `src/pages/ProductDetails.jsx`

**Features**:
- Product image placeholder
- Brand badge
- Star rating display
- Specifications table
- Stock status indicator
- Add to Cart button
- Buy Now button

**Redux Actions**:
- `addToCart` - adds product to cart

### Cart Page
**Location**: `src/pages/Cart.jsx`

**Features**:
- Empty cart state with CTA
- Cart items list with images
- Quantity controls (+/-)
- Remove item button
- Order summary
- Clear cart option
- Checkout button

**Redux Actions**:
- `updateQuantity`
- `removeFromCart`
- `clearCart`

### Checkout Page
**Location**: `src/pages/Checkout.jsx`

**Form Fields**:
- Full Name
- Email
- Phone Number
- Address
- City
- Pincode

**Payment Methods**:
- Credit/Debit Card
- UPI
- Cash on Delivery

**Flow**:
1. Display form and order summary
2. Form validation
3. Submit order
4. Show success message
5. Clear cart

### Profile Page
**Location**: `src/pages/Profile.jsx`

**Displays**:
- User avatar
- Account information
- Edit profile button
- Change password button

## Redux Store Architecture

### Cart Slice
**Location**: `src/redux/cartSlice.js`

**State Structure**:
```javascript
{
  items: [
    {
      id: string,
      name: string,
      price: number,
      quantity: number,
      totalPrice: number
    }
  ],
  totalQuantity: number,
  totalAmount: number
}
```

**Actions**:
- `addToCart(product)` - Add product or increment quantity
- `removeFromCart(id)` - Remove or decrement quantity
- `updateQuantity({id, quantity})` - Set specific quantity
- `clearCart()` - Remove all items

### Products Slice
**Location**: `src/redux/productsSlice.js`

**State Structure**:
```javascript
{
  categories: Array,
  brands: Array,
  products: Array,
  selectedCategory: string | null,
  selectedBrand: string | null,
  selectedProduct: string | null
}
```

**Actions**:
- `setSelectedCategory(categoryId)`
- `setSelectedBrand(brandId)`
- `setSelectedProduct(productId)`
- `clearSelection()`

## Data Structure

### Product Object
```javascript
{
  id: string,
  name: string,
  brandId: string,
  categoryId: string,
  price: number,
  image: string,
  specifications: {
    display: string,
    processor: string,
    camera: string,
    battery: string,
    storage: string,
    ram: string
  },
  inStock: boolean,
  rating: number
}
```

### Category Object
```javascript
{
  id: string,
  name: string,
  image: string,
  description: string
}
```

### Brand Object
```javascript
{
  id: string,
  name: string,
  categoryId: string,
  logo: string
}
```

## Styling System

### CSS Variables
Defined in `src/styles/global.css`:

**Colors**:
- `--primary-color`: #667eea
- `--secondary-color`: #764ba2
- `--accent-color`: #4facfe
- `--success-color`: #00d4aa
- `--danger-color`: #f5576c

**Backgrounds**:
- `--bg-primary`: #0a0a0f
- `--bg-secondary`: #15151f
- `--bg-card`: #1e1e2e

**Text**:
- `--text-primary`: #ffffff
- `--text-secondary`: #b4b4c8
- `--text-muted`: #7a7a8c

### CSS Modules Pattern
Each component has its own `.module.css` file:
- Scoped styles prevent conflicts
- BEM-like naming within modules
- Imported as objects in components

## Testing Strategy

### Unit Tests
- Redux slices (actions and reducers)
- Individual component rendering
- Component interactions

### Integration Tests
- Redux store integration
- React Router navigation
- Component state management

### Coverage Requirements
- Branches: 100%
- Functions: 100%
- Lines: 100%
- Statements: 100%

### Test Files Location
- Component tests: `*.test.jsx` next to component
- Redux tests: `*.test.js` in redux folder

## Build and Deployment

### Development Build
```bash
npm run dev
```
- Hot Module Replacement enabled
- Source maps for debugging
- Fast refresh

### Production Build
```bash
npm run build
```
- Minified and optimized code
- Tree-shaking for smaller bundle
- Output to `dist/` folder

### Build Optimization
- Code splitting by route
- CSS extraction and minification
- Asset optimization
- Gzip compression ready

## Performance Considerations

### Component Optimization
- CSS Modules for scoped styling
- Minimal re-renders with Redux selectors
- Lazy loading potential for routes

### Bundle Size
- No external CSS frameworks
- Minimal dependencies
- Tree-shakeable imports

### Runtime Performance
- CSS transitions over JavaScript animations
- Debounced user inputs where applicable
- Efficient Redux state updates

## Browser Support

### Tested Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Mobile Support
- iOS Safari
- Chrome Mobile
- Responsive breakpoints at 768px and 1024px

## Environment Variables

Currently no environment variables required.
All configuration is code-based.

## Future Scalability

### Potential Enhancements
1. **API Integration**
   - Replace mock JSON with REST API
   - Add loading and error states

2. **Authentication**
   - User login/logout
   - Protected routes
   - Session management

3. **Advanced Features**
   - Search functionality
   - Filtering and sorting
   - Pagination
   - Wishlist

4. **Performance**
   - Route-based code splitting
   - Image lazy loading
   - Virtual scrolling for large lists

## Maintenance Guidelines

### Code Standards
- Use functional components
- Follow React Hooks best practices
- Maintain test coverage above 100%
- Use CSS Modules for styling
- Keep components under 300 lines

### Git Workflow
- Feature branches from main
- PR reviews required
- All tests must pass
- No direct commits to main

### Documentation
- Update README for new features
- Comment complex logic
- Keep this technical doc current

---

Last Updated: February 2026
Version: 1.0.0
