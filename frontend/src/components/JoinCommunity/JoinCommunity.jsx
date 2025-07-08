import React from 'react';
// 1. Import useNavigate
import { useNavigate } from 'react-router-dom';
import './JoinCommunity.css';
import joinCommunityBg from '../../assets/join-community-bg.mp4';

const JoinCommunity = () => {
  // 2. Initialize the navigate function
  const navigate = useNavigate();

  return (
    <section className="join-community">
      <div className="video-container">
        <video autoPlay muted loop playsInline className="background-video">
          <source src={joinCommunityBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
      </div>
       
      <div className="content">
        <h1>Join our Community</h1>
        <p>Join our exclusive community!
        Be the first to know about the latest releases, market trends, exciting launches, and special offers. Stay ahead, Stay LIT.</p>
        
        <div className="join-community-button-container">
          {/* This anchor link is fine because it points to an ID on the same page */}
          <a href="#footer-community-section" className="cta-button">Join our Community</a>

          {/* 3. Use navigate() for client-side routing */}
          <button className="secondary-button" onClick={() => navigate('/shop')}>
            Explore Marketplace
          </button>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;