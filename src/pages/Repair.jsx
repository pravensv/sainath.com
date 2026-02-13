import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProductImage } from '../assets/images';
import repairData from '../data/repairData.json';
import styles from './Repair.module.css';

const problemIcons = {
    screen: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth={2} />
            <path strokeLinecap="round" strokeWidth={2} d="M2 8l20 8M22 8L2 16" />
        </svg>
    ),
    battery: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="6" y="4" width="12" height="18" rx="2" strokeWidth={2} />
            <rect x="9" y="1" width="6" height="3" rx="1" strokeWidth={2} />
            <path strokeLinecap="round" strokeWidth={2} d="M10 14l2-4v3h2l-2 4v-3h-2z" />
        </svg>
    ),
    charging: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    back: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
            <path strokeLinecap="round" strokeWidth={2} d="M7 7l10 10M17 7L7 17" />
        </svg>
    ),
    camera: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
            <circle cx="12" cy="13" r="4" strokeWidth={2} />
        </svg>
    ),
    speaker: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
        </svg>
    ),
    water: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
        </svg>
    ),
    software: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    ),
};

const Repair = () => {
    const navigate = useNavigate();
    const products = useSelector((state) => state.products.products);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedProblem, setSelectedProblem] = useState(null);

    const currentBrand = repairData.brands.find((b) => b.id === selectedBrand);
    const currentProblem = repairData.repairProblems.find((p) => p.id === selectedProblem);
    const pricing = currentBrand?.pricing[selectedProblem];

    const currentStep = !selectedBrand ? 1 : !selectedModel ? 2 : 3;

    const popularProducts = products
        .filter((p) => p.categoryId === 'mobiles' && p.inStock)
        .slice(0, 4);

    const handleReset = () => {
        setSelectedBrand(null);
        setSelectedModel(null);
        setSelectedProblem(null);
    };

    const handleBack = () => {
        if (selectedProblem) {
            setSelectedProblem(null);
        } else if (selectedModel) {
            setSelectedModel(null);
        } else if (selectedBrand) {
            setSelectedBrand(null);
        }
    };

    return (
        <div className={styles.repair}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroGlow} />
                <div className={styles.heroContent}>
                    <div className={styles.heroIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <circle cx="12" cy="12" r="3" strokeWidth={2} />
                        </svg>
                    </div>
                    <h1 className={styles.heroTitle}>
                        Expert <span className={styles.gradient}>Mobile Repair</span> Services
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Professional repairs with genuine parts and 90-day warranty. Get an instant price estimate below.
                    </p>
                </div>
            </section>

            {/* Step Indicator */}
            <section className={styles.stepsSection}>
                <div className={styles.container}>
                    <div className={styles.stepIndicator}>
                        <div className={`${styles.step} ${currentStep >= 1 ? styles.stepActive : ''} ${selectedBrand ? styles.stepCompleted : ''}`}>
                            <div className={styles.stepNumber}>
                                {selectedBrand ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                ) : '1'}
                            </div>
                            <span className={styles.stepLabel}>Select Brand</span>
                        </div>
                        <div className={styles.stepLine} />
                        <div className={`${styles.step} ${currentStep >= 2 ? styles.stepActive : ''} ${selectedModel ? styles.stepCompleted : ''}`}>
                            <div className={styles.stepNumber}>
                                {selectedModel ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                ) : '2'}
                            </div>
                            <span className={styles.stepLabel}>Select Model</span>
                        </div>
                        <div className={styles.stepLine} />
                        <div className={`${styles.step} ${currentStep >= 3 ? styles.stepActive : ''} ${selectedProblem ? styles.stepCompleted : ''}`}>
                            <div className={styles.stepNumber}>
                                {selectedProblem ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                ) : '3'}
                            </div>
                            <span className={styles.stepLabel}>Select Problem</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Selection Area */}
            <section className={styles.selectionSection}>
                <div className={styles.container}>
                    {(selectedBrand || selectedModel) && (
                        <button className={styles.backButton} onClick={handleBack}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back
                        </button>
                    )}

                    {/* Step 1: Brand Selection */}
                    {!selectedBrand && (
                        <div className={styles.selectionBlock}>
                            <h2 className={styles.selectionTitle}>Select Your Phone Brand</h2>
                            <div className={styles.brandGrid}>
                                {repairData.brands.map((brand) => (
                                    <div
                                        key={brand.id}
                                        className={styles.brandCard}
                                        onClick={() => setSelectedBrand(brand.id)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyPress={(e) => { if (e.key === 'Enter') setSelectedBrand(brand.id); }}
                                    >
                                        <div className={styles.brandLogo}>{brand.name.charAt(0)}</div>
                                        <h3 className={styles.brandName}>{brand.name}</h3>
                                        <span className={styles.brandModels}>{brand.models.length} models</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Model Selection */}
                    {selectedBrand && !selectedModel && currentBrand && (
                        <div className={styles.selectionBlock}>
                            <h2 className={styles.selectionTitle}>
                                Select Your <span className={styles.gradient}>{currentBrand.name}</span> Model
                            </h2>
                            <div className={styles.modelGrid}>
                                {currentBrand.models.map((model) => (
                                    <div
                                        key={model}
                                        className={styles.modelCard}
                                        onClick={() => setSelectedModel(model)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyPress={(e) => { if (e.key === 'Enter') setSelectedModel(model); }}
                                    >
                                        <div className={styles.modelIcon}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth={2} />
                                                <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2} strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <span className={styles.modelName}>{model}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Problem Selection */}
                    {selectedBrand && selectedModel && (
                        <div className={styles.selectionBlock}>
                            <h2 className={styles.selectionTitle}>
                                What's Wrong with Your <span className={styles.gradient}>{selectedModel}</span>?
                            </h2>
                            <div className={styles.problemGrid}>
                                {repairData.repairProblems.map((problem) => {
                                    const price = currentBrand?.pricing[problem.id];
                                    return (
                                        <div
                                            key={problem.id}
                                            className={`${styles.problemCard} ${selectedProblem === problem.id ? styles.problemSelected : ''}`}
                                            onClick={() => setSelectedProblem(problem.id)}
                                            role="button"
                                            tabIndex={0}
                                            onKeyPress={(e) => { if (e.key === 'Enter') setSelectedProblem(problem.id); }}
                                        >
                                            <div className={styles.problemIcon}>
                                                {problemIcons[problem.icon]}
                                            </div>
                                            <div className={styles.problemInfo}>
                                                <h3 className={styles.problemName}>{problem.name}</h3>
                                                <p className={styles.problemDesc}>{problem.description}</p>
                                            </div>
                                            {price && (
                                                <div className={styles.problemPrice}>
                                                    ₹{price.min.toLocaleString('en-IN')} - ₹{price.max.toLocaleString('en-IN')}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Price Estimate Card */}
                    {selectedProblem && pricing && (
                        <div className={styles.estimateCard}>
                            <div className={styles.estimateGlow} />
                            <div className={styles.estimateHeader}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <h3>Repair Estimate</h3>
                            </div>
                            <div className={styles.estimateDetails}>
                                <div className={styles.estimateRow}>
                                    <span className={styles.estimateLabel}>Brand</span>
                                    <span className={styles.estimateValue}>{currentBrand?.name}</span>
                                </div>
                                <div className={styles.estimateRow}>
                                    <span className={styles.estimateLabel}>Model</span>
                                    <span className={styles.estimateValue}>{selectedModel}</span>
                                </div>
                                <div className={styles.estimateRow}>
                                    <span className={styles.estimateLabel}>Problem</span>
                                    <span className={styles.estimateValue}>{currentProblem?.name}</span>
                                </div>
                                <div className={styles.estimateDivider} />
                                <div className={styles.estimateRow}>
                                    <span className={styles.estimateLabel}>Approximate Cost</span>
                                    <span className={styles.estimatePriceValue}>
                                        ₹{pricing.min.toLocaleString('en-IN')} - ₹{pricing.max.toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </div>
                            <p className={styles.estimateNote}>
                                * Final price may vary after physical inspection. Visit our store for exact pricing.
                            </p>
                            <div className={styles.estimateActions}>
                                <a href="tel:+919876543210" className={styles.bookBtn}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Call to Book Repair
                                </a>
                                <button className={styles.resetBtn} onClick={handleReset}>
                                    Start Over
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className={styles.whySection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Why Choose <span className={styles.gradient}>Our Repair Service</span></h2>
                        <p className={styles.sectionSubtitle}>We deliver quality repairs you can trust</p>
                    </div>
                    <div className={styles.whyGrid}>
                        <div className={styles.whyCard}>
                            <div className={styles.whyIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3>Certified Technicians</h3>
                            <p>Expert engineers with years of experience in mobile repairs</p>
                        </div>
                        <div className={styles.whyCard}>
                            <div className={styles.whyIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3>Genuine Parts</h3>
                            <p>Only original and high-quality replacement parts used</p>
                        </div>
                        <div className={styles.whyCard}>
                            <div className={styles.whyIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3>Quick Turnaround</h3>
                            <p>Most repairs completed within 1-2 hours while you wait</p>
                        </div>
                        <div className={styles.whyCard}>
                            <div className={styles.whyIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            <h3>90-Day Warranty</h3>
                            <p>All repairs backed with a 90-day service warranty</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Phones */}
            <section className={styles.popularSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Looking for a <span className={styles.gradient}>New Phone</span>?</h2>
                        <p className={styles.sectionSubtitle}>Browse our collection of latest smartphones</p>
                    </div>
                    <div className={styles.popularGrid}>
                        {popularProducts.map((product) => (
                            <div
                                key={product.id}
                                className={styles.popularCard}
                                onClick={() => navigate(`/product/${product.id}`)}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => { if (e.key === 'Enter') navigate(`/product/${product.id}`); }}
                            >
                                <div className={styles.popularImage}>
                                    {getProductImage(product.image) ? (
                                        <img src={getProductImage(product.image)} alt={product.name} className={styles.popularImg} />
                                    ) : (
                                        <div className={styles.popularPlaceholder}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth={2} />
                                                <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2} strokeLinecap="round" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.popularInfo}>
                                    <h3 className={styles.popularName}>{product.name}</h3>
                                    <div className={styles.popularRating}>
                                        {'★'.repeat(Math.floor(product.rating))}
                                        <span>{product.rating}</span>
                                    </div>
                                    <p className={styles.popularPrice}>₹{product.price.toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.browseBtnWrapper}>
                        <button className={styles.browseBtn} onClick={() => navigate('/products')}>
                            Browse All Products
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className={styles.contactSection}>
                <div className={styles.container}>
                    <div className={styles.contactCard}>
                        <div className={styles.contactGlow} />
                        <div className={styles.contactContent}>
                            <h2>Visit Our Store for <span className={styles.gradient}>Expert Repairs</span></h2>
                            <p>Walk in with your device and get it repaired by our certified technicians</p>
                            <div className={styles.contactDetails}>
                                <div className={styles.contactItem}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Hyderabad, Telangana, India</span>
                                </div>
                                <div className={styles.contactItem}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>+91 +91 995147XXXXXX</span>
                                </div>
                                <div className={styles.contactItem}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Mon - Sat: 10:00 AM - 8:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Repair;
