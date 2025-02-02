import React from 'react';
import './PayNow.css';

const PayNow = ({ totalAmount, onPay }) => {
  const platformFee = 0.06; // 6% platform fee
  const finalAmount = totalAmount + totalAmount * platformFee;

  return (
    <div className="pay-now">
      <p className="platform-fee">
        Platform Fee (6%): ₹{(totalAmount * platformFee).toLocaleString()}
      </p>
      <p className="final-amount">
        Final Amount: ₹{finalAmount.toLocaleString()}
      </p>
      <button onClick={() => onPay(finalAmount)} className="pay-button">
        Pay Now
      </button>
    </div>
  );
};

export default PayNow;