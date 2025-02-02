import React from 'react';
import Header from '../Header/Header';
import HeroSection from '../HeroSection/HeroSection';



const LandingPage = ({ isAuthenticated, onAuthClick, onLogout }) => {
  return (
    <div>
      <Header isAuthenticated={isAuthenticated} onAuthClick={onAuthClick} onLogout={onLogout} />
      <HeroSection onGetStarted={() => window.scrollTo({ top: 600, behavior: 'smooth' })} />
      <HowItWorksSection />
    </div>
  );
};

export default LandingPage;
