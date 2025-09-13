// src/Payment.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "./firebase"; 
import { addDoc, collection } from "firebase/firestore";
import "./Payment.css";

function Payment() {
  const [paymentType, setPaymentType] = useState("");
  const [notes, setNotes] = useState("");
  const { state } = useLocation();
  const { slot, total } = state || {};
  const navigate = useNavigate();

  const handleBooking = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("⚠️ You must be logged in to book an appointment.");
      return;
    }
    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        userEmail: user.email,
        date: slot?.date || "",
        time: slot?.time || "",
        total: total || 0,
        paymentType,
        notes,
        createdAt: new Date(),
      });
      alert("✅ Booking confirmed and saved!");
    } catch (err) {
      console.error("Error saving booking: ", err);
      alert("❌ Failed to save booking, try again.");
    }
  };

  return (
    <div className="payment-container">
      <h2>Review and confirm your appointment</h2>
      <h3>{slot?.date}</h3>
      <h3>{slot?.time}</h3>
      <h4>Your final total is: {total}$</h4>
      <h5>Please choose a payment method below!</h5>

      <form className="payment-form">
        <label>
          <input
            type="radio"
            name="payment"
            value="payAtVenue"
            checked={paymentType === "payAtVenue"}
            onChange={(e) => setPaymentType(e.target.value)}
          />
          Pay at Venue
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="payByCard"
            checked={paymentType === "payByCard"}
            onChange={(e) => setPaymentType(e.target.value)}
          />
          Pay by Debit/Credit Card
        </label>

        <h4>Booking Notes</h4>
        <textarea
          name="message"
          rows="4"
          placeholder="Enter your message"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button
          type="button"
          className="payment-btn"
          disabled={!paymentType}
          onClick={() => {
            handleBooking();
            navigate("/");
          }}
        >
          Secure booking!
        </button>
      </form>
    </div>
  );
}

export default Payment;
