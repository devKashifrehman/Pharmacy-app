// src/components/Footer.jsx
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {


  return (
    <footer>
      <div className="footer-content">
        
        {/* Logo */}
        <div className="brand"> 
          <div className="logo">TrustMeds</div>
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <h3>Contact Us</h3>
          <p>📍 123 Main Street, Lahore, Pakistan</p>
          <p>📞 +92 3xxx-xxxx</p>
          <p>✉️ info@yourcompany.com</p>
        </div>

        {/* Social Links */}
        <div className="social-links">
          <h3>Follow Us</h3>
          <div className="icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <br></br>
      <p id='Copy'>© {new Date().getFullYear()} All Rights Reserved | Developed by <span className="dev-name">Kashif Rehman</span></p>
      <br></br>
    </footer>

  );
};

export default Footer;
