const express = require('express');
const router = express.Router();
const {
  getEvents, getEventById, createEvent, updateEvent, deleteEvent, registerForEvent
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', protect, adminOnly, createEvent);
router.put('/:id', protect, adminOnly, updateEvent);
router.delete('/:id', protect, adminOnly, deleteEvent);
router.post('/:id/register', protect, registerForEvent);

module.exports = router;
