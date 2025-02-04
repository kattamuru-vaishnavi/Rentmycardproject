import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import GlideSlider from "./GlideSlider";
import AddCardForm from "./AddCardForm";
import ProductOrderRequest from "./ProductOrderRequest";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [showProductOrderRequestModal, setShowProductOrderRequestModal] = useState(false);
  const [requests, setRequests] = useState([]);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId || !token) {
      setError("User is not authenticated. Please log in again.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/cards/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cards:", err);
        setError("Failed to load cards. Please try again later.");
        setLoading(false);
      });
  }, [userId]);

  const handleCardManagement = () => {
    navigate("/add-card");
  };

  const handleProductOrderRequest = () => {
    alert("New Product Order Request clicked");
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard">
        <div className="button-container">
          <button className="dashboard-button" onClick={handleCardManagement}>Card Management</button>
          <button className="dashboard-button" onClick={handleProductOrderRequest}>New Product Order Request</button>
        </div>

        <GlideSlider />

        <div className="cards-section">
          <h2>Your Cards</h2>
          {loading ? <p>Loading cards...</p> : error ? <p className="error-message">{error}</p> : cards.length === 0 ? <p>No cards added yet.</p> : (
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

      {showAddCardForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddCardForm />
            <button onClick={handleCloseModal} className="close-modal">X</button>
          </div>
        </div>
      )}
      
      {showProductOrderRequestModal && (
        <div className="modal-overlay2">
          <div className="modal-content2">
            <ProductOrderRequest onAddRequest={handleAddRequest} />
            <button onClick={handleCloseProductOrderRequestModal} className="close-modal">X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
