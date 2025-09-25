import React from "react";
import "./category.css";

// Import images directly
import painIcon from "../../../Assets/pain.jpeg";
import vitaminsIcon from "../../../Assets/vitaminC.jpeg";
import skincareIcon from "../../../Assets/skincare.jpeg";
import supplementsIcon from "../../../Assets/supplements.jpeg";

const Category = () => {
  const categories = [
    { name: "Pain Relief", icon: painIcon },
    { name: "Vitamins", icon: vitaminsIcon },
    { name: "Skincare", icon: skincareIcon },
    { name: "Supplements", icon: supplementsIcon },
  ];

  return (
    <div className="category-section"> 
      <h2>Categories</h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div key={index} className="category-card">
            <img src={cat.icon} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
