import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './LoginModal.module.css';

export default function LoginModal({ show, onClose, onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await onLogin(credentials.username, credentials.password);
      setCredentials({ username: '', password: '' });
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose} data-lenis-prevent="true">
      <div className={styles.modal} onClick={e => e.stopPropagation()} data-lenis-prevent="true">
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>

        <div className={styles.header}>
          <h2>Admin Portal</h2>
          <p>Secure authentication required for editing permissions.</p>
        </div>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={e => setCredentials({...credentials, username: e.target.value})}
              required
              autoComplete="username"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={credentials.password}
              onChange={e => setCredentials({...credentials, password: e.target.value})}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className={styles.loginBtn} disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Access Admin Panel'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Authorized access only. All activities are monitored.</p>
        </div>
      </div>
    </div>,
    document.body
  );
}
