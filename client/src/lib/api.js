import axios from 'axios';

let rawBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Safeguard: If VITE_API_BASE_URL is missing or set to localhost while running on a deployed domain (like Vercel), fallback to Render backend
const isBrowser = typeof window !== 'undefined';
const isProductionDomain = isBrowser && !['localhost', '127.0.0.1'].includes(window.location.hostname);

if (!rawBaseUrl || (isProductionDomain && rawBaseUrl.includes('localhost'))) {
  if (isProductionDomain) {
    rawBaseUrl = 'https://ampp-rgipt.onrender.com/api';
  } else {
    rawBaseUrl = 'http://localhost:5000/api';
  }
}

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

