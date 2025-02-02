import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import GlideSlider from "./GlideSlider";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const userId = "replace_with_authenticated_user_id"; // TODO: Replace with actual authenticated user ID

  useEffect(() => {
    fetch(`http://localhost:5001/api/cards/${userId}`)
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error("Error fetching cards:", err));
  }, [userId]);

  const handleCardManagement = () => {
    navigate("/add-card");
  };

  const handleProductOrderRequest = () => {

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard">
        <div className="button-container">
          <button className="dashboard-button" onClick={handleCardManagement}>
            <div className="button-title">Card Management</div>
            <div className="button-subtitle">
              Add and manage your bank cards with special offers
            </div>
          </button>
          <button className="dashboard-button" onClick={handleProductOrderRequest}>
            <div className="button-title">New Product Order Request</div>
            <div className="button-subtitle">
              Submit new product order requests
            </div>
          </button>
        </div>

        <GlideSlider />

        {/* Cards Section */}
        <div className="cards-section">
          <h2>Your Cards</h2>
          {cards.length === 0 ? (
            <p>No cards added yet.</p>
          ) : (
            <div className="cards-list">
              {cards.map((card) => (
                <div key={card._id} className="card-item">
                  <h3>{card.name}</h3>
                  <p>Bank: {card.bankName}</p>
                  <p>Card Type: {card.cardType}</p>
                  <p>Amount: ₹{card.amount}</p>
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