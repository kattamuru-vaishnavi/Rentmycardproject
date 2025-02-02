// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection/HowItWorksSection';
import AuthModal from './components/AuthModal/AuthModal';
import Dashboard from './components/Dashboard/Dashboard';
import AddCardForm from './components/Dashboard/AddCardForm';

import './index.css';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cards, setCards] = useState([]); // New state to hold the card details

  const handleAuthClick = (type) => {
    setAuthType(type);
    setShowAuthModal(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleAddCard = (card) => {
    setCards((prevCards) => [...prevCards, card]);
  };

  const handleEditCard = (index, updatedCard) => {
    const updatedCards = [...cards];
    updatedCards[index] = updatedCard;
    setCards(updatedCards);
  };

  const handleDeleteCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Header
          isAuthenticated={isAuthenticated}
          onAuthClick={handleAuthClick}
          onLogout={() => setIsAuthenticated(false)}
        />
        <main className="pt-20">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Dashboard
                    cards={cards}
                    onEditCard={handleEditCard}
                    onDeleteCard={handleDeleteCard}
                  />
                ) : (
                  <>
                    <HeroSection onGetStarted={() => handleAuthClick('signup')} />
                    <FeaturesSection />
                    <HowItWorksSection />
                  </>
                )
              }
            />
            <Route
              path="/add-card"
              element={<AddCardForm onAddCard={handleAddCard} />} // Pass handleAddCard to AddCardForm
            />
          </Routes>
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
    </Router>
  );
}

export default App;
