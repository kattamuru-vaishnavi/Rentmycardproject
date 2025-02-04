import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Sidebar from './Sidebar'; // Import Sidebar component
import GlideSlider from './GlideSlider'; // Import GlideSlider component
import './Dashboard.css';

const Dashboard = ({ cards, onEditCard, onDeleteCard }) => { // Receive cards, onEditCard, onDeleteCard props
  const navigate = useNavigate();

  const handleCardManagement = () => {
    navigate('/add-card');
  };

  const handleProductOrderRequest = () => {
    // Add your logic for product order request here
    navigate('/product-order-request');
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

        <GlideSlider /> {/* Add GlideSlider below the buttons */}
        
        {/* Cards Section */}
        <div className="cards-section">
          <h2>Your Cards</h2>
          {cards.length === 0 ? (
            <p>No cards added yet.</p>
          ) : (
            <div className="cards-list">
              {cards.map((card, index) => (
                <div key={index} className="card-item">
                  <h3>{card.name}</h3>
                  <p>Bank: {card.bankName}</p>
                  <p>Card Type: {card.cardType}</p>
                  <p>Amount: ₹{card.amount}</p>
                  <div className="card-actions">
                    <button onClick={() => onEditCard(index)} className="edit-button">Edit</button>
                    <button onClick={() => onDeleteCard(index)} className="delete-button">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;