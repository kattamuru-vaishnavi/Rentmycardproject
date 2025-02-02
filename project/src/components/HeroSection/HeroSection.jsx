import React from 'react';
import './HeroSection.css';

const HeroSection = ({ onGetStarted }) => {
  return (
    <section className="hero1-section">
      <div className="hero1-container">
       
        <h1 className="hero1-title">Welcome to CardPerks</h1>
        
          <p className="hero1-description">Connect with cardholders, share benefits, and save money on your purchases.</p>
          
          <button onClick={onGetStarted} className="hero1-button">
          Get Started
        </button>
        
      </div>
    </section>
  );
};

export default HeroSection;