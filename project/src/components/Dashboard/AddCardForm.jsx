// AddCardForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './AddCardForm.css';

const AddCardForm = ({ onAddCard }) => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: '',
    bankName: '',
    cardType: '',
    amount: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userId = "replace_with_authenticated_user_id"; // Fetch from auth state
      const response = await fetch("http://localhost:5001/api/cards/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Card Added Successfully:", data);
        navigate("/");
      } else {
        console.error("Failed to add card");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="add-card-container">
      <div className="add-card-sub">
        <button onClick={handleBack} className="back-button">← Back</button> {/* Back Button */}
        
        <h2>Add a Card</h2>
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
