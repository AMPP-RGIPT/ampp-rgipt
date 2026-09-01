const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const headerToken = authHeader && authHeader.split(' ')[1];
  const cookieToken = req.cookies && req.cookies.token;

  const token = headerToken || cookieToken;

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_here');
    req.user = decoded;

    // Fetch user from DB to verify if their password setup is complete
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    const isSetupRoute = req.path === '/setup-password' || req.originalUrl.endsWith('/setup-password');
    const isVerifyRoute = req.path === '/verify' || req.originalUrl.endsWith('/verify');

    if (!user.isSetup && !isSetupRoute && !isVerifyRoute) {
      return res.status(403).json({ message: 'Password setup required before accessing this resource' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
