import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useLocation, useNavigate } from "react-router-dom";

function TimeBook() {
  const [timeslots, setTimeslots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimeslots = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "timeslots"));
        let allSlots = [];

        querySnapshot.forEach(docSnap => {
          const data = docSnap.data();
          if (data.slots) {
            const slotsWithDate = data.slots.map(slot => ({
              ...slot,
              date: docSnap.id
            }));
            allSlots = [...allSlots, ...slotsWithDate];
          }
        });

        setTimeslots(allSlots);
      } catch (err) {
        console.error("Error fetching timeslots:", err);
      }
    };

    fetchTimeslots();
  }, []);

  const { state } = useLocation();

  // Group slots by date
  const groupedByDate = timeslots.reduce((acc, slot) => {
    if (!slot.booked) {
      if (!acc[slot.date]) acc[slot.date] = [];
      acc[slot.date].push(slot);
    }
    return acc;
  }, {});

  return (
    <div>
      <h2>Available Times</h2>
      <hr />
      <p>Your final total is ${state.total}. Please choose from one of the times below!</p>
      <button onClick={() => navigate("/Booking")}>Back</button>
      {Object.keys(groupedByDate).map(date => (
        <div key={date} style={{ marginBottom: "20px" }}>
          <h3>{date}</h3>
          {groupedByDate[date].map((slot, index) => (
            <button
              key={index}
              onClick={() => setSelectedSlot(slot)}
              style={{
                margin: "5px",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid gray",
                backgroundColor: selectedSlot === slot ? "lightgreen" : "white",
                cursor: "pointer"
              }}
            >
              {slot.time}
            </button>
          ))}
        </div>
      ))}

      {selectedSlot && (
        <p style={{ marginTop: "20px" }}>
          ✅ You selected: {selectedSlot.date} at {selectedSlot.time}
        </p>
      )}
      <p>Click proceed to book your slot!</p>
      <button>Proceed</button>
    </div>
  );
}

export default TimeBook;
//
//const handleBook = async (slot) => {
//  try {
//    const docRef = doc(db, "timeslots", slot.date);

  //  const updatedSlots = timeslots
  //    .filter(s => s.date === slot.date)
  //    .map(s => s.time === slot.time ? { ...s, booked: true } : s);
//
 //   await updateDoc(docRef, { slots: updatedSlots });

   // alert(`Booked ${slot.date} at ${slot.time} ✅`);
   // setSelectedSlot(null); // reset selection
//  } catch (err) {
  //  console.error("Error booking slot:", err);
//  }
//};


