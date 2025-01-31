import React, { useState } from 'react';
import { CreditCard, LogIn, UserPlus, ShieldCheck, Users } from 'lucide-react';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthClick = (type: 'login' | 'signup') => {
    setAuthType(type);
    setShowAuthModal(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  return (
    <div className="min-h-screen bg-[#fffff0]">
      {/* Header */}
      <header className="bg-[#663046] text-white fixed w-full z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-8 w-8" />
            <span className="text-2xl font-bold">CardPerks</span>
          </div>
          {!isAuthenticated && (
            <div className="flex space-x-4">
              <button
                onClick={() => handleAuthClick('login')}
                className="px-4 py-2 rounded-lg bg-white text-[#663046] hover:bg-opacity-90 flex items-center"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </button>
              <button
                onClick={() => handleAuthClick('signup')}
                className="px-4 py-2 rounded-lg border-2 border-white hover:bg-white hover:text-[#663046] flex items-center"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </button>
            </div>
          )}
          {isAuthenticated && (
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 rounded-lg border-2 border-white hover:bg-white hover:text-[#663046]"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-20">
        {isAuthenticated ? (
          <Dashboard />
        ) : (
          <div className="min-h-screen">
            {/* Hero Section */}
            <section className="container mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-screen">
              <h1 className="text-4xl md:text-5xl font-bold text-[#663046] mb-6 text-center">
                Welcome to CardPerks
              </h1>
              <p className="text-xl text-gray-700 mb-8 text-center max-w-2xl">
                Connect with cardholders, share benefits, and save money on your purchases.
              </p>
              <button
                onClick={() => handleAuthClick('signup')}
                className="px-8 py-3 bg-[#663046] text-white rounded-lg hover:bg-opacity-90 text-lg"
              >
                Get Started Today
              </button>
            </section>

            {/* Features Section */}
            <section className="bg-white py-16">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-[#663046] mb-12 text-center">
                  Why Choose CardPerks?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-[#fffff0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-8 h-8 text-[#663046]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Share Card Benefits</h3>
                    <p className="text-gray-600">
                      Help others save money while earning rewards for yourself
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#fffff0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck className="w-8 h-8 text-[#663046]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                    <p className="text-gray-600">
                      Your information is always protected with our secure platform
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#fffff0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-[#663046]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                    <p className="text-gray-600">
                      Join a community of users helping each other save
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-[#663046] mb-12 text-center">
                  How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#663046] mb-4">1</div>
                    <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
                    <p className="text-gray-600">
                      Create your account in minutes
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#663046] mb-4">2</div>
                    <h3 className="text-xl font-semibold mb-2">Add Your Cards</h3>
                    <p className="text-gray-600">
                      Register your cards with special offers
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#663046] mb-4">3</div>
                    <h3 className="text-xl font-semibold mb-2">Browse Requests</h3>
                    <p className="text-gray-600">
                      Find purchase requests that match your cards
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#663046] mb-4">4</div>
                    <h3 className="text-xl font-semibold mb-2">Start Earning</h3>
                    <p className="text-gray-600">
                      Help others and earn rewards
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Auth Modal */}
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