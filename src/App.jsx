import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PixelEditor from './pages/PixelEditor';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('pixelArtUser');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('pixelArtUser', JSON.stringify(userData));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('pixelArtUser');
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage isAuthenticated={isAuthenticated} />} />
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/editor" /> : <Login onLogin={handleLogin} />
      } />
      <Route path="/signup" element={
        isAuthenticated ? <Navigate to="/editor" /> : <Signup onSignup={handleLogin} />
      } />
      <Route path="/editor" element={
        isAuthenticated ? <PixelEditor onLogout={handleLogout} /> : <Navigate to="/login" />
      } />
    </Routes>
  );
}

export default App;