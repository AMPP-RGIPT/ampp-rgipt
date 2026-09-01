const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({
    status: 'fail',
    errors: errors.array()
  });
};

//Event Validation

const eventValidationRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }).escape(),
  body('description').trim().notEmpty().withMessage('Description is required').escape(),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('location').trim().notEmpty().withMessage('Location is required').escape(),
  body('time').trim().notEmpty().withMessage('Time is required'),
  body('type').isIn(['Upcoming', 'Past', 'Workshop', 'Seminar']).withMessage('Invalid event type'),
  body('registrationLink').optional({ checkFalsy: true }).isURL().withMessage('Invalid registration link'),
  body('imageUrl').optional({ checkFalsy: true }).isURL().withMessage('Invalid image URL')
];

//User Validation
const loginValidationRules = [
  body('username').trim().notEmpty().withMessage('Username is required').escape(),
  body('password').notEmpty().withMessage('Password is required')
];

const setupPasswordValidationRules = [
  body('username').trim().notEmpty().withMessage('Username is required').escape(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const addUserValidationRules = [
  body('username').trim().notEmpty().withMessage('Username is required').escape(),
  body('password').isLength({ min: 6 }).withMessage('Temporary password must be at least 6 characters'),
  body('role').optional().isIn(['admin', 'editor']).withMessage('Invalid role')
];

//Contact Validation
const contactValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required').escape(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 1000 }).escape()
];

module.exports = {
  validate,
  eventValidationRules,
  loginValidationRules,
  setupPasswordValidationRules,
  addUserValidationRules,
  contactValidationRules
};
