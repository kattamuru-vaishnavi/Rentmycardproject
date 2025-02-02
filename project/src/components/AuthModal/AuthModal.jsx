import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import './AuthModal.css';
import { Eye, EyeOff } from 'lucide-react';

const AuthModal = ({ type, onClose, onSwitch, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Trim input values
    const email = formData.email.trim();
    const password = formData.password.trim();
  
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,}$/.test(email)) 
      newErrors.email = 'Enter a valid email';
  
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8 || !/\d/.test(password)) 
      newErrors.password = 'Password must be 8+ chars with at least 1 number';
  
    if (type === 'signup') {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
      else if (password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onLoginSuccess();
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button onClick={onClose} className="close-button">
          <X className="icon"/>
        </button>
        <h2>{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {type === 'signup' && (
            <div className="form-group">
              <label>Name</label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
            <Mail className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <button type="button" className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          {type === 'signup' && (
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
              <Lock className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>
          )}
          <button type="submit" className="submit-button">
            {type === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        <div className="auth-switch">
          <p>
            {type === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => onSwitch(type === 'login' ? 'signup' : 'login')}>
              {type === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;