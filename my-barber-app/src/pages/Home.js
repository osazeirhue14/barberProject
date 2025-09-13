import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db, auth } from "./firebase";
import "./home.css";

function Home() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  // Fetch reviews from Firebase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const reviewsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(reviewsData.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds));
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  // Add a new review
  const handleAddReview = async () => {
    if (!auth.currentUser) {
      alert("⚠️ You must be logged in to leave a review.");
      return;
    }
    if (!newReview.trim() || newRating === 0) {
      alert("Please write a review and select a star rating.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        text: newReview,
        rating: newRating,
        timestamp: serverTimestamp(),
      });

      setReviews(prev => [
        { id: docRef.id, userId: auth.currentUser.uid, userEmail: auth.currentUser.email, text: newReview, rating: newRating, timestamp: new Date() },
        ...prev
      ]);

      setNewReview("");
      setNewRating(0);
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  // Helper to render stars
  const renderStars = (rating) => {
    const fullStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return fullStars + emptyStars;
  };

  return (
    <>
      {/* Header */}
      <div id="header">
        <h1 id="title">KAVE Blends</h1>
        <p id="hero">At KAVE Blends, every cut is a work of art. Book now and see our gallery of fresh styles!</p>
        <button id="book">Book Now!</button>
      </div>

      {/* About Section */}
      <div>
        <h2 id="about">About</h2>
        <p id="about-par">
          I’m a self-taught barber from Newbridge, Co. Kildare with over five years of hands-on experience. Skilled in working with both Afro and straight hair, I focus on precision cuts and modern styles tailored to each client. I’m currently based at Supreme Cutz, Newbridge, where I continue to perfect my craft and deliver top-quality service every day.
        </p>
      </div>

      {/* Work/Gallery */}
      <h2 id="work">Some of my Work!</h2>
      <img src="images/cut10.jpg" alt="" id="img1" />
      <img src="images/cut1.jpg" alt="" id="img1" />
      <img src="images/cut3.jpg" alt="" id="img1" />
      <img src="images/cut12.jpg" alt="" id="img1" />
      <img src="images/cut9.jpg" alt="" id="img1" />

      {/* Contact Section */}
      <div id="bottom">
        <h3 id="contact">Contact Me:</h3>
        <div className="logos">
          <div className="logo-item">
            <a id="insta" href="https://www.instagram.com/kaveblends/?next=%2F">Kaveblends</a>
            <img src="images/insta-logo.png" alt="" id="insta-logo" />
          </div>
          <div className="logo-item">
            <a id="tiktok" href="https://www.tiktok.com/@kaveblends?_t=ZN-8z2hPmKHmac&_r=1">KaveBlends</a>
            <img src="images/tiktok-logo.png" alt="" id="tiktok-logo" />
          </div>
          <div className="logo-item">
            <a id="Phone-Number" href="tel:+0892571383">0892571383</a>
            <img src="images/phone-logo.png" alt="" id="phone-logo" />
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div style={{ margin: "50px auto", maxWidth: "700px", padding: "20px", border: "2px solid #ccc", borderRadius: "12px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Reviews</h2>

        {auth.currentUser ? (
          <div style={{ marginBottom: "20px" }}>
            <textarea
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px" }}
              rows="3"
              placeholder="Write your review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <div style={{ marginBottom: "10px", fontSize: "24px", cursor: "pointer" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setNewRating(star)}
                  style={{ color: star <= newRating ? "gold" : "#ccc" }}
                >
                  ★
                </span>
              ))}
            </div>
            <button
              onClick={handleAddReview}
              style={{ padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "lightslategray", color: "white", cursor: "pointer" }}
            >
              Add Review
            </button>
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "darkred", marginBottom: "20px" }}>
            You must be logged in to leave a review.
          </p>
        )}

        <div>
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first!</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}>
                <p style={{ fontWeight: "bold" }}>{rev.userEmail} says:</p>
                <p>{rev.text}</p>
               <p style={{ color: "gold", fontSize: "20px" }}>{renderStars(rev.rating)}</p>

              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
