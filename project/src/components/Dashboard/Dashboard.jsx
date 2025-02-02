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
            Card Management
          </button>
          <button className="dashboard-button" onClick={handleProductOrderRequest}>
            New Product Order Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
