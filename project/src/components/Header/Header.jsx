import React from 'react';
import { CreditCard, LogIn, UserPlus } from 'lucide-react';
import './Header.css';

const Header = ({ isAuthenticated, onAuthClick, onLogout }) => {
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
          <button onClick={onLogout} className="button-outline">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;