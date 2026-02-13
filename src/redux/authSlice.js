import { createSlice } from '@reduxjs/toolkit';

// Load user from localStorage
const loadUser = () => {
    try {
        const data = localStorage.getItem('sn_auth');
        if (data) {
            const parsed = JSON.parse(data);
            return { user: parsed.user, isAuthenticated: true };
        }
    } catch (e) { /* ignore */ }
    return { user: null, isAuthenticated: false };
};

// Load registered users
const loadUsers = () => {
    try {
        const data = localStorage.getItem('sn_users');
        return data ? JSON.parse(data) : [];
    } catch (e) { return []; }
};

const saveAuth = (user) => {
    localStorage.setItem('sn_auth', JSON.stringify({ user }));
};

const saveUsers = (users) => {
    localStorage.setItem('sn_users', JSON.stringify(users));
};

const initial = loadUser();

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: initial.user,
        isAuthenticated: initial.isAuthenticated,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearMessages(state) {
            state.error = null;
            state.successMessage = null;
        },
        signup(state, action) {
            const { name, email, phone, password } = action.payload;
            const users = loadUsers();
            const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (exists) {
                state.error = 'An account with this email already exists';
                return;
            }
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                phone,
                password, // plain text for now — backend will hash
                memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            };
            users.push(newUser);
            saveUsers(users);
            const { password: _, ...safeUser } = newUser;
            state.user = safeUser;
            state.isAuthenticated = true;
            state.error = null;
            state.successMessage = 'Account created successfully!';
            saveAuth(safeUser);
        },
        login(state, action) {
            const { email, password } = action.payload;
            const users = loadUsers();
            const found = users.find(
                u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
            );
            if (!found) {
                state.error = 'Invalid email or password';
                return;
            }
            const { password: _, ...safeUser } = found;
            state.user = safeUser;
            state.isAuthenticated = true;
            state.error = null;
            state.successMessage = 'Welcome back!';
            saveAuth(safeUser);
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            state.successMessage = null;
            localStorage.removeItem('sn_auth');
        },
        updateProfile(state, action) {
            const { name, email, phone } = action.payload;
            const users = loadUsers();
            const idx = users.findIndex(u => u.id === state.user.id);
            if (idx !== -1) {
                users[idx] = { ...users[idx], name, email, phone };
                saveUsers(users);
            }
            state.user = { ...state.user, name, email, phone };
            state.error = null;
            state.successMessage = 'Profile updated successfully!';
            saveAuth(state.user);
        },
        changePassword(state, action) {
            const { currentPassword, newPassword } = action.payload;
            const users = loadUsers();
            const idx = users.findIndex(u => u.id === state.user.id);
            if (idx === -1) {
                state.error = 'User not found';
                return;
            }
            if (users[idx].password !== currentPassword) {
                state.error = 'Current password is incorrect';
                return;
            }
            users[idx].password = newPassword;
            saveUsers(users);
            state.error = null;
            state.successMessage = 'Password changed successfully!';
        },
    },
});

export const { signup, login, logout, updateProfile, changePassword, clearMessages } = authSlice.actions;
export default authSlice.reducer;
