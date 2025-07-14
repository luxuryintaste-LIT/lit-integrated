import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Leaderboard from '../../../components/profile/Leaderboard/Leaderboard'; 
import "../../../components/profile/Leaderboard/Leaderboard.css"; 
import Navbar from '../../../components/Newsletter-components/Navbar/Navbar';
import lockBeginner from '../../../assets/lock-beginner-new.png';
import lockAmateur from '../../../assets/lock-amateur-new.png';
import lockConnoisseur from '../../../assets/lock-connoisseur(1).png';
import beginnerFlip from '../../../assets/beginner-flip.png';
import amateurFlip from '../../../assets/amateur-flip.png';
import connoisseurFlip from '../../../assets/connoisseur-flip.png';


const Profile = () => {
  const navigate = useNavigate();
  const [showBadgesPopup, setShowBadgesPopup] = React.useState(false);

  const handleCardClick = (e) => {
    // Prevent navigation if a button inside the card is clicked
    if (e.target.closest('button')) return;
    navigate('/friend-list');
  };

  const handleBadgesCardClick = (e) => {
    setShowBadgesPopup(true);
  };

  const handleClosePopup = (e) => {
    if (e.target.classList.contains('badges-popup-overlay')) {
      setShowBadgesPopup(false);
    }
  };

  return (
    <div className="profile-page">
      <Navbar />
      <main className="profile-content">
        {/* Mobile-only profile header */}
        <div className="mobile-profile-header">
          <div className="mobile-header-bar">
            <img src="/src/assets/menu.svg" alt="Menu" className="mobile-header-menu" />
            <img src="/src/assets/lit-logo.png" alt="Logo" className="mobile-header-logo" />
            <img src="/src/assets/notification-icon.svg" alt="Notifications" className="mobile-header-bell" />
          </div>
          <div className="mobile-profile-avatar-wrapper">
            <img src="/src/assets/avatar.png" alt="avatar" className="mobile-profile-avatar" />
            <span className="mobile-profile-status-dot"></span>
          </div>
          <div className="mobile-profile-username">LuxuryinTaste</div>
          <div className="mobile-profile-location-pill">
            <span>Delhi</span>
            <img src="/src/assets/flag.png" alt="flag" className="mobile-profile-flag" />
          </div>
        </div>

        <section className="profile-main-info">
          <div className="profile-avatar">
            <img src="/src/assets/avatar.png" alt="avatar" />
          </div>
          <div className="profile-user-info">
            <div className="profile-username-row">
              <h1 className="profile-username">LuxuryinTaste</h1>
              <span className="profile-status online">Online</span>
            </div>
            <div className="profile-handle">@Luxuryintaste267</div>
            <div className="profile-location">Delhi <img src="/src/assets/flag.png" alt="flag" style={{ width: '20px', height: '20px' }} /></div>
          </div>
        </section>
        <section className="profile-stats-row original-stats-row">
          <div className="profile-stats-card">
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
          <div className="profile-achievements-card">
            <div className="profile-stats-label">Achievements</div>
            <hr className="profile-section-hr" />
            <div className="profile-achievements-list">
              <div className="achievement-item">
                <span className="achievement-icon"><img src="/src/assets/shoe.png" alt="Footwear" /></span>
                <span className="achievement-label">Footwear</span>
                <span className="achievement-progress">33/40</span>
              </div>
              <div className="achievement-item">
                <span className="achievement-icon"><img src="/src/assets/dress.png" alt="Clothing" /></span>
                <span className="achievement-label">Clothing</span>
                <span className="achievement-progress">33/40</span>
              </div>
              <div className="achievement-item">
                <span className="achievement-icon"><img src="/src/assets/accesories.png" alt="Accessories" /></span>
                <span className="achievement-label">Accessories</span>
                <span className="achievement-progress">33/40</span>
              </div>
              <div className="achievement-item">
                <span className="achievement-icon"><img src="/src/assets/bag.png" alt="Bags" /></span>
                <span className="achievement-label">Bags</span>
                <span className="achievement-progress">33/40</span>
              </div>
            </div>
          </div>
          <div className="profile-badges-card" onClick={handleBadgesCardClick} tabIndex={0} role="button" aria-label="View Badges">
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
        </section>
        <div className="mobile-stats-achievements-wrapper">
          <div className="profile-stats-card">
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
          {/* Mobile-only profile badges card */}
          <div className="profile-badges-card mobile-profile-badges-card" onClick={handleBadgesCardClick} tabIndex={0} role="button" aria-label="View Badges">
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
          <div className="profile-achievements-card">
            <div className="profile-stats-label">Achievements</div>
            <hr className="profile-section-hr" />
            <div className="profile-achievements-list">
              <div className="achievement-item">
                <span className="achievement-icon"><img src="/src/assets/shoe.png" alt="Footwear" /></span>
                <span className="achievement-label">Footwear</span>
                <span className="achievement-progress">33/40</span>
              </div>
              <div className="achievement-item">
                <span className="achievement-icon"><img src="/src/assets/dress.png" alt="Clothing" /></span>
                <span className="achievement-label">Clothing</span>
                <span className="achievement-progress">33/40</span>
              </div>
              <div className="achievement-item">
                <span className="achievement-icon"><img src="/src/assets/accesories.png" alt="Accessories" /></span>
                <span className="achievement-label">Accessories</span>
                <span className="achievement-progress">33/40</span>
              </div>
              <div className="achievement-item">
                <span className="achievement-icon"><img src="/src/assets/bag.png" alt="Bags" /></span>
                <span className="achievement-label">Bags</span>
                <span className="achievement-progress">33/40</span>
              </div>
            </div>
          </div>
        </div>
        <section className="profile-info-row">
          <div className="profile-info-cards-wrapper">
            <div className="account-information-card">
              <div className="profile-section-title">Account Information</div>
              <div className="profile-info-list">
                <div className="profile-info-item">
                  <span className="info-label">Full Name</span>
                  <span className="info-value">John Doe</span>
                </div>
                <div className="profile-info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">John.Doe@Example.Com</span>
                </div>
                <div className="profile-info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-value">+91 9874563210</span>
                </div>
                <div className="profile-info-item">
                  <span className="info-label">Member Since</span>
                  <span className="info-value">January 2024</span>
                </div>
              </div>
            </div>
            <div className="shipping-address-card">
              <div className="profile-section-title">Shipping Address</div>
              <div className="profile-address">
                123 Main Street<br />Apt 4B<br />New York, NY 10001<br />United States
              </div>
              {/*<button className="edit-address-btn">
                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.49342 3.26097L1.33398 9.42032V12.5L4.4137 12.5L10.5731 6.34064M7.49342 3.26097L9.70206 1.05234L9.70339 1.05103C10.0074 0.747003 10.1597 0.59472 10.3353 0.537683C10.4899 0.487439 10.6565 0.487439 10.8111 0.537683C10.9865 0.594679 11.1386 0.74679 11.4422 1.05039L12.7818 2.38989C13.0867 2.69479 13.2392 2.84731 13.2963 3.0231C13.3466 3.17774 13.3465 3.34431 13.2963 3.49894C13.2392 3.67461 13.0863 3.82755 12.7818 4.13202L10.5731 6.34064M7.49342 3.26097L10.5731 6.34064" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Edit Address
              </button>*/}
            </div>
          </div>
          <div
            className="profile-friends-card"
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
            tabIndex={0}
            role="button"
            aria-label="View Friend List"
          >
            <div className="profile-section-title">Friends Online</div>
            <ul className="friends-list">
              <li className="friend-item">
                <img src="/src/assets/avatars/new-friend-avatar.png" alt="Friend Avatar" className="friend-avatar" />
                <span className="friend-info">
                <span className="friend-name">Mariya Satnova</span>
                <span className="friend-status">Playing Tournament</span>
                </span>
                <span className="friend-actions">
                <button className="friend-btn join">Join</button>
                <button className="friend-btn invite">Invite</button>
                </span>
              </li>
              <li className="friend-item">
                <img src="/src/assets/avatars/new-friend-avatar.png" alt="Friend Avatar" className="friend-avatar" />
                <span className="friend-info">
                <span className="friend-name">Gamer42</span>
                <span className="friend-status">Playing Team Battles</span>
                </span>
                <span className="friend-actions">
                <button className="friend-btn join">Join</button>
                <button className="friend-btn invite">Invite</button>
                </span>
              </li>
              <li className="friend-item">
                <img src="/src/assets/avatars/new-friend-avatar.png" alt="Friend Avatar" className="friend-avatar" />
                <span className="friend-info">
                <span className="friend-name">Alix johnson</span>
                <span className="friend-status">Playing 1v1</span>
                </span>
                <span className="friend-actions">
                <button className="friend-btn join">Join</button>
                <button className="friend-btn invite">Invite</button>
                </span>
              </li>
              <li className="friend-item">
                <img src="/src/assets/avatars/new-friend-avatar.png" alt="Friend Avatar" className="friend-avatar" />
                <span className="friend-info">
                <span className="friend-name">Alix johnson</span>
                  <span className="friend-status">Online</span>
                </span>
                <span className="friend-actions">
                <button className="friend-btn join">Join</button>
                <button className="friend-btn invite">Invite</button>
                </span>
              </li>
            </ul>
          </div>
        </section>
        <div className="order-details-container">
          <h2 style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '1.2rem' }}>Order Details</h2>
          <p>Currently No Orders</p>
        </div>
        <section className="profile-leaderboard-row">
          <Leaderboard />
        </section>
      </main>
      {showBadgesPopup && (
        <div className="badges-popup-overlay" onClick={handleClosePopup} style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="badges-popup-modal" style={{background: 'var(--glass-bg)', borderRadius: '18px', padding: '0px', position: 'relative', minWidth: '65vw', minHeight: '55vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(100px)', border: '1px solid var(--glass-border)', boxSizing: 'border-box', maxWidth: '98vw', maxHeight: '98vh', overflowY: 'visible'}}>
            <button onClick={()=>setShowBadgesPopup(false)} style={{position: 'absolute', top: '-10px', right: '-15px', background: 'none', border: 'none', color: 'rgb(255, 255, 255)', fontSize: '32px', cursor: 'pointer', zIndex: 2, userSelect: 'none', outline: 'none'}} aria-label="Close">×</button>
            <div className="badges-title" style={{width: '100%', textAlign: 'center', margin: '2vw 0 1vw 0', color: '#fff', fontWeight: 700, fontSize: '2.5vw', letterSpacing: 3, fontFamily: 'Krona, sans-serif'}}>BADGES</div>
            <div className="badges-img-row" style={{display: 'flex', justifyContent: 'center', alignItems: 'end', gap: '6vw', marginBottom: '2.5vw'}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className="badges-img-flip-container">
                  <div className="badges-img-flip-card">
                    <div className="badges-img-flip-front">
                      <img className="badges-img" src={lockBeginner} alt="Beginner" style={{width: '150px', height: '150px', marginBottom: '1vw'}} />
                    </div>
                    <div className="badges-img-flip-back">
                      <img className="badges-img" src={beginnerFlip} alt="Beginner New" style={{width: '150px', height: '150px', marginBottom: '1vw'}} />
                    </div>
                  </div>
                </div>
                <span className="badges-label" style={{color: '#fff', fontWeight: 600, fontSize: '2vw', letterSpacing: 2, marginTop: '1vw', fontFamily: 'Krona, sans-serif'}}>BEGINNER</span>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className="badges-img-flip-container">
                  <div className="badges-img-flip-card">
                    <div className="badges-img-flip-front">
                      <img className="badges-img" src={lockAmateur} alt="Amateur" style={{width: '150px', height: '150px', marginBottom: '1vw'}} />
                    </div>
                    <div className="badges-img-flip-back">
                      <img className="badges-img" src={amateurFlip} alt="Amateur New" style={{width: '150px', height: '150px', marginBottom: '1vw'}} />
                    </div>
                  </div>
                </div>
                <span className="badges-label" style={{color: '#fff', fontWeight: 600, fontSize: '2vw', letterSpacing: 2, marginTop: '1vw', fontFamily: 'Krona, sans-serif'}}>AMATEUR</span>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className="badges-img-flip-container">
                  <div className="badges-img-flip-card">
                    <div className="badges-img-flip-front">
                      <img className="badges-img" src={lockConnoisseur} alt="Connoisseur" style={{width: '150px', height: '150px', marginBottom: '1vw'}} />
                    </div>
                    <div className="badges-img-flip-back">
                      <img className="badges-img" src={connoisseurFlip} alt="Connoisseur New" style={{width: '150px', height: '150px', marginBottom: '1vw'}} />
                    </div>
                  </div>
                </div>
                <span className="badges-label" style={{color: '#fff', fontWeight: 600, fontSize: '2vw', letterSpacing: 2, marginTop: '1vw', fontFamily: 'Krona, sans-serif'}}>CONNOISSEUR</span>
              </div>
            </div>
            <div className="badges-desc" style={{color: '#fff', fontWeight: 500, fontSize: '2vw', marginTop: '1vw', textAlign: 'center', letterSpacing: 1, fontFamily: 'Krona, sans-serif'}}>win 11 games to achieve the badges</div>
          </div>
        </div>
      )}
      {/* Responsive styles for the popup modal */}
      <style>{`
        @media (min-width: 701px) {
          .badges-img-flip-container:hover .badges-img-flip-card {
            transform: rotateY(180deg);
          }
        }
        @media (max-width: 700px) {
          .badges-popup-modal {
            min-width: 96vw !important;
            min-height: 60vh !important;
            padding: 4vw 1vw !important;
            max-width: 98vw !important;
            max-height: 98vh !important;
          }
          .badges-popup-modal .badges-title {
            font-size: 7vw !important;
          }
          .badges-popup-modal .badges-label {
            font-size: 3vw !important;
            margin-top: 2vw !important;
          }
          .badges-popup-modal .badges-desc {
            font-size: 4vw !important;
          }
          .badges-popup-modal .badges-img-row {
            flex-direction: row !important;
            gap: 3vw !important;
            margin-bottom: 2vw !important;
          }
          .badges-popup-modal .badges-img-flip-container {
            width: 90px !important;
            height: 90px !important;
            margin-bottom: 1vw !important;
          }
          .badges-popup-modal .badges-img {
            width: 90px !important;
            height: 90px !important;
            margin-bottom: 0.5vw !important;
          }
        }
        .badges-img-flip-container {
          perspective: 1000px;
          width: 150px;
          height: 150px;
          margin-bottom: 1vw;
        }
        .badges-img-flip-card {
          width: 100%;
          height: 100%;
          position: relative;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .badges-img-flip-front, .badges-img-flip-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .badges-img-flip-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Profile; 