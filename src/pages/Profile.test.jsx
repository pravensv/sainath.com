import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../pages/Profile';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Profile', () => {
  it('renders profile page', () => {
    renderWithRouter(<Profile />);
    expect(screen.getByText('User Profile')).toBeInTheDocument();
  });

  it('displays user information', () => {
    renderWithRouter(<Profile />);
    expect(screen.getByText('Guest User')).toBeInTheDocument();
    expect(screen.getByText('guest@sainathmobile.com')).toBeInTheDocument();
  });

  it('displays account information section', () => {
    renderWithRouter(<Profile />);
    expect(screen.getByText('Account Information')).toBeInTheDocument();
  });

  it('displays edit profile button', () => {
    renderWithRouter(<Profile />);
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  });

  it('displays change password button', () => {
    renderWithRouter(<Profile />);
    expect(screen.getByText('Change Password')).toBeInTheDocument();
  });

  it('displays member since information', () => {
    renderWithRouter(<Profile />);
    expect(screen.getByText('Member Since')).toBeInTheDocument();
    expect(screen.getByText('February 2026')).toBeInTheDocument();
  });
});
