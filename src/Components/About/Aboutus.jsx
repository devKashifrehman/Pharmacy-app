import React, { useState } from "react";
import "./Aboutus.css";
import Mission from "./Mission";
import Message from "../Talkto/Message"; // Correct import (Message = PharmacyToast)

// Image import from assets
import pharmacyImg from "../../Assets/doct.jpeg";

const Aboutus = () => {
  // State to control the PharmacyToast
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <br />
      <br />
      <section className="aboutus">
        <div className="aboutus-container">
          <div className="aboutus-image">
            <img src={pharmacyImg} alt="Pharmacy" />
          </div>
          <div className="aboutus-text">
            <h2>Pharmacy Introduction</h2>
            <p>
              XYZ Pharmacy has been serving the community since 2010, providing
              high-quality medicines and healthcare advice with personalized care.
            </p>
            {/* Button to open the PharmacyToast */}
          </div>
        </div>
      </section>

      {/* Mission Component */}
      <Mission />

      {/* PharmacyToast Component */}
      <Message open={isOpen} setOpen={setIsOpen} />
    </>
  );
};

export default Aboutus;
