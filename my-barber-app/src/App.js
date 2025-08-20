// Import React so we can use JSX
import React from 'react';

// Import routing tools from react-router-dom
// Routes = container for all routes
// Route = defines a single path and which component to show
// Link = clickable navigation without reloading the page
import { Routes, Route, Link } from 'react-router-dom';

// Import our page components
import Home from './pages/Home';
import Booking from './pages/Booking';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import TimeBook from './pages/TimeBook';
import Payment from './pages/Payment';

function App() {
  return (
    <div>
      {/* Navigation menu with links to different pages */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/booking">Booking</Link> |{" "}
        <Link to="/gallery">Gallery</Link> |{" "}
        <Link to="/login">Login</Link>
      </nav>

      {/* Define all the routes for the app */}
      <Routes>
        <Route path="/" element={<Home />} />          {/* Home page */}
        <Route path="/booking" element={<Booking />} />{/* Booking page */}
        <Route path="/gallery" element={<Gallery />} />{/* Gallery page */}
        <Route path="/login" element={<Login />} />    {/* Login page */}
        <Route path="/timeBook" element={<TimeBook />} />    {/* time booking page */}
        <Route path="/payment" element={<Payment />} />

      </Routes>
    </div>
  );
}

export default App;


