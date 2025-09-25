import React from "react";
import "./Mission.css";

const Mission = () => {
  return (
    <section className="mission">
      <h2>Mission & Vision</h2>
      <div className="mission-cards">
        <div className="card mission-card">
          <div className="icon">🎯</div>
          <h3>Mission</h3>
          <p>
            To provide safe and affordable medications with personalized care.
          </p>
        </div>
        <div className="card vision-card">
          <div className="icon">👁️</div>
          <h3>Vision</h3>
          <p>
            To become the most trusted pharmacy in the region, promoting health
            and wellness.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mission;
