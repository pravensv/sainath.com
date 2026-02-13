# Sai Nath Mobile - Quick Start Guide

## 🚀 Installation & Setup (5 minutes)

### Step 1: Install Dependencies
```bash
cd sai-nath-mobile
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Step 3: Run Tests
```bash
npm run test:coverage
```

Expected output: 100% coverage across all files

## 📱 Using the Application

### Browse Products
1. Click on a category card (Mobile Phones or Accessories)
2. Select a brand
3. Browse products from that brand

### Add to Cart
1. Click on any product to view details
2. Click "Add to Cart" or "Buy Now"
3. Click cart icon in navbar to view cart

### Checkout
1. In cart, click "Proceed to Checkout"
2. Fill in delivery information
3. Select payment method
4. Click "Place Order"

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Generate Coverage Report
```bash
npm run test:coverage
```

Coverage report will be in `coverage/` folder

## 🎨 Customization

### Change Colors
Edit `src/styles/global.css`:
```css
:root {
  --primary-color: #667eea;  /* Change this */
  --secondary-color: #764ba2; /* And this */
}
```

### Add Products
Edit `src/data/products.json`:
```json
{
  "products": [
    {
      "id": "new-product",
      "name": "New Product",
      "price": 50000,
      ...
    }
  ]
}
```

## 📦 Build for Production

```bash
npm run build
```

Output will be in `dist/` folder

Preview production build:
```bash
npm run preview
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.js
server: {
  port: 3001  // Use different port
}
```

### Tests Failing
```bash
# Clear Jest cache
npm test -- --clearCache

# Run tests again
npm test
```

### Dependencies Issues
```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

## 📚 Learn More

- [README.md](./README.md) - Full project documentation
- [DOCUMENTATION.md](./DOCUMENTATION.md) - Technical details
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)

## 🎯 Next Steps

1. ✅ Run the app and explore features
2. ✅ Run tests to verify everything works
3. ✅ Check out the code structure
4. ✅ Customize colors and branding
5. ✅ Add your own products

Happy coding! 🎉
