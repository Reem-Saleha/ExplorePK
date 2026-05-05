const express = require('express');
const router = express.Router();
const {
  getAttractions, getAttractionById, createAttraction, updateAttraction, deleteAttraction
} = require('../controllers/attractionController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

router.get('/', getAttractions);
router.get('/:id', getAttractionById);
router.post('/', protect, adminOnly, createAttraction);
router.put('/:id', protect, adminOnly, updateAttraction);
router.delete('/:id', protect, adminOnly, deleteAttraction);

module.exports = router;
