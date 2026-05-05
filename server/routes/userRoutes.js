const express = require('express');
const router = express.Router();
const { getMyRegistrations, getMyReviews } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/my-registrations', protect, getMyRegistrations);
router.get('/my-reviews', protect, getMyReviews);

module.exports = router;
