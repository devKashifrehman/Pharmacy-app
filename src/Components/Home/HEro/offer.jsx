import React from "react";
import "./offer.css";
import { Link } from "react-router-dom";
const Offer = () => {
  return (
    <div className="offer-banner">
      <div className="offer-text">
        <h3>Special Offer</h3>
        <p>Get 20% off on your first order</p>
      </div>
      <button className="shop-btn">
  <Link to="/shop" className="shop-link">Shop Now</Link>
</button>
    </div>
  );
};

export default Offer;
