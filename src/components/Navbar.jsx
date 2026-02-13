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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const handleProfileClick = () => {
    navigate(isAuthenticated ? '/profile' : '/signin');
  };

  const handleCategoryClick = (categoryId) => (e) => {
    e.preventDefault();
    dispatch(setSelectedCategory(categoryId));
    dispatch(setSelectedBrand(null));
    setMobileMenuOpen(false);
    navigate('/products');
  };

  const handleProductsClick = (e) => {
    e.preventDefault();
    dispatch(setSelectedCategory(null));
    dispatch(setSelectedBrand(null));
    setMobileMenuOpen(false);
    navigate('/products');
  };

  const handleMobileNavClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
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
          <Link to="/repair" className={styles.navLink}>Repair</Link>
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

          {/* Hamburger Button (mobile only) */}
          <button
            className={`${styles.hamburgerBtn} ${mobileMenuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className={styles.mobileOverlay} onClick={() => setMobileMenuOpen(false)} />
        )}
        <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <div className={styles.mobileMenuHeader}>
            <div className={styles.logoIcon}>SN</div>
            <span className={styles.mobileMenuTitle}>Menu</span>
            <button className={styles.mobileCloseBtn} onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className={styles.mobileNav}>
            <button className={styles.mobileNavItem} onClick={() => handleMobileNavClick('/')}>
              <div className={styles.mobileNavIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span>Home</span>
            </button>
            <button className={styles.mobileNavItem} onClick={handleProductsClick}>
              <div className={styles.mobileNavIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span>Products</span>
            </button>
            <button className={styles.mobileNavItem} onClick={handleCategoryClick('mobiles')}>
              <div className={styles.mobileNavIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth={2} />
                  <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2} strokeLinecap="round" />
                </svg>
              </div>
              <span>Mobiles</span>
            </button>
            <button className={styles.mobileNavItem} onClick={handleCategoryClick('accessories')}>
              <div className={styles.mobileNavIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span>Accessories</span>
            </button>
            <button className={`${styles.mobileNavItem} ${styles.mobileNavRepair}`} onClick={() => handleMobileNavClick('/repair')}>
              <div className={styles.mobileNavIcon} style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <circle cx="12" cy="12" r="3" strokeWidth={2} />
                </svg>
              </div>
              <span>Repair</span>
              <div className={styles.mobileNavBadge}>New</div>
            </button>
          </nav>
          <div className={styles.mobileMenuFooter}>
            <p>Sai Nath Mobile</p>
            <span>Your trusted mobile partner</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
