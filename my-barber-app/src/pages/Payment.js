// src/Payment.js
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { db, auth } from "./firebase"; 
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [paymentType, setPaymentType] = useState("");
  const [notes, setNotes] = useState("");
  const { state } = useLocation();
  const { slot, total } = state || {};
  const navigate = useNavigate();

  const handleBooking = async () => {
    const user = auth.currentUser; // logged-in user

    if (!user) {
      alert("⚠️ You must be logged in to book an appointment.");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,       // unique ID from Firebase Auth
        userEmail: user.email,  // store email for convenience
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
    <>
      <h2>Review and confirm your appointment</h2>
      
      <h3>{slot?.date}</h3>
      <h3>{slot?.time}</h3>
      <h4>Your final total is: {total}$</h4>
      <h5>Please choose a payment method below!</h5>

      <form>
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
        <br />
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
      </form>

      <br />
      <h4>Booking Notes</h4>
      <textarea
        name="message"
        rows="4"
        cols="50"
        placeholder="Enter your message"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <br />
    <button 
  type="button" 
  onClick={() => { 
    handleBooking(); 
    navigate("/"); 
  }}  
  disabled={!paymentType}
>
  Secure booking!
</button>

    </>
  );
}

export default Payment;
