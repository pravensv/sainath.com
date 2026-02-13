import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategory, setSelectedBrand } from '../redux/productsSlice';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products.products);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const handleProfileClick = () => {
    navigate(isAuthenticated ? '/profile' : '/signin');
  };

  const handleCategoryClick = (categoryId) => (e) => {
    e.preventDefault();
    dispatch(setSelectedCategory(categoryId));
    dispatch(setSelectedBrand(null));
    navigate('/products');
  };

  const handleProductsClick = (e) => {
    e.preventDefault();
    dispatch(setSelectedCategory(null));
    dispatch(setSelectedBrand(null));
    navigate('/products');
  };

  // Search logic
  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev);
    setSearchQuery('');
    setSearchResults([]);
  };

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search on clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const filtered = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase()) ||
            p.description?.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (productId) => {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>SN</div>
          <div className={styles.logoText}>
            <span className={styles.brandName}>Sai Nath</span>
            <span className={styles.brandTagline}>Mobile</span>
          </div>
        </Link>

        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <a href="/products" className={styles.navLink} onClick={handleProductsClick}>Products</a>
          <a href="/products" className={styles.navLink} onClick={handleCategoryClick('mobiles')}>Mobiles</a>
          <a href="/products" className={styles.navLink} onClick={handleCategoryClick('accessories')}>Accessories</a>
        </div>

        <div className={styles.navActions}>
          {/* Search */}
          <div className={`${styles.searchWrapper} ${searchOpen ? styles.searchOpen : ''}`} ref={searchRef}>
            <button
              className={styles.searchBtn}
              onClick={handleSearchToggle}
              aria-label="Search Products"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {searchOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                )}
              </svg>
            </button>

            {searchOpen && (
              <div className={styles.searchDropdown}>
                <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                  <svg className={styles.searchInputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search phones, accessories..."
                    className={styles.searchInput}
                    autoComplete="off"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className={styles.searchClear}
                      onClick={() => { setSearchQuery(''); setSearchResults([]); inputRef.current?.focus(); }}
                    >
                      ✕
                    </button>
                  )}
                </form>

                {searchResults.length > 0 && (
                  <div className={styles.searchResults}>
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        className={styles.searchResultItem}
                        onClick={() => handleResultClick(product.id)}
                      >
                        <div className={styles.resultInfo}>
                          <span className={styles.resultName}>{product.name}</span>
                          <span className={styles.resultBrand}>{product.brand}</span>
                        </div>
                        <span className={styles.resultPrice}>₹{product.price.toLocaleString('en-IN')}</span>
                      </button>
                    ))}
                  </div>
                )}

                {searchQuery && searchResults.length === 0 && (
                  <div className={styles.searchNoResults}>
                    <p>No products found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className={styles.profileBtn}
            onClick={handleProfileClick}
            aria-label={isAuthenticated ? 'User Profile' : 'Sign In'}
          >
            {isAuthenticated && user ? (
              <span className={styles.userInitial}>{user.name.charAt(0).toUpperCase()}</span>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </button>

          <button
            className={styles.cartBtn}
            onClick={() => navigate('/cart')}
            aria-label="Shopping Cart"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartQuantity > 0 && (
              <span className={styles.cartBadge}>{cartQuantity}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
