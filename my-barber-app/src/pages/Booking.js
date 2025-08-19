import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

function Booking() {
  const [total, setTotal] = useState(0);
  const [cutType, setCutType] = useState(""); // track selected cut type

  const addToTotal = (amount) => {
    setTotal(prevTotal => Math.max(prevTotal + amount, 0));
  };
  const navigate = useNavigate();

  return (
    <>
      <h1 id="booking-title">KVE Blends</h1>
      <h2 id="booking-subtitle">Booking Page - Here you can schedule your appointment</h2>

      <h4 id="booking-section-title">Please Select between Normal Hour Cuts or After Hour Cuts!</h4>
      <hr id="booking-divider-top" />

      <form id="booking-form">
        
        {/* After Hours Section */}
        <label id="after-hours-label">
          <input
            id="after-hours-radio"
            type="radio"
            name="cutType"
            value="After Hours"
            onChange={(e) => setCutType(e.target.value)}
          />
          After Hours Haircut
        </label>

        <div id="after-hours-shapeup" className="service-item">
          <h5>
            Shapeup 
            <button id="after-hours-shapeup-plus" type="button" disabled={cutType !== "After Hours"} onClick={() => addToTotal(15)}>+</button>
            <button id="after-hours-shapeup-minus" type="button" disabled={cutType !== "After Hours"} onClick={() => addToTotal(-15)}>-</button>
          </h5>
          <p id="after-hours-shapeup-details">20 Mins - $15</p>
        </div>

        <div id="after-hours-haircut-beard" className="service-item">
          <h5>
            Haircut & Beard Trim 
            <button id="after-hours-haircut-beard-plus" type="button" disabled={cutType !== "After Hours"} onClick={() => addToTotal(30)}>+</button>
            <button id="after-hours-haircut-beard-minus" type="button" disabled={cutType !== "After Hours"} onClick={() => addToTotal(-30)}>-</button>
          </h5>
          <p id="after-hours-haircut-beard-details">55 Mins - $30</p>
        </div>

        <div id="after-hours-haircut" className="service-item">
          <h5>
            Haircut 
            <button id="after-hours-haircut-plus" type="button" disabled={cutType !== "After Hours"} onClick={() => addToTotal(25)}>+</button>
            <button id="after-hours-haircut-minus" type="button" disabled={cutType !== "After Hours"} onClick={() => addToTotal(-25)}>-</button>
          </h5>
          <p id="after-hours-haircut-details">40 Mins - $25</p>
        </div>

        <br />
        <hr id="booking-divider-middle" />

        {/* Normal Hours Section */}
        <label id="normal-hours-label">
          <input
            id="normal-hours-radio"
            type="radio"
            name="cutType"
            value="Normal Hours"
            onChange={(e) => setCutType(e.target.value)}
          />
          Normal Hours Haircut
        </label>

        <div id="normal-hours-shapeup" className="service-item">
          <h5>
            Shapeup 
            <button id="normal-hours-shapeup-plus" type="button" disabled={cutType !== "Normal Hours"} onClick={() => addToTotal(10)}>+</button>
            <button id="normal-hours-shapeup-minus" type="button" disabled={cutType !== "Normal Hours"} onClick={() => addToTotal(-10)}>-</button>
          </h5>
          <p id="normal-hours-shapeup-details">20 Mins - $10</p>
          <p id="normal-hours-shapeup-extra">Quick shape up/touch up. No fades/tapers included.</p>
        </div>

        <div id="normal-hours-haircut-beard" className="service-item">
          <h5>
            Haircut & Beard Trim 
            <button id="normal-hours-haircut-beard-plus" type="button" disabled={cutType !== "Normal Hours"} onClick={() => addToTotal(25)}>+</button>
            <button id="normal-hours-haircut-beard-minus" type="button" disabled={cutType !== "Normal Hours"} onClick={() => addToTotal(-25)}>-</button>
          </h5>
          <p id="normal-hours-haircut-beard-details">60 Mins - $25</p>
          <p id="normal-hours-haircut-beard-extra">All haircuts + beard shape-up and trim</p>
        </div>

        <div id="normal-hours-haircut" className="service-item">
          <h5>
            Haircut 
            <button id="normal-hours-haircut-plus" type="button" disabled={cutType !== "Normal Hours"} onClick={() => addToTotal(20)}>+</button>
            <button id="normal-hours-haircut-minus" type="button" disabled={cutType !== "Normal Hours"} onClick={() => addToTotal(-20)}>-</button>
          </h5>
          <p id="normal-hours-haircut-details">40 Mins - $20</p>
          <p id="normal-hours-haircut-extra">Anything from skin fades, tapers, burst fades etc.</p>
        </div>
      </form>

      <hr id="booking-divider-bottom" />
      <p id="total-display">The total cost would be ${total}</p>
      
      <button id="continue-button" type="button" disabled={!cutType} onClick={() => navigate("/timeBook", { state: { total } })}>Continue to time booking!</button>
    </>
  );
}

export default Booking;

