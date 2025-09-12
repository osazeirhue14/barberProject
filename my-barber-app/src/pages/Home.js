// Import React to create a functional component
import React from 'react';
import "./home.css";

// This is the main home page shown when visiting "/"
function Home() {
  return (
    <>
    <div id="header">
      {/* Main heading for the barber shop */}
      <h1 id="title">KAVE Blends </h1>

      {/* Short introduction message */}
      <p id="hero">At KAVE Blends, every cut is a work of art. Book now and see our gallery of fresh styles!</p>

      <button id="book">Book Now!</button>

      
    </div>

    <div>
      <h2 id="about">About</h2>
      
      <p id="about-par">I’m a self-taught barber from Newbridge, Co. Kildare with over five years of hands-on experience. Skilled in working with both Afro and straight hair, I focus on precision cuts and modern styles tailored to each client. I’m currently based at Supreme Cutz, Newbridge, where I continue to perfect my craft and deliver top-quality service every day.


      </p>

     

    </div>

    <h2 id="work">Some of my Work!</h2>

        <img src="images/cut10.jpg" alt="" id="img1"></img>
        <img src="images/cut1.jpg" alt="" id="img1"></img>
        <img src="images/cut3.jpg" alt="" id="img1"></img>
        <img src="images/cut12.jpg" alt="" id="img1"></img>
        <img src="images/cut9.jpg" alt="" id="img1"></img>

    <div id="bottom">
      <h3 id="contact">Contact Me:</h3>
      <ul>
        <li id="insta">Instagram: <a href="https://www.instagram.com/kaveblends/?next=%2F">Kaveblends</a></li>
        <li id="tiktok">Tiktok: <a href="https://www.tiktok.com/@kaveblends?_t=ZN-8z2hPmKHmac&_r=1">KaveBlends</a></li>
        <li id="phone">Phone number: <a href="tel:+0892571383"> 0892571383</a></li>
      </ul>
        <div className="logos">
          <img src="images/insta-logo.png" alt="" id="insta-logo"></img>
          <img src="images/tiktok-logo.png" alt="" id="tiktok-logo"></img>
          <img src="images/phone-logo.png" alt="" id="phone-logo"></img>
        </div>    
    </div>

    
    <div>
      <h2>Reviews</h2>
      <button id="ReviewButton">Add Review</button>
    </div>
    </>
  );
}

export default Home;
