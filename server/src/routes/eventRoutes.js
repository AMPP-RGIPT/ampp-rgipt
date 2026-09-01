const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

const { validate, eventValidationRules } = require('../middlewares/validator');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', eventController.getEvents);

router.post('/', authMiddleware, upload.single('image'), eventValidationRules, validate, eventController.createEvent);
router.put('/:id', authMiddleware, upload.single('image'), eventValidationRules, validate, eventController.updateEvent);
router.delete('/:id', authMiddleware, eventController.deleteEvent);



module.exports = router;
