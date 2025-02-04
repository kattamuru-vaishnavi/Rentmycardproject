import React from 'react';
import { CreditCard, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Header.css';

const Header = ({ isAuthenticated, onAuthClick, onLogout }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    onLogout();          // Call the logout function
    navigate('/');       // Redirect to the landing page
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <CreditCard className="icon" />
          <span>CardPerks</span>
        </div>
        {!isAuthenticated ? (
          <div className="auth-buttons">
            <button onClick={() => onAuthClick('login')} className="button-primary">
              <LogIn className="icon" />
              Login
            </button>
            <button onClick={() => onAuthClick('signup')} className="button-outline">
              <UserPlus className="icon" />
              Sign Up
            </button>
          </div>
        ) : (
          <button onClick={handleLogout} className="button-outline">
            Logout
          </button>

        )}
      </div>
    </header>
  );
};

export default Header;