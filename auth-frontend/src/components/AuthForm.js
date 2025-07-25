import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './AuthForm.css';

const AuthForm = ({ type = 'login', darkMode = false, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { language = 'en' } = useLanguage();

  // Basic translations
  const translations = {
    en: {
      signup: 'Sign Up',
      login: 'Login',
      username: 'Username',
      email: 'Email',
      password: 'Password',
      submitSignup: 'Create Account',
      submitLogin: 'Log In',
      switchToLogin: 'Already have an account? Login',
      switchToSignup: "Don't have an account? Sign Up",
      serverError: 'Server error',
      invalidCredentials: 'Invalid credentials',
      userExists: 'User already exists'
    },
    np: {
      signup: 'दर्ता गर्नुहोस्',
      login: 'लगइन गर्नुहोस्',
      username: 'प्रयोगकर्ता नाम',
      email: 'इमेल',
      password: 'पासवर्ड',
      submitSignup: 'खाता खोल्नुहोस्',
      submitLogin: 'लगइन गर्नुहोस्',
      switchToLogin: 'पहिले नै खाता छ? लगइन गर्नुहोस्',
      switchToSignup: 'खाता छैन? दर्ता गर्नुहोस्',
      serverError: 'सर्भर त्रुटि',
      invalidCredentials: 'अमान्य प्रमाणहरू',
      userExists: 'प्रयोगकर्ता पहिले नै अवस्थित छ'
    }
  };

  const translate = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // For signup, get user location first
      let locationData = null;
      if (type === 'signup') {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          locationData = {
            type: "Point",
            coordinates: [position.coords.longitude, position.coords.latitude]
          };
        } catch (geoError) {
          console.warn("Location access denied or failed, proceeding without location");
          // Continue signup without location if user denies permission
        }
      }

      // Prepare payload based on login/signup
      const payload = type === 'login'
        ? { email: formData.email, password: formData.password }
        : {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          ...(locationData && { location: locationData }) // Only include if we have it
        };

      const { data } = await axios.post(
        `http://localhost:5000/api/auth/${type}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Handle successful login/signup
      login(data.token, {
        id: data.user._id,
        username: data.user.username,
        email: data.user.email,
        ...(data.user.location && { location: data.user.location }) // Include location if available
      });

      if (onClose) {
        onClose();
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      if (errorMessage.includes('exists')) {
        setError(translate('userExists'));
      } else if (errorMessage.includes('credentials')) {
        setError(translate('invalidCredentials'));
      } else if (err.response?.status === 400) {
        setError(translate('validationError'));
      } else {
        setError(translate('serverError') + ': ' + errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const switchAuthType = () => {
    setError('');
    setFormData({ username: '', email: '', password: '' });
    if (onClose) {
      window.location.hash = type === 'login' ? 'signup' : 'login';
    } else {
      navigate(type === 'login' ? '/signup' : '/login');
    }
  };

  return (
    <div className={`auth-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="auth-card">
        {onClose && (
          <button className="auth-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        )}

        <h2 className="auth-title">{translate(type === 'login' ? 'login' : 'signup')}</h2>

        {error && <div className="auth-error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {type === 'signup' && (
            <div className="form-group">
              <label htmlFor="username">{translate('username')}</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`form-control ${darkMode ? 'dark-input' : ''}`}
                required
                minLength="3"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">{translate('email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${darkMode ? 'dark-input' : ''}`}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{translate('password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-control ${darkMode ? 'dark-input' : ''}`}
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`auth-submit-btn ${darkMode ? 'dark-button' : ''}`}
          >
            {isLoading ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                {translate('processing')}
              </>
            ) : (
              translate(type === 'login' ? 'submitLogin' : 'submitSignup')
            )}
          </button>
        </form>

        <div className="auth-footer">
          <button
            type="button"
            onClick={switchAuthType}
            className={`auth-switch-btn ${darkMode ? 'dark-link' : ''}`}
          >
            {translate(type === 'login' ? 'switchToSignup' : 'switchToLogin')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;