import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function ProfileMenu({ onClose, onLogout }) {
  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('pixelArtUser') || '{}');
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    onClose();
  };

  return (
    <motion.div 
      className="profile-menu"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="profile-menu-header">
        <div className="profile-info">
          <div className="avatar-large">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="4" r="4"></circle>
            </svg>
          </div>
          <div>
            <h3>{userData.name || 'User Name'}</h3>
            <p>{userData.email || 'user@example.com'}</p>
          </div>
        </div>
      </div>
      
      <div className="profile-menu-items">
        <Link to="/editor" className="profile-menu-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
          </svg>
          Editor
        </Link>
        
        <Link to="/" className="profile-menu-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Home
        </Link>
        
        <div className="divider"></div>
        
        <button className="profile-menu-item logout" onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </div>
    </motion.div>
  );
}

export default ProfileMenu;