import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import api from '../../lib/api';
import styles from './LoginModal.module.css';

export default function SetupModal({ show, onClose, username, onSetupSuccess }) {
  const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (passwords.password !== passwords.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (passwords.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setIsLoading(true);
    try {
      const response = await api.post('/auth/setup-password', {
        username,
        password: passwords.password
      });

      if (response.data.success) {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        onSetupSuccess();
      } else {

        setError(response.data.message || 'Setup failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Setup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose} data-lenis-prevent="true">
      <div className={styles.modal} onClick={e => e.stopPropagation()} data-lenis-prevent="true">
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>

        <div className={styles.header}>
          <h2>First-Time Setup</h2>
          <p>Please set a secure password for account: <strong>{username}</strong></p>
        </div>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwords.password}
              onChange={e => setPasswords({...passwords, password: e.target.value})}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwords.confirmPassword}
              onChange={e => setPasswords({...passwords, confirmPassword: e.target.value})}
              required
            />
          </div>

          <button type="submit" className={styles.loginBtn} disabled={isLoading}>
            {isLoading ? 'Setting up...' : 'Save Password & Enter'}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
