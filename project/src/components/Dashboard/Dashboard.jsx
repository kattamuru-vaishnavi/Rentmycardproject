import React from 'react';
import Sidebar from './Sidebar';  // Import Sidebar component
import './Dashboard.css';

const Dashboard = () => {
  const handleCardManagement = () => {
    // Add your logic for card management here
    alert('Card Management clicked');
  };

  const handleProductOrderRequest = () => {
    // Add your logic for product order request here
    alert('New Product Order Request clicked');
  };

  return (
    <div className="dashboard-container">
      <Sidebar /> {/* Sidebar on the left */}
      <div className="dashboard">
        <div className="button-container">
          <button className="dashboard-button" onClick={handleCardManagement}>
            <div className="button-title">
              Card Management
            </div>
            <div className="button-subtitle">
              Add and manage your bank cards with special offers
            </div>
          </button>
          <button className="dashboard-button" onClick={handleProductOrderRequest}>
            <div className="button-title">
              New Product Order Request
            </div>
            <div className="button-subtitle">
              Submit new product order requests
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
