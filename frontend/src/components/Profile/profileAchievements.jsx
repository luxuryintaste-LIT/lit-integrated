import React from 'react';
import shoeIcon from "../../assets/shoe.png";
import dressIcon from "../../assets/dress.png";
import accessoriesIcon from "../../assets/accesories.png";
import bagIcon from "../../assets/bag.png";

export default function ProfileAchievements({ mini }) {
  const isStrictMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
  return (
    <div className={`profile-achievements-card${mini ? ' mini' : ''}`}>
      <div className="profile-stats-label">Achievements</div>
      <hr className="profile-section-hr" />
      <div className="profile-achievements-list">
        <div className="achievement-item">
          <span className="achievement-icon">
            <img src={isStrictMobile ? shoeIcon : '/src/assets/shoe.png'} alt="Footwear" />
          </span>
          <span className="achievement-label">Footwear</span>
          <span className="achievement-progress">33/40</span>
        </div>
        <div className="achievement-item">
          <span className="achievement-icon">
            <img src={isStrictMobile ? dressIcon : '/src/assets/dress.png'} alt="Clothing" />
          </span>
          <span className="achievement-label">Clothing</span>
          <span className="achievement-progress">33/40</span>
        </div>
        <div className="achievement-item">
          <span className="achievement-icon">
            <img src={isStrictMobile ? accessoriesIcon : '/src/assets/accesories.png'} alt="Accessory" />
          </span>
          <span className="achievement-label">Accessory</span>
          <span className="achievement-progress">33/40</span>
        </div>
        <div className="achievement-item">
          <span className="achievement-icon">
            <img src={isStrictMobile ? bagIcon : '/src/assets/bag.png'} alt="Bags" />
          </span>
          <span className="achievement-label">Bags</span>
          <span className="achievement-progress">33/40</span>
        </div>
      </div>
    </div>
  );
} 