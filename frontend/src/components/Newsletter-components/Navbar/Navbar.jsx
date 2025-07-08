import React, { useState, useEffect } from 'react';
// Make sure both Link and useNavigate are imported
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

import litLogo from '../../../assets/lit-logo.png';
import profileAvatar from '../../../assets/noprofile.jpeg';
import notificationIcon from '../../../assets/notification-icon.svg';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');
  // 1. This state is required for the menu to work
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false); // This closes the menu when a link is clicked
  };

  // 2. This function definition is ESSENTIAL. It was likely missing.
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={litLogo} alt="LIT Logo" className="logo-img" />
          </Link>
        </div>

        {/* This `active` class depends on the isMenuOpen state */}
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/game-modes" className={activeLink === 'game-modes' ? 'active' : ''} onClick={() => handleLinkClick('game-modes')}>
            Game Modes
          </Link>
          <Link to="/shop" className={activeLink === 'shop' ? 'active' : ''} onClick={() => handleLinkClick('shop')}>
            Marketplace
          </Link>
          <Link to="/socials" className={activeLink === 'socials' ? 'active' : ''} onClick={() => handleLinkClick('socials')}>
            Socials
          </Link>
          <Link to="/newsletter" className={activeLink === 'newsletter' ? 'active' : ''} onClick={() => handleLinkClick('newsletter')}>
            Newsletter
          </Link>
          <Link to="/avatar-store" className={activeLink === 'avatar-store' ? 'active' : ''} onClick={() => handleLinkClick('avatar-store')}>
            Avatar Store
          </Link>
          <Link to="/ir-icon" className={activeLink === 'ir-icon' ? 'active' : ''} onClick={() => handleLinkClick('ir-icon')}>
            IR Icon
          </Link>
        </div>

        <div className="navbar-right">
          <div className="notification-icon">
            <img src={notificationIcon} alt="Notifications" className="notification-img" />
          </div>
          <div className="navbar-avatar" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
            <img src={profileAvatar} alt="User Avatar" className="avatar-img" />
          </div>
          {/* 3. This onClick handler calls the function. */}
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div className={`hamburger-bar ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`hamburger-bar ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`hamburger-bar ${isMenuOpen ? 'open' : ''}`}></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;