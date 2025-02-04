import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCardForm.css";

const AddCardForm = ({ onAddCard, closeModal }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    bankName: "",
    cardType: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      console.error("User is not authenticated");
      setError("User is not authenticated");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/cards/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, userId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Card Added Successfully:", data);

        // Call onAddCard to update frontend state
        if (onAddCard) {
          onAddCard(data);
        }

        // Close modal if the function exists
        if (closeModal) {
          closeModal();
        } else {
          navigate("/"); // Redirect if modal is not used
        }
      } else {
        console.error("Failed to add card");
      }
    } catch (error) {
      setError("Error occurred while adding card");
      console.error("Error:", error);
    }
  };

  return (
    <div className="add-card-container">
      <div className="add-card-sub">
        {closeModal ? (
          <button onClick={closeModal} className="back-button">× Close</button>
        ) : (
          <button onClick={() => navigate(-1)} className="back-button">← Back</button>
        )}

        <h2>Add a Card</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="card-form">
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>

          <label>
            Bank Name:
            <select name="bankName" value={formData.bankName} onChange={handleChange} required>
              <option value="">Select a bank</option>
              <option value="HDFC">HDFC Bank</option>
              <option value="ICICI">ICICI Bank</option>
              <option value="SBI">State Bank of India</option>
              <option value="Axis">Axis Bank</option>
            </select>
          </label>

          <label>
            Card Type:
            <select name="cardType" value={formData.cardType} onChange={handleChange} required>
              <option value="">Select card type</option>
              <option value="Credit">Credit Card</option>
              <option value="Debit">Debit Card</option>
            </select>
          </label>

          <label>
            Amount You Can Manage to Order:
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
          </label>

          <button type="submit" className="submit-button">Add Card Details</button>
        </form>
      </div>
    </div>
  );
};

export default AddCardForm;
