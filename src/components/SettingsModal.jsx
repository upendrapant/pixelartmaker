import { motion } from 'framer-motion';
import { useState } from 'react';

function SettingsModal({ isOpen, onClose, theme, setTheme }) {
  const [localTheme, setLocalTheme] = useState(theme);
  
  const handleSave = () => {
    setTheme(localTheme);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-backdrop">
      <motion.div 
        className="modal-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="close-btn" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="settings-section">
            <h3>Appearance</h3>
            <div className="theme-selector">
              <div 
                className={`theme-option ${localTheme === 'dark' ? 'active' : ''}`}
                onClick={() => setLocalTheme('dark')}
              >
                <div className="theme-preview dark-preview"></div>
                <span>Dark</span>
              </div>
              
              <div 
                className={`theme-option ${localTheme === 'light' ? 'active' : ''}`}
                onClick={() => setLocalTheme('light')}
              >
                <div className="theme-preview light-preview"></div>
                <span>Light</span>
              </div>
              
              <div 
                className={`theme-option ${localTheme === 'system' ? 'active' : ''}`}
                onClick={() => setLocalTheme('system')}
              >
                <div className="theme-preview system-preview"></div>
                <span>System</span>
              </div>
            </div>
          </div>
          
          <div className="settings-section">
            <h3>Grid Options</h3>
            <div className="setting-item">
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
              <span>Show grid lines</span>
            </div>
            
            <div className="setting-item">
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
              <span>Pixel hover effect</span>
            </div>
          </div>
          
          <div className="settings-section">
            <h3>Autosave</h3>
            <div className="setting-item">
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
              <span>Enable autosave</span>
            </div>
            
            <div className="setting-item">
              <label>Autosave interval</label>
              <select className="select-input">
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
                <option value="300">5 minutes</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="secondary-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" onClick={handleSave}>Save Changes</button>
        </div>
      </motion.div>
    </div>
  );
}

export default SettingsModal;