import React, { useState } from 'react';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection/HowItWorksSection';
import AuthModal from './components/AuthModal/AuthModal';
import Dashboard from './components/Dashboard/Dashboard';

import './index.css';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthClick = (type) => {
    setAuthType(type);
    setShowAuthModal(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  return (
    <div className="min-h-screen">
      <Header
        isAuthenticated={isAuthenticated}
        onAuthClick={handleAuthClick}
        onLogout={() => setIsAuthenticated(false)}
      />
      <main className="pt-20">
        {isAuthenticated ? (
          <Dashboard />
        ) : (
          <>
            <HeroSection onGetStarted={() => handleAuthClick('signup')} />
            <FeaturesSection />
            <HowItWorksSection />
          </>
        )}
      </main>
      {showAuthModal && (
        <AuthModal
          type={authType}
          onClose={() => setShowAuthModal(false)}
          onSwitch={(type) => setAuthType(type)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
    
  );
}

export default App;