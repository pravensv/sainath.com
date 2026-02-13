import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, clearMessages } from '../redux/authSlice';
import styles from './ChangePassword.module.css';

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, successMessage, error } = useSelector(state => state.auth);

    const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [showPasswords, setShowPasswords] = useState(false);
    const [localError, setLocalError] = useState('');

    useEffect(() => {
        if (!isAuthenticated) navigate('/signin');
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (successMessage) {
            setTimeout(() => navigate('/profile'), 1500);
        }
    }, [successMessage, navigate]);

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

    const strength = getPasswordStrength(form.newPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearMessages());
        setLocalError('');

        if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
            setLocalError('All fields are required');
            return;
        }
        if (form.newPassword.length < 6) {
            setLocalError('New password must be at least 6 characters');
            return;
        }
        if (form.newPassword !== form.confirmPassword) {
            setLocalError('New passwords do not match');
            return;
        }
        if (form.currentPassword === form.newPassword) {
            setLocalError('New password must be different from current password');
            return;
        }

        dispatch(changePassword({
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
        }));
    };

    const displayError = localError || error;

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <button className={styles.backBtn} onClick={() => navigate('/profile')}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Back to Profile
                        </button>
                        <div className={styles.iconWrap}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </div>
                        <h1>Change Password</h1>
                        <p>Keep your account secure</p>
                    </div>

                    {displayError && <div className={styles.error}>{displayError}</div>}
                    {successMessage && <div className={styles.success}>{successMessage}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.field}>
                            <label htmlFor="currentPassword">Current Password</label>
                            <div className={styles.inputWrap}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                <input id="currentPassword" type={showPasswords ? 'text' : 'password'} name="currentPassword" value={form.currentPassword} onChange={handleChange} placeholder="Enter current password" required />
                            </div>
                        </div>

                        <div className={styles.divider} />

                        <div className={styles.field}>
                            <label htmlFor="newPassword">New Password</label>
                            <div className={styles.inputWrap}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                                <input id="newPassword" type={showPasswords ? 'text' : 'password'} name="newPassword" value={form.newPassword} onChange={handleChange} placeholder="Min. 6 characters" required />
                            </div>
                            {form.newPassword && (
                                <div className={styles.strengthBar}>
                                    <div className={styles.strengthTrack}>
                                        <div className={styles.strengthFill} style={{ width: `${(strength.level / 5) * 100}%` }} data-level={strength.level} />
                                    </div>
                                    <span className={styles.strengthLabel} data-level={strength.level}>{strength.label}</span>
                                </div>
                            )}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <div className={styles.inputWrap}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                <input id="confirmPassword" type={showPasswords ? 'text' : 'password'} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm new password" required />
                            </div>
                            {form.confirmPassword && form.newPassword !== form.confirmPassword && (
                                <span className={styles.fieldError}>Passwords do not match</span>
                            )}
                        </div>

                        <label className={styles.showPwLabel}>
                            <input type="checkbox" checked={showPasswords} onChange={(e) => setShowPasswords(e.target.checked)} />
                            <span>Show passwords</span>
                        </label>

                        <div className={styles.actions}>
                            <button type="button" className={styles.cancelBtn} onClick={() => navigate('/profile')}>Cancel</button>
                            <button type="submit" className={styles.saveBtn}>Update Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
