const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attraction: { type: mongoose.Schema.Types.ObjectId, ref: 'Attraction', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

// Prevent duplicate reviews from same user on same attraction
reviewSchema.index({ user: 1, attraction: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
