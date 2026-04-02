import React from 'react';
import axios from 'axios';

function Payment({ userId }) {
  const handleSubscribe = async (plan) => {
    await axios.post(`http://localhost:5000/payment/${userId}`, { plan });
    alert(`Subscribed to ${plan} plan`);
  };

  if (!userId) return <p>Please sign in.</p>;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Upgrade Your Plan</h1>
      <button onClick={() => handleSubscribe('monthly')}>Monthly ($9.99)</button>
      <button onClick={() => handleSubscribe('yearly')}>Yearly ($99.99)</button>
    </div>
  );
}

export default Payment;