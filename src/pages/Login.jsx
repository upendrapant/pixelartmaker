import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Auth.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }
      
      // In a real app, you would validate credentials with your backend
      // For demo purposes, we'll just accept any valid-looking email
      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email');
      }
      
      // Mock successful login
      onLogin({
        id: '1',
        email: formData.email,
        name: formData.email.split('@')[0],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div 
          className="auth-form-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <Link to="/" className="auth-logo">Pixel Art Maker</Link>
            <h1>Welcome back</h1>
            <p>Sign in to your account to continue</p>
          </div>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            
            <button 
              type="submit" 
              className="auth-button"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="auth-divider">
            <span>OR</span>
          </div>
          
          <div className="social-auth">
            <button className="social-button google">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
            
            <button className="social-button github">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.66-3.67-1.46-3.67-1.46-.5-1.28-1.22-1.62-1.22-1.62-.99-.68.07-.67.07-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.56 1.19 3.19.91.1-.7.38-1.19.7-1.46-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.43-2.22 1.13-3-.11-.28-.49-1.4.11-2.91 0 0 .93-.3 3.05 1.14a10.65 10.65 0 015.5 0c2.12-1.44 3.05-1.14 3.05-1.14.6 1.51.22 2.63.11 2.91.7.78 1.13 1.78 1.13 3 0 4.28-2.6 5.22-5.08 5.5.39.34.74 1 .74 2.02v3c0 .29.19.63.74.53A11 11 0 0012 1.27"></path>
              </svg>
              Sign in with GitHub
            </button>
          </div>
          
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </div>
        </motion.div>
        
        <motion.div 
          className="auth-image"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="auth-image-content">
            <h2>Create Pixel Art Masterpieces</h2>
            <p>Join our community of pixel artists and game developers.</p>
            <div className="auth-image-grid">
              {Array(16).fill().map((_, i) => (
                <div key={i} className={`auth-pixel p${i}`}></div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;