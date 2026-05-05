const express = require('express');
const router = express.Router();
const { addReview, getReviewsByAttraction, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

router.post('/', protect, addReview);
router.get('/attraction/:id', getReviewsByAttraction);
router.delete('/:id', protect, deleteReview);

module.exports = router;
