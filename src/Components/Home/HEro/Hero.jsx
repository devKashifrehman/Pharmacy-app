import React, { useState, useEffect } from "react";
import "./Hero.css";
import Category from "./category";
import PopMedi from "./Popmedi";
import Offer from "./offer";
import Message from "../../Talkto/Message";
import { Link } from "react-router-dom";

// Example images (replace with your own from src/assets or src/images)
import img1 from "../../../Assets/1.3d.jpg";
import img2 from "../../../Assets/1.jpg";
import img3 from "../../../Assets/2.jpg";

// Each slide will have image + title + tagline
const slides = [
  {
    img: img1,
    title: "Welcome to MediAssist Pharmacy",
    tagline: "Delivering Trusted Medicines, Anytime, Anywhere.",
  },
  {
    img: img2,
    title: "Your Smart Healthcare Hub",
    tagline: "Where Wellness Meets Convenience.",
  },
  {
    img: img3,
    title: "Caring for You, Beyond the Counter",
    tagline: "From Prescription to Doorstep — Seamless Healthcare.",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [open,setopen]=useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000); // 4 sec auto slide
    return () => clearInterval(timer);
  }, []);

  return (
    
    <>
      {/* Hero Slider */}
      <div className="hero-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="overlay">
              <h1>{slide.title}</h1>
              <p>{slide.tagline}</p>
              <button className="shop-btn">
  <Link to="/shop" className="shop-link">Shop Now</Link>
</button>
            </div>
          </div>
        ))}
      </div>

      {/* Category Section */}
      <Category />

      {/* Popular Medicines Section */}
      <PopMedi />
      {/* Special Offer Section */}
      <Offer />
      {/* {talk to agent} */}
      <Message open={open} setOpen={setopen} />
    </>
  );
};

export default HeroSection;
