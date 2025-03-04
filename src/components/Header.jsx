import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

function Header({ onLogout }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="editor-header">
      <div className="header-container">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="gradient-text"
        >
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Pixel Art Maker
          </Link>
        </motion.h1>
        
        <div className="header-actions">
          <button 
            className="profile-button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span>My Account</span>
          </button>
          
          {showProfileMenu && <ProfileMenu onClose={() => setShowProfileMenu(false)} onLogout={onLogout} />}
        </div>
      </div>
    </header>
  );
}

export default Header;