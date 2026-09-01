import axios from 'axios';

let rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Normalize URL: remove trailing slash
let normalizedBaseUrl = rawBaseUrl.replace(/\/$/, '');

// Safeguard: If it's a Render URL and missing /api, append it
if (normalizedBaseUrl.includes('onrender.com') && !normalizedBaseUrl.endsWith('/api')) {
  normalizedBaseUrl += '/api';
}


// Create axios instance with baseline config
const api = axios.create({
  baseURL: normalizedBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add a request interceptor to automatically attach the token
api.interceptors.request.use(
  (config) => {
    let token = null;
    try {
      token = localStorage.getItem('token');
    } catch (e) {
      console.warn("localStorage is not accessible:", e);
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getApiUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBaseUrl}${cleanPath}`;
};

export default api;

