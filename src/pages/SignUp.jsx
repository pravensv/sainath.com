import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup, clearMessages } from '../redux/authSlice';
import styles from './SignUp.module.css';

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, error } = useSelector(state => state.auth);

    const [form, setForm] = useState({
        name: '', email: '', phone: '', password: '', confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState('');

    useEffect(() => {
        if (isAuthenticated) navigate('/profile');
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        return () => dispatch(clearMessages());
    }, [dispatch]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setLocalError('');
    };

    const getPasswordStrength = (pw) => {
        if (!pw) return { level: 0, label: '' };
        let score = 0;
        if (pw.length >= 6) score++;
        if (pw.length >= 10) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
        return { level: score, label: labels[score] };
    };

    const strength = getPasswordStrength(form.password);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearMessages());
        setLocalError('');

        if (!form.name || !form.email || !form.password) {
            setLocalError('Please fill in all required fields');
            return;
        }
        if (form.password.length < 6) {
            setLocalError('Password must be at least 6 characters');
            return;
        }
        if (form.password !== form.confirmPassword) {
            setLocalError('Passwords do not match');
            return;
        }

        dispatch(signup({
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
        }));
    };

    const displayError = localError || error;

    return (
        <div className={styles.auth}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <div className={styles.iconWrap}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h1>Create Account</h1>
                        <p>Join Sai Nath Mobile today</p>
                    </div>

                    {displayError && <div className={styles.error}>{displayError}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.field}>
                            <label htmlFor="name">Full Name *</label>
                            <div className={styles.inputWrap}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <input id="name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" required />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="email">Email Address *</label>
                            <div className={styles.inputWrap}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <input id="email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="phone">Phone Number</label>
                            <div className={styles.inputWrap}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <input id="phone" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 1234567890" />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="password">Password *</label>
                            <div className={styles.inputWrap}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <input id="password" type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Min. 6 characters" required />
                                <button type="button" className={styles.togglePw} onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password">
                                    {showPassword ? (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    )}
                                </button>
                            </div>
                            {form.password && (
                                <div className={styles.strengthBar}>
                                    <div className={styles.strengthTrack}>
                                        <div className={styles.strengthFill} style={{ width: `${(strength.level / 5) * 100}%` }} data-level={strength.level} />
                                    </div>
                                    <span className={styles.strengthLabel} data-level={strength.level}>{strength.label}</span>
                                </div>
                            )}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="confirmPassword">Confirm Password *</label>
                            <div className={styles.inputWrap}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <input id="confirmPassword" type={showPassword ? 'text' : 'password'} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required />
                            </div>
                            {form.confirmPassword && form.password !== form.confirmPassword && (
                                <span className={styles.fieldError}>Passwords do not match</span>
                            )}
                        </div>

                        <button type="submit" className={styles.submitBtn}>Create Account</button>
                    </form>

                    <div className={styles.footer}>
                        <p>Already have an account? <Link to="/signin">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
