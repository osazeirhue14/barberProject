import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Payment() {
  const [paymentType, setPaymentType] = useState("");
  const { state } = useLocation();
  const { slot } = state || {};

  return (
    <>
      <h2>Please choose an option to pay below</h2>
      <h4>Your final total is: {state.total}$ and your booking is for: {slot.date} at {slot.time}</h4>

      <form>
        <label>
          <input
            type="radio"
            name="payment"
            value="venue"
            checked={paymentType === "venue"}
            onChange={(e) => setPaymentType(e.target.value)}
          />
          Pay at Venue
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentType === "card"}
            onChange={(e) => setPaymentType(e.target.value)}
          />
          Pay by Debit/Credit Card
        </label>
      </form>
    </>
  );
}

export default Payment;
