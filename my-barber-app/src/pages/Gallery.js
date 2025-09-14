// Import React to create a functional component
import React, { useState } from "react";
import "./gallery.css";

export default function Gallery() {
  const images = [
    "images/cut1.jpg",
    "images/cut2.jpg",
    "images/cut3.jpg",
    "images/cut4.jpg",
    "images/cut5.jpg",
    "images/cut6.jpg",
    "images/cut7.jpg",
    "images/cut8.jpg",
    "images/cut9.jpg",
    "images/cut10.jpg",
    "images/cut11.jpg",
    "images/cut12.jpg",
    "images/cut13.jpg",
    "images/cut14.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + visibleCount >= images.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? images.length - visibleCount : prev - 1
    );
  };

  return (
    <div>
      <h2 id="gallery-title">Gallery Page - View my past work</h2>

      <div className="carousel-container">
        <button className="prev" onClick={prevSlide}>
          &lt;
        </button>

        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {images.map((src, i) => (
              <img key={i} src={src} alt={`Slide ${i + 1}`} />
            ))}
          </div>
        </div>

        <button className="next" onClick={nextSlide}>
          &gt;
        </button>
      </div>
      <h4>Welcome to the KAVE Blends gallery – a showcase of sharp fades, clean line-ups, and modern styles tailored to every client. Each cut reflects both skill and creativity, designed to bring out your best look while keeping it fresh and personal. Take a scroll through our work, get inspired, and imagine the style that’s waiting for you</h4>
    </div>
  );
}
