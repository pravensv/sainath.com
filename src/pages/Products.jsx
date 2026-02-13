import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategory, setSelectedBrand } from '../redux/productsSlice';
import { getProductImage } from '../assets/images';
import styles from './Products.module.css';

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories, brands, products, selectedCategory, selectedBrand } = useSelector(
    (state) => state.products
  );

  const filteredBrands = selectedCategory
    ? brands.filter((brand) => brand.categoryId === selectedCategory)
    : [];

  const filteredProducts = selectedBrand
    ? products.filter((product) => product.brandId === selectedBrand)
    : selectedCategory
      ? products.filter((product) => product.categoryId === selectedCategory)
      : products;

  const handleCategorySelect = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
  };

  const handleBrandSelect = (brandId) => {
    dispatch(setSelectedBrand(brandId));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className={styles.products}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {selectedBrand
              ? brands.find((b) => b.id === selectedBrand)?.name
              : selectedCategory
                ? categories.find((c) => c.id === selectedCategory)?.name
                : 'All Products'}
          </h1>
          {(selectedCategory || selectedBrand) && (
            <button
              className={styles.backButton}
              onClick={() => {
                if (selectedBrand) {
                  dispatch(setSelectedBrand(null));
                } else {
                  dispatch(setSelectedCategory(null));
                }
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          )}
        </div>

        {/* Show Categories when nothing is selected */}
        {!selectedCategory && (
          <div className={styles.categorySection}>
            <h2 className={styles.sectionTitle}>Browse by Category</h2>
            <div className={styles.categoryGrid}>
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={styles.categoryCard}
                  onClick={() => handleCategorySelect(category.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleCategorySelect(category.id);
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
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              ))}

              {/* Repair Services Card */}
              <div
                className={`${styles.categoryCard} ${styles.repairCard}`}
                onClick={() => navigate('/repair')}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === 'Enter') navigate('/repair'); }}
              >
                <div className={styles.repairGlow} />
                <div className={styles.categoryIcon} style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx="12" cy="12" r="3" strokeWidth={2} />
                  </svg>
                </div>
                <h3>Repair Services</h3>
                <p>Expert mobile repairs with genuine parts & 90-day warranty</p>
                <div className={styles.repairBadge}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Get Estimate
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Show Brands when category is selected but not brand */}
        {selectedCategory && !selectedBrand && (
          <div className={styles.brandSection}>
            <h2 className={styles.sectionTitle}>Select Brand</h2>
            <div className={styles.brandGrid}>
              {filteredBrands.map((brand) => (
                <div
                  key={brand.id}
                  className={styles.brandCard}
                  onClick={() => handleBrandSelect(brand.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleBrandSelect(brand.id);
                  }}
                >
                  <div className={styles.brandLogo}>{brand.name.charAt(0)}</div>
                  <h3>{brand.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show Products */}
        {(selectedBrand || selectedCategory) && (
          <div className={styles.productSection}>
            <div className={styles.productGrid}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={styles.productCard}
                  onClick={() => handleProductClick(product.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleProductClick(product.id);
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
                    {product.inStock ? (
                      <span className={styles.stockBadge}>In Stock</span>
                    ) : (
                      <span className={`${styles.stockBadge} ${styles.outOfStock}`}>Out of Stock</span>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
