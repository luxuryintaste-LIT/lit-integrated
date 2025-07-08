import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

import litLogo from '../../../assets/lit-logo.png';
import profileAvatar from '../../../assets/noprofile.jpeg';
import notificationIcon from '../../../assets/notification-icon.svg';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
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

  // Handle link click
  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false); // close menu on link click (for mobile UX)
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigate to profile page
  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">
            <img src={litLogo} alt="LIT Logo" className="logo-img" />
          </a>
        </div>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <a 
            href="/game-modes" 
            className={activeLink === 'game-modes' ? 'active' : ''} 
            onClick={() => handleLinkClick('game-modes')}
          >
            Game Modes
          </a>
          <a 
            href="/shop" 
            className={activeLink === 'shop' ? 'active' : ''} 
            onClick={() => handleLinkClick('shop')}
          >
            Marketplace
          </a>
          <a 
            href="/socials" 
            className={activeLink === 'socials' ? 'active' : ''} 
            onClick={() => handleLinkClick('socials')}
          >
            Socials
          </a>
          <a 
            href="/newsletter" 
            className={activeLink === 'newsletter' ? 'active' : ''} 
            onClick={() => handleLinkClick('newsletter')}
          >
            Newsletter
          </a>
          <a 
            href="/avatar-store" 
            className={activeLink === 'avatar-store' ? 'active' : ''} 
            onClick={() => handleLinkClick('avatar-store')}
          >
            Avatar Store
          </a>
          <a 
            href="/ir-icon" 
            className={activeLink === 'ir-icon' ? 'active' : ''} 
            onClick={() => handleLinkClick('ir-icon')}
          >
            IR Icon
          </a>
        </div>

        <div className="navbar-right">
          <div className="notification-icon">
            <img src={notificationIcon} alt="Notifications" className="notification-img" />
          </div>
          <div 
            className="navbar-avatar" 
            onClick={handleProfileClick} 
            style={{ cursor: 'pointer' }}
          >
            <img src={profileAvatar} alt="User Avatar" className="avatar-img" />
          </div>
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
