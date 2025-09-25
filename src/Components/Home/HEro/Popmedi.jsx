import React from "react";
import "./Popmedi.css";

// Images ko import kar lo
import ParacetamolImg from "../../../Assets/paracetamol.jpeg";
import VitaminCImg from "../../../Assets/vitaminC.jpeg";
import AntibioticImg from "../../../Assets/antibiotic.jpeg";

const PopMedi = () => {
  const medicines = [
    { name: "Paracetamol", price: "$5.00", icon: ParacetamolImg },
    { name: "Vitamin C", price: "$10.00", icon: VitaminCImg },
    { name: "Antibiotic", price: "$15.00", icon: AntibioticImg },
  ];

  return (
    <div className="popmedi-section">
      <h2>Popular Medicines</h2>
      <div className="popmedi-grid">
        {medicines.map((med, index) => (
          <div key={index} className="popmedi-card">
            <img src={med.icon} alt={med.name} />
            <h3>{med.name}</h3>
            <p className="price">{med.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopMedi;
