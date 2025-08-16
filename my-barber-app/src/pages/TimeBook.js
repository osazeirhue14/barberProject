import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function TimeBook() {
  const [timeslots, setTimeslots] = useState([]);

  useEffect(() => {
    const fetchTimeslots = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "timeslots"));

        let allSlots = [];

        querySnapshot.forEach(docSnap => {
          const data = docSnap.data();
          if (data.slots) {
            // add the date into each slot so we know which day it belongs to
            const slotsWithDate = data.slots.map(slot => ({
              ...slot,
              date: docSnap.id
            }));
            allSlots = [...allSlots, ...slotsWithDate];
          }
        });

        console.log("All slots:", allSlots);
        setTimeslots(allSlots);
      } catch (err) {
        console.error("Error fetching timeslots:", err);
      }
    };

    fetchTimeslots();
  }, []);

  return (
    <div>
      <h2>Available Times</h2>
      <hr></hr>
      <p>Please choose from one of the times below!</p>
      <ul>
        
        {timeslots
          .filter(slot => !slot.booked) // only free ones
          .map((slot, index) => (
          
           <button id="slotTime" style={{margin:"5px"}} key={index}>
              {slot.date} at {slot.time}
            </button>
            
          ))}
          
      </ul>
      
    </div>
  );
}

export default TimeBook;

