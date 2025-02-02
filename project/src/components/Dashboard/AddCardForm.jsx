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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onAddCard function to add the card to the state
    onAddCard(formData);
    // Navigate back to the dashboard after adding the card
    navigate('/');
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
