import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategory } from '../redux/productsSlice';
import { getProductImage } from '../assets/images';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);
  const products = useSelector((state) => state.products.products);

  const featuredProducts = products.slice(0, 6);

  const handleCategoryClick = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    navigate('/products');
  };

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Welcome to <span className={styles.gradient}>Sai Nath Mobile</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Your trusted destination for premium smartphones and accessories
          </p>
          <button
            className={styles.ctaButton}
            onClick={() => navigate('/products')}
          >
            Explore Products
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.floatingCard}>
            <img src={getProductImage('iphone-15-pro.jpg')} alt="iPhone 15 Pro" className={styles.floatingImg} />
            <div className={styles.floatingLabel}>
              <span className={styles.floatingName}>iPhone 15 Pro</span>
              <span className={styles.floatingPrice}>₹99,999</span>
            </div>
          </div>
          <div className={styles.floatingCard}>
            <img src={getProductImage('samsung-s24-ultra.jpg')} alt="Samsung Galaxy S24 Ultra" className={styles.floatingImg} />
            <div className={styles.floatingLabel}>
              <span className={styles.floatingName}>Galaxy S24 Ultra</span>
              <span className={styles.floatingPrice}>₹1,24,999</span>
            </div>
          </div>
          <div className={styles.floatingCard}>
            <img src={getProductImage('oneplus-12.jpg')} alt="OnePlus 12" className={styles.floatingImg} />
            <div className={styles.floatingLabel}>
              <span className={styles.floatingName}>OnePlus 12</span>
              <span className={styles.floatingPrice}>₹64,999</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <p className={styles.sectionSubtitle}>Find the perfect device for your needs</p>
        </div>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={styles.categoryCard}
              onClick={() => handleCategoryClick(category.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleCategoryClick(category.id);
              }}
            >
              <div className={styles.categoryIcon}>
                {category.id === 'mobiles' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" strokeWidth={2} />
                    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2} strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                )}
              </div>
              <h3 className={styles.categoryName}>{category.name}</h3>
              <p className={styles.categoryDesc}>{category.description}</p>
              <div className={styles.categoryArrow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Repair Services Banner */}
        <div
          className={styles.repairBanner}
          onClick={() => navigate('/repair')}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => { if (e.key === 'Enter') navigate('/repair'); }}
        >
          <div className={styles.repairGlow} />
          <div className={styles.repairContent}>
            <div className={styles.repairIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <circle cx="12" cy="12" r="3" strokeWidth={2} />
              </svg>
            </div>
            <div className={styles.repairInfo}>
              <h3 className={styles.repairTitle}>Repair Services</h3>
              <p className={styles.repairDesc}>Expert mobile repairs with genuine parts & 90-day warranty</p>
              <div className={styles.repairFeatures}>
                <span>✓ Screen Repair</span>
                <span>✓ Battery Replace</span>
                <span>✓ Water Damage</span>
              </div>
            </div>
            <div className={styles.repairCta}>
              <span>Get Estimate</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <p className={styles.sectionSubtitle}>Handpicked selections just for you</p>
        </div>
        <div className={styles.productGrid}>
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className={styles.productCard}
              onClick={() => navigate(`/product/${product.id}`)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') navigate(`/product/${product.id}`);
              }}
            >
              <div className={styles.productImage}>
                {getProductImage(product.image) ? (
                  <img
                    src={getProductImage(product.image)}
                    alt={product.name}
                    className={styles.productImg}
                  />
                ) : (
                  <div className={styles.productImagePlaceholder}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
                      <circle cx="8.5" cy="8.5" r="1.5" strokeWidth={2} />
                      <polyline points="21 15 16 10 5 21" strokeWidth={2} />
                    </svg>
                  </div>
                )}
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <div className={styles.productRating}>
                  {'★'.repeat(Math.floor(product.rating))}
                  <span>{product.rating}</span>
                </div>
                <p className={styles.productPrice}>₹{product.price.toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>Best Prices</h3>
            <p>Competitive pricing on all products</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3>Genuine Products</h3>
            <p>100% authentic devices guaranteed</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable shipping</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
