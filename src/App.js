import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header/header";
import HeroSection from "./Components/Home/HEro/Hero";
import Footer from "./Components/Footer/Footer";
import Aboutus from "./Components/About/Aboutus";
import Shop from "./Components/Shop/Pharma";
import ContactForm from "./Components/Contact/Contactus";

function App() {
  return (
    // basename zaroori hai GitHub Pages ke liye
    <Router basename="/Pharmacy-app">
      <Header />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contactus" element={<ContactForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
