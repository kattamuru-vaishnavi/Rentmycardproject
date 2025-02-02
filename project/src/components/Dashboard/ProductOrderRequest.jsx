// ProductOrderRequest.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductOrderRequest.css';

const ProductOrderRequest = ({ onAddProductOrder }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    productName: '',
    ecommerceWebsite: '',
    productLink: '',
    bankCard: '',
    cardType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProductOrder(formData);
    alert('Product Order Request Submitted Successfully!');
    setFormData({ name: '', productName: '', ecommerceWebsite: '', productLink: '', bankCard: '', cardType: '' });
    navigate('/');
  };
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="product-order-request-container">
      <div className="product-order-request-sub-container">
      <button onClick={handleBack} className="back-button">X</button> {/* Back Button */}
      
      <h2>Request Product Order</h2>
        <form className="product-order-form" onSubmit={handleSubmit}>
          <label>Name:<input type="text" name="name" value={formData.name} onChange={handleChange} required /></label>
          <label>Product Name:<input type="text" name="productName" value={formData.productName} onChange={handleChange} required /></label>
          <label>E-commerce Website:<input type="text" name="ecommerceWebsite" value={formData.ecommerceWebsite} onChange={handleChange} required /></label>
          <label>Product Link:<input type="url" name="productLink" value={formData.productLink} onChange={handleChange} required /></label>
          <label>Bank Card with Offer:<select name="bankName" value={formData.bankName} onChange={handleChange} required>
              <option value="">Select a bank</option>
              <option value="HDFC">HDFC Bank</option>
              <option value="ICICI">ICICI Bank</option>
              <option value="SBI">State Bank of India</option>
              <option value="Axis">Axis Bank</option>
            </select></label>
          <label>Card Type:
            <select name="cardType" value={formData.cardType} onChange={handleChange} required>
              <option value="">Select card type</option>
              <option value="Credit">Credit Card</option>
              <option value="Debit">Debit Card</option>
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProductOrderRequest;
