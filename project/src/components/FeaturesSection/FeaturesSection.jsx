import React from 'react';
import { CreditCard, ShieldCheck, Users } from 'lucide-react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="container">
        <h2>Why Choose CardPerks?</h2>
        <div className="features-grid">
          <div className="feature">
            <CreditCard className="icon" />
            <h3>Share Card Benefits</h3>
            <p>Help others save money while earning rewards for yourself.</p>
          </div>
          <div className="feature">
            <ShieldCheck className="icon" />
            <h3>Secure Transactions</h3>
            <p>Your information is always protected with our secure platform.</p>
          </div>
          <div className="feature">
            <Users className="icon" />
            <h3>Community Driven</h3>
            <p>Join a community of users helping each other save.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;