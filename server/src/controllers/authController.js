const User = require('../models/User');
const jwt = require('jsonwebtoken');


const signToken = (id, username, role) => {
  return jwt.sign(
    { id, username, role },
    process.env.JWT_SECRET || 'your_jwt_secret_here',
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

const sendCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('token', token, {
    httpOnly: true,
    secure: isProduction, // Must be true for sameSite: 'none'
    sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-site, 'lax' for local dev
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });
};



const addUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const user = await User.create({ username, password, role: role || 'editor' });
    res.status(201).json({ success: true, user: { username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = signToken(user._id, user.username, user.role);

    if (!user.isSetup) {
      sendCookie(res, token);
      return res.status(200).json({
        success: true,
        setupRequired: true,
        message: 'Password setup required',
        username: user.username,
        token
      });
    }

    sendCookie(res, token);

    res.json({
      success: true,
      token,
      user: { id: user._id, username: user.username, role: user.role }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const setupPassword = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (req.user.username !== username) {
      return res.status(403).json({ success: false, message: 'Forbidden: Cannot setup password for another user' });
    }

    const user = await User.findOne({ username }).select('+password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.isSetup) {
      return res.status(400).json({ success: false, message: 'Password already setup' });
    }

    user.password = password;
    user.isSetup = true;
    await user.save();

    const token = signToken(user._id, user.username, user.role);

    sendCookie(res, token);

    res.json({
      success: true,
      token,
      user: { id: user._id, username: user.username, role: user.role },
      message: 'Password set up successfully'
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const verify = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('token', '', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      expires: new Date(0)
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { login, setupPassword, addUser, verify, logout };
