import React from 'react';
export default function PlayerStats({ mini }) {
  return (
    <div className={`profile-stats-card${mini ? ' mini' : ''}`}>
      <div className="profile-stats-label">Player Stats</div>
      <hr className="profile-section-hr" />
      <div className="profile-stats-values">
        <div className="profile-stat">
          <span className="stat-value">16</span>
          <span className="stat-label">Games Played</span>
        </div>
        <div className="profile-stat">
          <span className="stat-value">21</span>
          <span className="stat-label">Games Won</span>
        </div>
      </div>
    </div>
  );
} 