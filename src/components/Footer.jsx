import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerGlow} />
            <div className={styles.container}>
                <div className={styles.topSection}>
                    {/* Brand */}
                    <div className={styles.brand}>
                        <Link to="/" className={styles.logo}>
                            <div className={styles.logoIcon}>SN</div>
                            <div className={styles.logoText}>
                                <span className={styles.brandName}>Sai Nath</span>
                                <span className={styles.brandTagline}>Mobile</span>
                            </div>
                        </Link>
                        <p className={styles.brandDescription}>
                            Your trusted destination for premium smartphones and accessories.
                            Experience the latest in mobile technology.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.linksGroup}>
                        <h4 className={styles.linksTitle}>Quick Links</h4>
                        <ul className={styles.linksList}>
                            <li><Link to="/" className={styles.footerLink}>Home</Link></li>
                            <li><Link to="/products" className={styles.footerLink}>Products</Link></li>
                            <li><Link to="/cart" className={styles.footerLink}>Cart</Link></li>
                            <li><Link to="/repair" className={styles.footerLink}>Repair</Link></li>
                            <li><Link to="/profile" className={styles.footerLink}>My Profile</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className={styles.linksGroup}>
                        <h4 className={styles.linksTitle}>Categories</h4>
                        <ul className={styles.linksList}>
                            <li><Link to="/products" className={styles.footerLink}>Smartphones</Link></li>
                            <li><Link to="/products" className={styles.footerLink}>Accessories</Link></li>
                            <li><Link to="/products" className={styles.footerLink}>New Arrivals</Link></li>
                            <li><Link to="/products" className={styles.footerLink}>Best Sellers</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className={styles.linksGroup}>
                        <h4 className={styles.linksTitle}>Contact Us</h4>
                        <ul className={styles.contactList}>
                            <li className={styles.contactItem}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.contactIcon}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Hyderabad, Telangana, India</span>
                            </li>
                            <li className={styles.contactItem}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.contactIcon}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>support@sainathmobile.com</span>
                            </li>
                            <li className={styles.contactItem}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.contactIcon}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+91 995147XXXXXX</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social + Newsletter */}
                <div className={styles.middleSection}>
                    <div className={styles.socialLinks}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="YouTube">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                        </a>
                    </div>

                    <div className={styles.newsletter}>
                        <span className={styles.newsletterLabel}>Stay Updated</span>
                        <div className={styles.newsletterForm}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={styles.newsletterInput}
                                aria-label="Email for newsletter"
                            />
                            <button className={styles.newsletterBtn} aria-label="Subscribe to newsletter">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>
                        © {currentYear} <span className={styles.copyrightBrand}>Sai Nath Mobile</span>. All rights reserved.
                    </p>
                    <div className={styles.bottomLinks}>
                        <a href="#" className={styles.bottomLink}>Privacy Policy</a>
                        <span className={styles.divider}>•</span>
                        <a href="#" className={styles.bottomLink}>Terms of Service</a>
                        <span className={styles.divider}>•</span>
                        <a href="#" className={styles.bottomLink}>Refund Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
