import React, { useState } from 'react';

function Booking() {
  const [total, setTotal] = useState(0);
  const [cutType, setCutType] = useState(""); // track selected cut type

const addToTotal = (amount) => {
  setTotal(prevTotal => Math.max(prevTotal + amount, 0));
};


  return (
    <>
      <h1>KVE Blends</h1>
      <h2>Booking Page - Here you can schedule your appointment</h2>

      <h4>Please Select between Normal Hour Cuts or After Hour Cuts!</h4>
      <hr />

      <form>
        
        <label>
          <input
            type="radio"
            name="cutType"
            value="After Hours"
            onChange={(e) => setCutType(e.target.value)}
          />
          After Hours Haircut
        </label>

        <h5>
          Shapeup 
          <button type="button" disabled={cutType !== "After Hours"} onClick={() => addToTotal(15)}>+</button>
          <button type="button" disabled={cutType !== "After Hours"} onClick={() => addToTotal(-15)}>-</button>
        </h5>
        <p>20 Mins - $15</p>

        <h5>
          Haircut & Beard Trim 
          <button type="button" disabled={cutType !== "After Hours"} onClick={() => addToTotal(30)}>+</button>
          <button type="button" disabled={cutType !== "After Hours"} onClick={() => addToTotal(-30)}>-</button>
        </h5>
        <p>55 Mins - $30</p>

        <h5>
          Haircut 
          <button type="button" disabled={cutType !== "After Hours"} onClick={() => addToTotal(25)}>+</button>
          <button type="button" disabled={cutType !== "After Hours"} onClick={() => addToTotal(-25)}>-</button>
        </h5>
        <p>40 Mins - $25</p>

        <br />
        <hr />

        
        <label>
          <input
            type="radio"
            name="cutType"
            value="Normal Hours"
            onChange={(e) => setCutType(e.target.value)}
          />
          Normal Hours Haircut
        </label>

        <h5>
          Shapeup 
          <button type="button" disabled={cutType !== "Normal Hours"} onClick={() => addToTotal(10)}>+</button>
          <button type="button" disabled={cutType !== "Normal Hours"} onClick={() => addToTotal(-10)}>-</button>
        </h5>
        <p>20 Mins - $10</p>
        <p>Quick shape up/touch up. No fades/tapers included.</p>

        <h5>
          Haircut & Beard Trim 
          <button type="button" disabled={cutType !== "Normal Hours"} onClick={() => addToTotal(25)}>+</button>
          <button type="button" disabled={cutType !== "Normal Hours"} onClick={() => addToTotal(-25)}>-</button>
        </h5>
        <p>60 Mins - $25</p>
        <p>All haircuts + beard shape-up and trim</p>

        <h5>
          Haircut 
          <button type="button" disabled={cutType !== "Normal Hours"} onClick={() => addToTotal(20)}>+</button>
          <button type="button" disabled={cutType !== "Normal Hours"} onClick={() => addToTotal(-20)}>-</button>
        </h5>
        <p>40 Mins - $20</p>
        <p>Anything from skin fades, tapers, burst fades etc.</p>
      </form>

      <hr />
      <p>The total cost would be ${total}</p>
      <button disabled={!cutType}>Continue to time booking!</button>
    </>
  );
}

export default Booking;

