import React from 'react';
export default function ProfileBadges({ mini }) {
  return (
    <div className={`profile-badges-card${mini ? ' mini' : ''}`}>
      <div className="profile-stats-label">Badges</div>
      <hr className="profile-section-hr" />
      <div className="profile-badges-flex">
        <img src="/src/assets/badge.png" alt="Badge" className="profile-badge-img" />
        <div className="profile-points">
          <div className="points-label">Your Points</div>
          <div className="points-value">2803<span className="points-arrow">↑</span></div>
        </div>
      </div>
    </div>
  );
} 