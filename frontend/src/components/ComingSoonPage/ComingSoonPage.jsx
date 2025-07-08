import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ComingSoonPage.css';
import rocketIcon from '../../assets/lit-logo.png'; // Your logo path

const ComingSoonPage = () => {
  const navigate = useNavigate();
  // Create a ref to attach to our main heading element
  const headingRef = useRef(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const handleMouseMove = (e) => {
      // Get the position of the element on the page
      const rect = heading.getBoundingClientRect();
      
      // Calculate the mouse position relative to the element
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Update the CSS custom properties on the element
      heading.style.setProperty('--mouse-x', `${mouseX}px`);
      heading.style.setProperty('--mouse-y', `${mouseY}px`);
    };

    // Add the event listener to the heading
    heading.addEventListener('mousemove', handleMouseMove);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      heading.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // The empty dependency array ensures this runs only once on mount

  return (
    <div className="coming-soon-overlay">
      <div className="coming-soon-content">
        <img src={rocketIcon} alt="Launching soon" className="coming-soon-icon" />
        
        {/* We add the ref to the h1 and give it a special class */}
        <h1 className="main-heading spotlight-text" ref={headingRef}>
          COMMING<br/>SOON
        </h1>
        
        <p className="subtext">
          We're working hard to bring you this feature.
          <br/>
          Stay tuned for the launch!
        </p>
        
        <button 
          className="home-button" 
          onClick={() => navigate('/')}
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default ComingSoonPage;