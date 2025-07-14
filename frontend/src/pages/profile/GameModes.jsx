import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import singleModeImage from '../assets/single-mode.png';
import tournamentModeImage from '../assets/tournament-mode.png';
import teamBattleImage from '../assets/team-battle.png';
import fashionShowdownImage from '../assets/fashion-showdown.png';
import './GameModesPage.css';
import bodyBg from '../assets/body-bg.png';
import starImg from '../assets/star.png';
import profileAvatar from '../assets/profile-avatar.png';
import userIcon from '../assets/user.svg';
import gameIcon from '../assets/game-controller.png';
import Leaderboard from '../components/Leaderboard';
import { leaderboardData } from '../data/leaderboardData';

const GameModesPage = () => {
  const [activeTab, setActiveTab] = useState('clothing');
  const [selectedCategory, setSelectedCategory] = useState('Categories');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [notifications] = useState([
    {
      id: 1,
      type: 'friend',
      message: 'New Friend Request – Game master42 wants to be friends',
      buttons: ['Accept', 'Decline']
    },
    {
      id: 2,
      type: 'game',
      message: 'Game Invite – Team battle in Tournament mode',
      buttons: ['Join', 'Skip']
    }
  ]);

  const gameModes = [
    {
      id: 1,
      title: 'Single Mode',
      description: 'Normal game mode with two options',
      image: singleModeImage
    },
    {
      id: 2,
      title: 'Tournament Mode',
      description: '8 players facing off in elimination',
      image: tournamentModeImage
    },
    {
      id: 3,
      title: 'Team Battle',
      description: 'Team up with your friends',
      image: teamBattleImage
    },
    {
      id: 4,
      title: 'Fashion Showdown',
      description: 'Among 6, one wins based on fashion',
      image: fashionShowdownImage
    }
  ];

  const leaderboard = [
    { rank: 1, username: 'LuxuryinTaste', coins: 555 },
    { rank: 2, username: 'Gamer42', coins: 534 },
    { rank: 3, username: 'Alix Johnson', coins: 510 },
    { rank: 4, username: 'Mariya Satnova', coins: 500 },
    { rank: 5, username: 'Liya James', coins: 485 }
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  // Handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const filteredGameModes = selectedCategory === 'All' || selectedCategory === 'Categories' 
    ? gameModes 
    : gameModes.filter(mode => mode.title.includes(selectedCategory));

  return (
    <div className="game-modes-page">
      <div className="game-modes-container">
        {/* Left Sidebar */}
        <div className="sidebar">
          <div className="quick-menu">
            <h3>Quick Menu</h3>
            <ul>
              <li className="active">Game Mode</li>
              <li>Tournaments</li>
              <li>
                <Link to="/shop" className="menu-link">Shop</Link>
              </li>
              <li>Friends</li>
            </ul>
          </div>

          <div className="notifications">
            <h3>Recent Notifications</h3>
            {notifications.map(notification => (
              <div key={notification.id} className="notification-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                  <img
                    src={notification.type === 'friend' ? userIcon : gameIcon}
                    alt={notification.type === 'friend' ? 'Profile' : 'Game'}
                    style={{ width: 36, height: 36, borderRadius: 12, background: 'radial-gradient(309.68% 308.36% at 53.98% 55.95%, rgba(0, 0, 0, 0.80) 0%, rgba(147, 51, 234, 0.40) 50%)', padding: 6 }}
                  />
                  <div>
                    <strong>{notification.type === 'friend' ? 'New Friend Request' : 'Game Invite'}</strong>
                  </div>
                </div>
                <div style={{ color: '#bdbdbd', marginBottom: 8 }}>{notification.message.replace('New Friend Request – ', '').replace('Game Invite – ', '')}</div>
                <div className="notification-buttons">
                  {notification.buttons.map(button => (
                    <button key={button} className="notification-btn">
                      {button}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Tabs */}
          <div className="content-header">
            <div className="tabs">
              <button
                className={activeTab === 'all' ? 'active' : ''}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button
                className={activeTab === 'clothing' ? 'active' : ''}
                onClick={() => setActiveTab('clothing')}
              >
                Clothing
              </button>
              <button
                className={activeTab === 'bags' ? 'active' : ''}
                onClick={() => setActiveTab('bags')}
              >
                Bags
              </button>
              <button
                className={activeTab === 'accessories' ? 'active' : ''}
                onClick={() => setActiveTab('accessories')}
              >
                Accessories
              </button>
              <button
                className={activeTab === 'footwear' ? 'active' : ''}
                onClick={() => setActiveTab('footwear')}
              >
                Footwear
              </button>
            </div>
          </div>

          {/* Game Mode Cards */}
          <div className="game-modes-grid">
            <div className="category-section">
              <div className="filter">
                <div className="categories-dropdown" ref={dropdownRef}>
                  <button 
                    className={`categories-btn ${isDropdownOpen ? 'active' : ''}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onBlur={handleDropdownClose}
                  >
                    {selectedCategory} 
                  </button>
                  {isDropdownOpen && (
                    <div 
                      className="dropdown-menu"
                      onMouseLeave={handleDropdownClose}
                    >
                      <div 
                        className="dropdown-item"
                        onClick={() => handleCategorySelect('All')}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        All
                      </div>
                      <div 
                        className="dropdown-item"
                        onClick={() => handleCategorySelect('Men')}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        Men
                      </div>
                      <div 
                        className="dropdown-item"
                        onClick={() => handleCategorySelect('Women')}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        Women
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="cards-section">
              {filteredGameModes.map(mode => (
                <div key={mode.id} className="game-mode-card-wrapper">
                  <div className="game-mode-card">
                    <div className="card-image">
                      <img src={mode.image} alt={mode.title} />
                    </div>
                    <div className="card-content">
                      <h3>{mode.title}</h3>
                      <p>{mode.description}</p>
                    </div>
                  </div>
                  <div className="play-now-btn-wrapper">
                    <button className="play-now-btn">Play Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="leaderboard-section">
            <div className="leaderboard-header">
              <h3>Leaderboard</h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="leaderboard-card">
              {leaderboard.map(player => (
                <div key={player.rank} className="leaderboard-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 0 }}>
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
                    #{player.rank}
                  </span>
                  <img src={profileAvatar} alt="Profile" style={{ width: '28px', height: '28px', borderRadius: '50%', margin: '0 10px 0 0' }} />
                  <span className="username" style={{ minWidth: 120, fontWeight: 500 }}>{player.username}</span>
                  <span className="coins" style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
                      <img src={starImg} alt="coins" style={{ width: 24, height: 24 }} />
                      <span className="score">{player.coins}</span>
                    </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModesPage; 