import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setShowSearch(!showSearch);
  const clearSearch = () => setSearchValue('');

  // 🔥 Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="brand">
        <div className="logo">TrustMeds</div>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Home</NavLink>
        <NavLink to="/aboutus" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>About Us</NavLink>
        <NavLink to="/shop" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Shop</NavLink>
        <NavLink to="/contactus" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Contact Us</NavLink>

        <div className="search-container" onMouseLeave={() => setShowSearch(false)}>
          <div className={`search-wrapper ${showSearch ? 'expand' : ''}`} onMouseEnter={toggleSearch}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
              <span className="clear-icon" onClick={clearSearch}>✖</span>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
