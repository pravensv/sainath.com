# Sai Nath Mobile - E-Commerce Application

A modern, responsive e-commerce application built with React + Vite, featuring a distinctive design aesthetic and comprehensive testing coverage.

![Sai Nath Mobile](./preview.png)

## 🌟 Features

### Core Features
- **Product Catalog**: Browse mobile phones and accessories by category and brand
- **Product Details**: View detailed specifications, pricing, and ratings
- **Shopping Cart**: Real-time cart updates with quantity management
- **Checkout**: Streamlined checkout process with multiple payment options
- **User Profile**: Manage user account information
- **Responsive Design**: Optimized for both mobile and desktop devices

### Technical Highlights
- ⚡ Built with React + Vite for lightning-fast development
- 🎨 Custom CSS Modules with distinctive modern design
- 🔄 Redux Toolkit for state management
- 🧪 100% test coverage with Jest and React Testing Library
- 📦 Mock JSON data for products
- 🎯 TypeScript-ready architecture

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sai-nath-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
sai-nath-mobile/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Navbar.module.css
│   │   └── Navbar.test.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Profile.jsx
│   │   └── *.module.css    # Page-specific styles
│   ├── redux/              # Redux store and slices
│   │   ├── store.js
│   │   ├── cartSlice.js
│   │   ├── productsSlice.js
│   │   └── *.test.js       # Redux tests
│   ├── data/               # Mock JSON data
│   │   └── products.json
│   ├── styles/             # Global styles
│   │   └── global.css
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── public/                 # Static assets
├── __mocks__/             # Jest mocks
├── jest.config.js         # Jest configuration
├── vite.config.js         # Vite configuration
└── package.json
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Coverage Report
The project maintains 100% code coverage across:
- All React components
- Redux store and slices
- User interactions
- Navigation flows

## 🎨 Design System

### Color Palette
- **Primary Gradient**: Purple to violet (`#667eea` to `#764ba2`)
- **Secondary Gradient**: Pink to red (`#f093fb` to `#f5576c`)
- **Accent Gradient**: Blue to cyan (`#4facfe` to `#00f2fe`)
- **Dark Theme**: Deep blacks with subtle gradients

### Typography
- **Display Font**: Righteous (for headings and brand)
- **Body Font**: Work Sans (for content)

### Design Principles
- **Bold & Vibrant**: Distinctive gradients and modern aesthetics
- **Smooth Animations**: Subtle transitions and hover effects
- **Card-based Layout**: Consistent spacing and elevation
- **Accessibility**: Focus states and semantic HTML

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage report

## 🛒 User Flow

1. **Browse Products**
   - View featured products on home page
   - Navigate by category (Mobile Phones / Accessories)
   - Filter by brand within each category

2. **Product Details**
   - View detailed specifications
   - Check pricing and availability
   - Add to cart or buy now

3. **Shopping Cart**
   - Adjust quantities
   - Remove items
   - View order summary
   - Proceed to checkout

4. **Checkout**
   - Enter delivery information
   - Select payment method
   - Place order
   - View order confirmation

## 🔧 Configuration

### Vite Configuration
The project uses Vite for fast build times and hot module replacement. Configuration can be found in `vite.config.js`.

### Jest Configuration
Testing is configured with Jest and React Testing Library. See `jest.config.js` for details.

## 📊 Product Data

Product data is stored in JSON format at `src/data/products.json` and includes:
- Categories (Mobile Phones, Accessories)
- Brands (Apple, Samsung, OnePlus, Xiaomi)
- Products with specifications, pricing, and ratings

## 🎯 Future Enhancements

- User authentication and authorization
- Order history and tracking
- Product reviews and ratings
- Wishlist functionality
- Search and filter capabilities
- Payment gateway integration
- Product image uploads
- Admin dashboard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Sai Nath Mobile Team**

## 🙏 Acknowledgments

- React Team for the amazing framework
- Vite for the blazing fast build tool
- Redux Toolkit for simplified state management
- The open-source community

---

Built with ❤️ using React + Vite

 git add -A   
git commit -m "fix: auto-enable GitHub Pages in deploy workflow"
git push origin main




Ai prompt

Create a premium e-commerce web application called "Sai Nath Mobile" — an online mobile phone and accessories store based in Hyderabad, India. Use React + Vite with a dark/premium aesthetic theme.

Tech Stack
React 18 with Vite (JavaScript, not TypeScript)
React Router DOM v6 for routing
Redux Toolkit with React Redux for state management
CSS Modules for styling (no Tailwind)
Google Fonts: Righteous (display) + Work Sans (body)
Jest + React Testing Library for tests
Design System (Dark Theme)
Background: Deep dark navy/black (#0a0a0f, #15151f, #1e1e2e)
Primary gradient: Purple-blue (#667eea → #764ba2)
Accent: Cyan-blue (#4facfe)
Text: White primary, muted grays for secondary
Style: Glassmorphism cards, glow effects, gradient accents, smooth transitions, hover animations
Typography: Righteous for headings, Work Sans for body text
Pages & Routes
Home (/) — Hero section with animated phone product cards floating/rotating, "Welcome to Sai Nath Mobile" heading with gradient text, "Explore Products" CTA button, "Browse by Category" section showing Mobiles & Accessories cards, "Featured Products" grid showing 6 products with images, ratings (stars), and prices in INR (₹)
Products (/products) — Browse by Category → Select Brand → View Products. Three-level drill-down:
First shows category cards (Mobiles, Accessories) with icons
Clicking a category shows brand cards for that category
Clicking a brand shows product grid with images, ratings, stock badges, prices
Back button to go up a level
Product Details (/product/:id) — Product image, name, brand, price, rating, description, specs list, stock status, "Add to Cart" button, quantity selector
Cart (/cart) — Cart items with quantity +/- controls, remove button, item totals, subtotal, "Proceed to Checkout" button, empty cart state with "Continue Shopping" link
Checkout (/checkout) — Requires authentication (redirect to /signin if not logged in). Delivery form (name, email, phone pre-filled from profile, address, city, pincode), payment method selection (Card/UPI/COD), order summary sidebar with subtotal + tax 18% + free delivery, "Place Order" button, success page after ordering
Sign In (/signin) — Email & password form, show/hide password toggle, validation, error messages, "Don't have an account? Sign Up" link, redirects to /profile on success
Sign Up (/signup) — Full name, email, phone, password (with strength indicator: Weak/Fair/Good/Strong/Very Strong), confirm password (with match validation), min 6 characters, "Already have an account? Sign In" link, auto-login on success
Profile (/profile) — Shows user avatar (first letter of name in a gradient circle), name, email, phone, member since date. Buttons: "Edit Profile", "Change Password", "Sign Out". Redirects to /signin if not authenticated
Edit Profile (/edit-profile) — Pre-filled form with user data, save/cancel buttons, redirects back to profile
Change Password (/change-password) — Current password, new password (with strength indicator), confirm new password, validation (must differ from current, must match confirmation, min 6 chars)
Components
Navbar (sticky top) — Logo "SN" icon + "Sai Nath Mobile" text, nav links: Home, Products, Accessories (clicking Accessories navigates to Products with accessories category pre-selected), profile button (shows user's first initial when logged in, generic person icon when logged out), cart button with quantity badge
Footer — Brand section with logo + description, Quick Links (Home, Products, Cart, My Profile), Categories (Smartphones, Accessories, New Arrivals, Best Sellers), Contact info (Hyderabad address, email: 
support@sainathmobile.com
, phone: +91 98765 43210), social media icons (Facebook, Instagram, Twitter, YouTube), newsletter email signup, bottom bar with copyright + Privacy Policy / Terms of Service / Refund Policy
Redux State
productsSlice — Loads categories, brands, and products from a JSON data file. Manages selectedCategory and selectedBrand filters.
cartSlice — Manages cart items array, totalQuantity, totalAmount. Actions: addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart.
authSlice — Manages user object, isAuthenticated boolean, error/success messages. Actions: signup, login, logout, updateProfile, changePassword, clearMessages. Uses localStorage for persistence (sn_auth for current session, sn_users for all registered users). This is frontend-only — designed to be swapped with Java backend API calls later.
Product Data (JSON)
Categories: Mobile Phones, Mobile Accessories

Mobile Brands & Products (2 products per brand):

Apple: iPhone 15 Pro (₹1,34,900), iPhone 15 (₹79,900)
Samsung: Galaxy S24 Ultra (₹1,24,999), Galaxy S24 (₹74,999)
OnePlus: OnePlus 12 (₹64,999), OnePlus 11 (₹56,999)
Xiaomi: Xiaomi 14 Pro (₹49,999), Xiaomi 13 (₹39,999)
Accessory Brands & Products (multiple products per brand):

Generic: Fast chargers, USB-C cables, wireless chargers, screen protectors, phone stands, car mounts, etc.
JBL: Bluetooth speakers, wireless earbuds, headphones, soundbars, etc.
Anker: Power banks, charging stations, car chargers, cables, etc.
Ringke: Phone cases, screen protectors, camera lens protectors, etc.
Each product should have: id, name, brand, brandId, categoryId, price (in INR), rating (out of 5), description, specs array, image filename, inStock boolean.

Product Images
Generate product images for the phones (iPhone 15 Pro, iPhone 15, Samsung S24 Ultra, Samsung S24, OnePlus 12, OnePlus 11, Xiaomi 14 Pro, Xiaomi 13) and accessories (fast charger, phone case). Store them in src/assets/images/ with an index.js that maps image filenames to imported images using a getProductImage() helper function.

Key Behaviors
Cart state persists across pages (Redux)
Auth state persists across page refresh (localStorage)
Checkout page redirects to Sign In if user is not logged in (using useEffect, not conditional return before hooks)
After sign in, pre-fill checkout form with user's name, email, phone
Password strength indicator on signup and change password pages
Responsive design for all pages
All prices displayed in Indian Rupees (₹) with Indian number formatting (e.g., ₹1,24,999)
Product ratings shown as gold stars (★)
Stock badges ("In Stock" green / "Out of Stock" red) on product cards