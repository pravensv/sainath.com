import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, clearMessages } from '../redux/authSlice';
import styles from './EditProfile.module.css';

const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated, successMessage, error } = useSelector(state => state.auth);

    const [form, setForm] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        if (!isAuthenticated) { navigate('/signin'); return; }
        if (user) setForm({ name: user.name || '', email: user.email || '', phone: user.phone || '' });
    }, [isAuthenticated, user, navigate]);

    useEffect(() => {
        return () => dispatch(clearMessages());
    }, [dispatch]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(form));
        setTimeout(() => navigate('/profile'), 1200);
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <button className={styles.backBtn} onClick={() => navigate('/profile')}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Back to Profile
                        </button>
                        <h1>Edit Profile</h1>
                        <p>Update your personal information</p>
                    </div>

                    {error && <div className={styles.error}>{error}</div>}
                    {successMessage && <div className={styles.success}>{successMessage}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.avatarEdit}>
                            <div className={styles.avatar}>
                                <span>{form.name ? form.name.charAt(0).toUpperCase() : 'U'}</span>
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="name">Full Name</label>
                            <div className={styles.inputWrap}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                <input id="name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="email">Email Address</label>
                            <div className={styles.inputWrap}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                                <input id="email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your email" required />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="phone">Phone Number</label>
                            <div className={styles.inputWrap}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <input id="phone" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 1234567890" />
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <button type="button" className={styles.cancelBtn} onClick={() => navigate('/profile')}>Cancel</button>
                            <button type="submit" className={styles.saveBtn}>Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
