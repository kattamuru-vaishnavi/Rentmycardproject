import React from 'react';
import './HowItWorksSection.css';

const HowItWorksSection = () => {
  return (
    <section className="how-it-works-section">
      <div className="container">
        <h2>How It Works</h2>
        <div className="steps-grid">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="step">
              <div className="step-number">{step}</div>
              <h3>Step {step}</h3>
              <p>Description for step {step}.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;