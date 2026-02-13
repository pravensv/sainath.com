import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { getProductImage } from '../assets/images';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === id)
  );

  const brand = useSelector((state) =>
    state.products.brands.find((b) => b.id === product?.brandId)
  );

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    // Show notification or redirect to cart
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate('/cart');
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        <div className={styles.productLayout}>
          <div className={styles.imageSection}>
            <div className={styles.productImage}>
              {getProductImage(product.image) ? (
                <img
                  src={getProductImage(product.image)}
                  alt={product.name}
                  className={styles.productImg}
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
                    <circle cx="8.5" cy="8.5" r="1.5" strokeWidth={2} />
                    <polyline points="21 15 16 10 5 21" strokeWidth={2} />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className={styles.detailsSection}>
            <div className={styles.brandBadge}>{brand?.name}</div>
            <h1 className={styles.productName}>{product.name}</h1>

            <div className={styles.ratingSection}>
              <div className={styles.stars}>
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className={styles.ratingText}>{product.rating} / 5.0</span>
            </div>

            <div className={styles.priceSection}>
              <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
              {product.inStock ? (
                <span className={styles.stockStatus}>In Stock</span>
              ) : (
                <span className={`${styles.stockStatus} ${styles.outOfStock}`}>Out of Stock</span>
              )}
            </div>

            <div className={styles.specsSection}>
              <h2 className={styles.specsTitle}>Specifications</h2>
              <div className={styles.specsList}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className={styles.specItem}>
                    <span className={styles.specKey}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                    <span className={styles.specValue}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.addToCartBtn}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
              <button
                className={styles.buyNowBtn}
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
