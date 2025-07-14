import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FriendListPage.css';
import bodyBg from '../assets/body-bg.png';
import starIcon from '../assets/star.png';
import userIcon from '../assets/user.svg';
import gameIcon from '../assets/game-controller.png';
import notificationIcon from '../assets/notification-icon.svg';
import crownIcon from '../assets/crown.png';
import acceptImg from '../assets/accept.png';
import declImg from '../assets/decl.png';
import LandingPageNavbar from '../components/LandingPageNavbar/Navbar';
import Footer from '../components/Footer';
import PlayerStats from '../components/PlayerStats';
import ProfileBadges from '../components/ProfileBadges';
import ProfileAchievements from '../components/ProfileAchievements';
import DeleteFriendPopup from '../components/DeleteFriendPopup';

const isDesktop = () => typeof window !== 'undefined' && window.innerWidth > 768;
const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 768;
const isStrictMobile = () => typeof window !== 'undefined' && window.innerWidth <= 600;

const FriendListPage = () => {
  const [activeTab, setActiveTab] = useState('friend-list');
  const [searchQuery, setSearchQuery] = useState('');
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFriend, setModalFriend] = useState(null);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [successUser, setSuccessUser] = useState(null);
  const [requestProfileModalOpen, setRequestProfileModalOpen] = useState(false);
  const [requestProfileUser, setRequestProfileUser] = useState(null);
  const [pendingDeletePopupOpen, setPendingDeletePopupOpen] = useState(false);
  const [pendingDeleteTarget, setPendingDeleteTarget] = useState(null);
  const navigate = useNavigate();

  const friends = [
    {
      id: 1,
      name: 'Mariya Satnova',
      avatar: '/src/assets/avatars/new-friend-avatar.png',
      score: 555,
      rank: 'CONNOISSEUR',
      status: 'Playing Tournament'
    },
    {
      id: 2,
      name: 'Gamer42',
      avatar: '/src/assets/avatars/new-friend-avatar.png',
      score: 534,
      rank: 'STYLIST',
      status: 'Playing Team Battles'
    },
    {
      id: 3,
      name: 'Alix Johnson',
      avatar: '/src/assets/avatars/new-friend-avatar.png',
      score: 510,
      rank: 'TRENDY',
      status: 'Playing 1v1'
    },
    {
      id: 4,
      name: 'Liya James',
      avatar: '/src/assets/avatars/new-friend-avatar.png',
      score: 485,
      rank: 'FASHIONISTA',
      status: 'Online'
    },
    {
      id: 5,
      name: 'LuxuryinTaste',
      avatar: '/src/assets/avatars/new-friend-avatar.png',
      score: 555,
      rank: 'CONNOISSEUR',
      status: 'Online'
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      name: 'Game master42',
      avatar: '/src/assets/avatars/new-friend-avatar.png',
      score: 420,
      rank: 'STYLIST'
    },
    {
      id: 2,
      name: 'FashionGuru',
      avatar: '/src/assets/avatars/new-friend-avatar.png',
      score: 380,
      rank: 'TRENDY'
    }
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPendingRequests = pendingRequests.filter(request =>
    request.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (friend) => {
    setModalFriend(friend);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalFriend(null);
  };

  const handleDeleteClick = (friend) => {
    setDeleteTarget(friend);
    setDeletePopupOpen(true);
  };
  const handleDeleteCancel = () => {
    setDeletePopupOpen(false);
    setDeleteTarget(null);
  };
  const handleDeleteConfirm = () => {
    // TODO: implement deleteFriend logic here
    setDeletePopupOpen(false);
    setDeleteTarget(null);
  };

  const handleAcceptClick = (request) => {
    setSuccessUser(request);
    setSuccessPopupOpen(true);
  };
  const handleSuccessClose = () => {
    setSuccessPopupOpen(false);
    setSuccessUser(null);
  };

  const handleRequestProfileClick = (request) => {
    setRequestProfileUser(request);
    setRequestProfileModalOpen(true);
  };
  const handleRequestProfileClose = () => {
    setRequestProfileModalOpen(false);
    setRequestProfileUser(null);
  };

  const handlePendingDeleteClick = (request) => {
    setPendingDeleteTarget(request);
    setPendingDeletePopupOpen(true);
  };
  const handlePendingDeleteCancel = () => {
    setPendingDeletePopupOpen(false);
    setPendingDeleteTarget(null);
  };
  const handlePendingDeleteConfirm = () => {
    // TODO: implement delete logic for pending request
    setPendingDeletePopupOpen(false);
    setPendingDeleteTarget(null);
  };

  return (
    <div className="friend-list-page" style={{ backgroundImage: `url(${bodyBg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      {/* Modal Popup */}
      {modalOpen && (
        isStrictMobile() ? (
          <div className="profile-modal-backdrop" onClick={closeModal}>
            <div className="profile-modal mobile-profile-modal" onClick={e => e.stopPropagation()}>
              <button className="profile-modal-close" onClick={closeModal}>&times;</button>
              <div className="profile-modal-header">
                <img src={modalFriend.avatar} alt={modalFriend.name} className="profile-modal-avatar" />
                <div className="profile-modal-user-info">
                  <div className="profile-modal-username-row">
                    <h2 className="profile-modal-username">{modalFriend.name}</h2>
                    <button className="profile-modal-delete-btn" style={{marginLeft: 6}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <span className="profile-modal-rank">{modalFriend.rank}</span>
                </div>
              </div>
              <div className="profile-stats-row">
                <PlayerStats mini={true} />
                <ProfileBadges mini={true} />
              </div>
              <ProfileAchievements mini={true} />
            </div>
          </div>
        ) : (
          <div className="profile-modal-backdrop" onClick={closeModal}>
            <div className="profile-modal" onClick={e => e.stopPropagation()}>
              <button className="profile-modal-close" onClick={closeModal}>&times;</button>
              <div className="profile-modal-header">
                <img src={modalFriend.avatar} alt={modalFriend.name} className="profile-avatar" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '2px solid #a259ff', marginRight: 24 }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <h2 className="profile-username" style={{ margin: 0 }}>{modalFriend.name}</h2>
                    <button className="delete-icon" style={{ background: 'none', border: 'none', padding: 0, marginLeft: 6, cursor: 'pointer', color: '#ff3333', display: 'flex', alignItems: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <span className="profile-rank" style={{ display: 'block', marginTop: 4 }}>{modalFriend.rank}</span>
                </div>
              </div>
              <div className="profile-stats-row original-stats-row">
                <PlayerStats mini={true} />
                <ProfileBadges mini={true} />
              </div>
              <ProfileAchievements mini={true} />
            </div>
          </div>
        )
      )}
      <DeleteFriendPopup
        open={deletePopupOpen}
        username={deleteTarget?.name || ''}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
      {successPopupOpen && successUser && (
        <div className="success-popup-backdrop">
          <div className="success-popup-modal">
            <button className="success-popup-close" onClick={handleSuccessClose}>&times;</button>
            <div className="success-popup-username">{successUser.name}</div>
            <img src={successUser.avatar} alt={successUser.name} className="success-popup-avatar" />
            <div className="success-popup-message">is now in your Friend List!</div>
            <button className="success-popup-btn" onClick={handleSuccessClose}>Add More Friends</button>
          </div>
        </div>
      )}
      {requestProfileModalOpen && requestProfileUser && (
        <div className="profile-modal-backdrop">
          <div className="profile-modal request-profile-modal">
            <button className="profile-modal-close" onClick={handleRequestProfileClose}>&times;</button>
            <div className="profile-modal-header">
              <img src={requestProfileUser.avatar} alt={requestProfileUser.name} className="profile-avatar" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '2px solid #a259ff', marginRight: 24 }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h2 className="profile-username" style={{ margin: 0 }}>{requestProfileUser.name}</h2>
                  <img src={acceptImg} alt="Accept" style={{ width: 40, height: 32, cursor: 'pointer', marginLeft: 4 }} onClick={() => handleAcceptClick(requestProfileUser)} />
                  <button className="delete-icon" onClick={() => handleDeleteClick(requestProfileUser)}>
                    <img src={declImg} alt="Delete" style={{ width: 40, height: 32 }} />
                  </button>
                </div>
                <span className="profile-rank" style={{ display: 'block', marginTop: 4 }}>{requestProfileUser.rank}</span>
              </div>
            </div>
            <div className="profile-stats-row original-stats-row">
              <PlayerStats mini={true} />
              <ProfileBadges mini={true} />
            </div>
            <ProfileAchievements mini={true} />
          </div>
        </div>
      )}
      {pendingDeletePopupOpen && pendingDeleteTarget && (
        <div className="delete-popup-backdrop">
          <div className="delete-popup-modal pending-delete-popup-modal">
            <button className="delete-popup-close" onClick={handlePendingDeleteCancel}>&times;</button>
            <div className="delete-popup-message">
              Confirm to delete <b>{pendingDeleteTarget.name}</b> from your pending requests?
            </div>
            <div className="delete-popup-actions">
              <button className="delete-popup-btn cancel" onClick={handlePendingDeleteCancel}>Cancel</button>
              <button className="delete-popup-btn ok" onClick={handlePendingDeleteConfirm}>OK</button>
            </div>
          </div>
        </div>
      )}
      <LandingPageNavbar />
      <div className="friend-list-container">
        {/* Left Sidebar - only render on desktop */}
        {isDesktop() && (
          <div className="sidebar">
            <div className="quick-menu">
              <h3>Quick Menu</h3>
              <ul>
                <li>
                  <Link to="/game-modes" className="menu-link">Game Mode</Link>
                </li>
                <li>Tournaments</li>
                <li>
                  <Link to="/shop" className="menu-link">Shop</Link>
                </li>
                <li className="active">Friends</li>
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
        )}

        {/* Main Content */}
        <div className="main-content">
          {isMobile() && (
            <h5 style={{
              fontFamily: 'Krona One, sans-serif',
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '0.4em',
              margin: '18px 0 12px 0',
              width: '100vw',
            }}>FRIENDS</h5>
          )}
          <div className="nav-frnd-btn">
            <div className="nav-buttons">
              <button 
                className={activeTab === 'friend-list' ? 'active' : ''}
                onClick={() => setActiveTab('friend-list')}
              >
                Friend List
              </button>
              <button 
                className={activeTab === 'pending-requests' ? 'active' : ''}
                onClick={() => setActiveTab('pending-requests')}
              >
                Pending Request
              </button>
            </div>
            <button 
              className="add-friends-btn"
              style={{ padding: '10px 22px', borderRadius: 8, background: 'radial-gradient(309.68% 308.36% at 53.98% 55.95%, rgba(0, 0, 0, 0.80) 0%, rgba(147, 51, 234, 0.40) 50%)', color: 'white', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.3s' }}
              onClick={() => navigate('/add-friends')}
            >
              Add Friends
            </button>
          </div>
          <div className="frnd-list-card">
            <div className="frnd-btns" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontWeight: 600, fontSize: '1.2rem' }}>Friends List</h3>
              <div className="search-section" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="search-input"
                  style={{ paddingRight: 40 }}
                />
                <button className="search-btn" style={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  boxShadow: 'none',
                  width: 32,
                  height: 32,
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <hr className="nav-divider" />
            <div className="frnd-list">
              {activeTab === 'friend-list' ? (
                filteredFriends.map(friend => (
                  <div key={friend.id} className="friend-row">
                    <div className="frnd-show" onClick={() => openModal(friend)} style={{ cursor: 'pointer' }}>
                    <img src={friend.avatar} alt={friend.name} className="avatar" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #a259ff' }} />
                    <span className="name" style={{ minWidth: 120 }}>{friend.name}</span>
                    </div>
                    <div style={{ flex: 1 }} />
                    <span className="score mobile-hide-score" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <img src="/src/assets/star.png" alt="coins" style={{ width: 24, height: 24, marginRight: 4, verticalAlign: 'middle' }} />
                      {friend.score}
                    </span>
                    {isDesktop() ? (
                      <>
                        <span className="rank" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <img src={crownIcon} alt="crown" style={{ width: 22, height: 22, marginRight: 4, verticalAlign: 'middle' }} />
                          {friend.rank}
                        </span>
                        <button className="delete-icon" onClick={() => handleDeleteClick(friend)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </>
                    ) : (
                      <div className="mobile-rank-delete-wrap">
                        <img src={crownIcon} alt="crown" style={{ width: 22, height: 22, marginRight: 4, verticalAlign: 'middle' }} />
                        <button className="delete-icon" onClick={() => handleDeleteClick(friend)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                filteredPendingRequests.map(request => (
                  <div key={request.id} className="friend-row" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div className="frnd-show" onClick={() => handleRequestProfileClick(request)} style={{ cursor: 'pointer' }}>
                    <img src={request.avatar} alt={request.name} className="avatar" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #a259ff' }} />
                    <span className="name" style={{ minWidth: 120 }}>{request.name}</span>
                    </div>
                    <div className="friend-actions" style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
                      <span className="score" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <img src="/src/assets/star.png" alt="coins" style={{ width: 24, height: 24, marginRight: 4, verticalAlign: 'middle' }} />
                        {request.score}
                      </span>
                      <img src={crownIcon} alt="crown" style={{ width: 22, height: 22, marginRight: 4, verticalAlign: 'middle' }} />
                      <span className="rank">{request.rank}</span>
                      <img src={acceptImg} alt="Accept" style={{ width: 40, height: 32, cursor: 'pointer', marginLeft: 4 }} onClick={() => handleAcceptClick(request)} />
                      <button className="delete-icon" onClick={() => handlePendingDeleteClick(request)}>
                        <img src={declImg} alt="Delete" style={{ width: 40, height: 32 }} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FriendListPage; 