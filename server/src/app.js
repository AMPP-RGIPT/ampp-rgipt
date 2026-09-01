const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const errorMiddleware = require('./middlewares/errorMiddleware');
const connectDB = require('./db/db');

require('dotenv').config();

const app = express();
app.set('trust proxy', 1); // Trust first proxy for rate limiting behind load balancers


// 1. Database Connection
connectDB();

// 2. CORS - Must be very early to handle preflight OPTIONS requests
const allowedOrigins = [
  'https://ampprgipt.vercel.app',
  'https://ampp-rgipt.vercel.app',
  'https://ampp-omega.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5174'
];

if (process.env.FRONTEND_URL) {
  const envOrigins = process.env.FRONTEND_URL.split(',').map(url => url.trim().replace(/\/$/, ''));
  envOrigins.forEach(origin => {
    if (!allowedOrigins.includes(origin)) allowedOrigins.push(origin);
  });
}

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const normalizedOrigin = origin.replace(/\/$/, '');
    const isExactMatch = allowedOrigins.includes(normalizedOrigin);
    const isVercelDomain = /^https:\/\/(ampp.*|.*ampp.*)\.vercel\.app$/i.test(normalizedOrigin);

    if (isExactMatch || isVercelDomain) {
      callback(null, true);
    } else {
      console.warn('CORS Blocked Origin:', origin);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
};
app.use(cors(corsOptions));

// 3. Security Headers - Configured to allow cross-origin
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "unsafe-none" }
}));

// 4. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again in 15 minutes'
});
app.use('/api', limiter);

// 5. Body Parsers
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());


app.use(mongoSanitize());

app.use(xss());

app.use(hpp());


app.get('/', (req, res) => {
  res.send('AMPP Server API is running...');
});

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/contact', contactRoutes);

app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

app.use(errorMiddleware);

module.exports = app;

