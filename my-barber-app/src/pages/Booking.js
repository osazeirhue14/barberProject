import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./booking.css";

function Booking() {
  const [total, setTotal] = useState(0);
  const [cutType, setCutType] = useState(""); 

  // Track service counts
  const [counts, setCounts] = useState({
    afterShapeup: 0,
    afterHaircutBeard: 0,
    afterHaircut: 0,
    normalShapeup: 0,
    normalHaircutBeard: 0,
    normalHaircut: 0,
  });

  const navigate = useNavigate();

  // Update total & counts
  const updateService = (service, price, change) => {
    setCounts((prev) => {
      const newCount = Math.max(prev[service] + change, 0); // no negative counts
      return { ...prev, [service]: newCount };
    });
    setTotal((prev) => Math.max(prev + price * change, 0));
  };

  // Reset everything when switching between After/Normal Hours
  const handleCutTypeChange = (newType) => {
    setCutType(newType);
    setCounts({
      afterShapeup: 0,
      afterHaircutBeard: 0,
      afterHaircut: 0,
      normalShapeup: 0,
      normalHaircutBeard: 0,
      normalHaircut: 0,
    });
    setTotal(0);
  };

  return (
    <>
      <h1 id="booking-title">KAVE Blends</h1>
      <h2 id="booking-subtitle">Booking Page - Here you can schedule your appointment</h2>

      <h4 id="booking-section-title">Please Select between Normal Hour Cuts or After Hour Cuts!</h4>
      <hr id="booking-divider-top" />

      <form id="booking-form">
        {/* After Hours Section */}
        <label id="after-hours-label">
          <input
            type="radio"
            name="cutType"
            value="After Hours"
            checked={cutType === "After Hours"}
            onChange={(e) => handleCutTypeChange(e.target.value)}
          />
          After Hours Haircut
        </label>

        <div className="service-item">
          <h5>
            Shapeup ({counts.afterShapeup})
            <button 
              type="button" 
              disabled={cutType !== "After Hours"} 
              onClick={() => updateService("afterShapeup", 15, 1)}>+</button>
            <button 
              type="button" 
              disabled={cutType !== "After Hours"} 
              onClick={() => updateService("afterShapeup", 15, -1)}>-</button>
          </h5>
          <p>20 Mins - $15</p>
        </div>

        <div className="service-item">
          <h5>
            Haircut & Beard Trim ({counts.afterHaircutBeard})
            <button 
              type="button" 
              disabled={cutType !== "After Hours"} 
              onClick={() => updateService("afterHaircutBeard", 30, 1)}>+</button>
            <button 
              type="button" 
              disabled={cutType !== "After Hours"} 
              onClick={() => updateService("afterHaircutBeard", 30, -1)}>-</button>
          </h5>
          <p>55 Mins - $30</p>
        </div>

        <div className="service-item">
          <h5>
            Haircut ({counts.afterHaircut})
            <button 
              type="button" 
              disabled={cutType !== "After Hours"} 
              onClick={() => updateService("afterHaircut", 25, 1)}>+</button>
            <button 
              type="button" 
              disabled={cutType !== "After Hours"} 
              onClick={() => updateService("afterHaircut", 25, -1)}>-</button>
          </h5>
          <p>40 Mins - $25</p>
        </div>

        <br />
        <hr />

        {/* Normal Hours Section */}
        <label id="normal-hours-label">
          <input
            type="radio"
            name="cutType"
            value="Normal Hours"
            checked={cutType === "Normal Hours"}
            onChange={(e) => handleCutTypeChange(e.target.value)}
          />
          Normal Hours Haircut
        </label>

        <div className="service-item">
          <h5>
            Shapeup ({counts.normalShapeup})
            <button 
              type="button" 
              disabled={cutType !== "Normal Hours"} 
              onClick={() => updateService("normalShapeup", 10, 1)}>+</button>
            <button 
              type="button" 
              disabled={cutType !== "Normal Hours"} 
              onClick={() => updateService("normalShapeup", 10, -1)}>-</button>
          </h5>
          <p>20 Mins - $10</p>
        </div>

        <div className="service-item">
          <h5>
            Haircut & Beard Trim ({counts.normalHaircutBeard})
            <button 
              type="button" 
              disabled={cutType !== "Normal Hours"} 
              onClick={() => updateService("normalHaircutBeard", 25, 1)}>+</button>
            <button 
              type="button" 
              disabled={cutType !== "Normal Hours"} 
              onClick={() => updateService("normalHaircutBeard", 25, -1)}>-</button>
          </h5>
          <p>60 Mins - $25</p>
        </div>

        <div className="service-item">
          <h5>
            Haircut ({counts.normalHaircut})
            <button 
              type="button" 
              disabled={cutType !== "Normal Hours"} 
              onClick={() => updateService("normalHaircut", 20, 1)}>+</button>
            <button 
              type="button" 
              disabled={cutType !== "Normal Hours"} 
              onClick={() => updateService("normalHaircut", 20, -1)}>-</button>
          </h5>
          <p>40 Mins - $20</p>
        </div>
      </form>

      <hr />
      <p id="total-display">The total cost would be ${total}</p>

      <button 
        type="button" 
        disabled={!cutType} 
        onClick={() => navigate("/timeBook", { state: { total, counts } })}
      >
        Continue to time booking!
      </button>
    </>
  );
}

export default Booking;
