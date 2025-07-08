import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Newsletter.css';

import sustainabilityImg from '../../assets/sustainable-fashion-trends.png';
import luxuryImg from '../../assets/luxury-fashion.png';
import fashionImg from '../../assets/trendy-fast-fashion.png';
import sneakerImg from '../../assets/sustainable-group.png';

const Newsletter = ({ onSubscribeClick }) => {
  const scrollContainerRef = useRef(null);

  // --- CHANGE: The paths now point to the Newsletter page with a section query ---
  const cards = [
    { id: 1, image: sustainabilityImg, title: "THE REALM OF SUSTAINABILITY", description: "Discover new sustainable brands reshaping the market, delve into the latest news on eco-conscious goods, and explore much more in the realm of sustainable fashion.", path: "/newsletter?section=sustainable" },
    { id: 2, image: luxuryImg, title: "ALL IN LUXURY", description: "Indulge in the opulence of high-end fashion, showcasing the latest trends, exclusive releases, and the epitome of luxury in every stitch and design.", path: "/newsletter?section=luxury" },
    { id: 3, image: fashionImg, title: "WHAT'S FAST IN FASHION", description: "Stay ahead with real-time insights into the fast-paced world of fashion. Selected rapid trends, quick fashion updates, and evolving fashion landscape.", path: "/newsletter?section=fast" },
    { id: 4, image: sneakerImg, title: "WHAT'S HOT IN THE SNEAKER WORLD", description: "Step into the sneaker culture with a spotlight on the latest drops, exclusive releases, and must-have kicks in the sneaker world.", path: "/newsletter?section=sneakers" }
  ];

  const scrollLeft = () => { if (scrollContainerRef.current) { scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' }); } };
  const scrollRight = () => { if (scrollContainerRef.current) { scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' }); } };

  return (
    <div className="newsletter-container">
      <div className="newsletter-header">
        <h2>Newsletter</h2>
        <p>Subscribe now to receive weekly short updates on fast fashion, luxury fashion, sustainable fashion, and the sneaker market to stay ahead of the curve.</p>
        <div className="cta-buttons">
          <Link to="/newsletter" className="explore-btn">Explore Newsletter</Link>         
          <button className="subscribe-btn" onClick={onSubscribeClick}>Subscribe Now</button>
        </div>
      </div>

      <div className="newsletter-slider">
        <button className="scroll-btn left" onClick={scrollLeft}>‹</button>
        <div className="cards-container" ref={scrollContainerRef}>
          {cards.map((card) => (
            <div key={card.id} className="newsletter-card">
              <div className="card-image"><img src={card.image} alt={card.title} /></div>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <Link to={card.path} className="learn-more-btn">
                  Learn more ›
                </Link>
              </div>
            </div>
          ))}
        </div>
        <button className="scroll-btn right" onClick={scrollRight}>›</button>
      </div>
    </div>
  );
};

export default Newsletter;
