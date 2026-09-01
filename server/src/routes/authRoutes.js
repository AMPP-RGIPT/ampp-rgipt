const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { validate, loginValidationRules, setupPasswordValidationRules, addUserValidationRules } = require('../middlewares/validator');
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again in 15 minutes'
});


router.post('/login', authLimiter, loginValidationRules, validate, authController.login);
router.post('/logout', authController.logout);
router.get('/verify', authMiddleware, authController.verify);
router.post('/setup-password', authMiddleware, setupPasswordValidationRules, validate, authController.setupPassword);
router.post('/add-user', authMiddleware, roleMiddleware('admin'), addUserValidationRules, validate, authController.addUser);


module.exports = router;
