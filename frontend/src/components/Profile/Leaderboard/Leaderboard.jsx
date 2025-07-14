import React from 'react';
import profileAvatar from '../../../assets/profile-avatar.png';
import starImg from '../../../assets/star.png';
import './Leaderboard.css';

const leaderboard = [
  { rank: 1, username: 'LuxuryinTaste', coins: 555 },
  { rank: 2, username: 'Gamer42', coins: 534 },
  { rank: 3, username: 'Alix Johnson', coins: 510 },
  { rank: 4, username: 'Mariya Satnova', coins: 500 },
  { rank: 5, username: 'Liya James', coins: 485 }
];

const Leaderboard = () => (
  <div className="leaderboard-section">
    <div className="leaderboard-header">
      <h3>Leaderboard</h3>
      <button className="view-all-btn">View All</button>
    </div>
    <div className="leaderboard-card">
      {leaderboard.map(player => (
        <div key={player.rank} className="leaderboard-item">
          <div className="leaderboard-player">
            <span
              className="rank"
              style={
                player.rank === 1
                  ? { color: '#FFD700' }
                  : player.rank === 2
                    ? { color: '#C0C0C0' }
                    : player.rank === 3
                      ? { color: '#CD7F32' }
                      : {}
              }
            >
              {player.rank}
            </span>
            <img src={profileAvatar} alt="Profile" className="leaderboard-avatar" />
            <span className="username">{player.username}</span>
          </div>
          <span className="coins">
            <img src={starImg} alt="coins" style={{ width: 24, height: 24 }} />
            <span className="score">{player.coins}</span>
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default Leaderboard; 