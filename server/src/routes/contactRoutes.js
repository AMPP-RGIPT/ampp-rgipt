const express = require('express');
const router = express.Router();
const { submitMessage } = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');
const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many messages from this IP, please try again in an hour.'
  }
});

const { validate, contactValidationRules } = require('../middlewares/validator');

router.post('/', contactLimiter, contactValidationRules, validate, submitMessage);



module.exports = router;
