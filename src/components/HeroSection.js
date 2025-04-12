import React from "react";
import "../styles/HeroSection.css"; // Importing external CSS file

const HeroSection = () => {
  return (
    <section>
      {/* Welcome Section */}
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Welcome to <span className="highlight">My Store</span> </h1>
            <h1>Your Shopping </h1>
            <h1>Destination</h1>
            <p className="center-text">
              Discover a wide range of products{" "}
              tailored just for you. Shop with
              ease and find exactly{" "}
              what you need.
            </p>
          </div>
          
        </div>
      </div>

      {/* Discover Section */}
      <div className="discover-section">
        <h2>Discover Your Next Favorite Item</h2>
        <p className="left-text">
          Browse our exclusive collection and find the perfect product tailored
          just for you.
        </p>
        <div className="button-container">
          <button className="shop-btn">Shop</button>
          <button className="learn-btn">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;




