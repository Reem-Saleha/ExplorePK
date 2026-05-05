const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');
const Attraction = require('../models/Attraction');

// POST /api/reviews
const addReview = asyncHandler(async (req, res) => {
  const { attractionId, rating, comment } = req.body;
  if (!attractionId || !rating) {
    res.status(400);
    throw new Error('Attraction ID and rating are required');
  }
  const attraction = await Attraction.findById(attractionId);
  if (!attraction) {
    res.status(404);
    throw new Error('Attraction not found');
  }
  const existing = await Review.findOne({ user: req.user._id, attraction: attractionId });
  if (existing) {
    res.status(400);
    throw new Error('You have already reviewed this attraction');
  }
  const review = await Review.create({
    user: req.user._id,
    attraction: attractionId,
    rating,
    comment
  });

  // Recalculate average rating
  const allReviews = await Review.find({ attraction: attractionId });
  const avg = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
  await Attraction.findByIdAndUpdate(attractionId, {
    averageRating: Math.round(avg * 10) / 10,
    totalReviews: allReviews.length
  });

  const populated = await review.populate('user', 'name');
  res.status(201).json(populated);
});

// GET /api/reviews/attraction/:id
const getReviewsByAttraction = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ attraction: req.params.id })
    .populate('user', 'name')
    .sort({ createdAt: -1 });
  res.json(reviews);
});

// DELETE /api/reviews/:id  (owner or admin)
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }
  const isOwner = review.user.toString() === req.user._id.toString();
  const isAdmin = req.user.role === 'admin';
  if (!isOwner && !isAdmin) {
    res.status(403);
    throw new Error('Not authorised to delete this review');
  }
  const attractionId = review.attraction;
  await review.deleteOne();

  // Recalculate average rating after deletion
  const allReviews = await Review.find({ attraction: attractionId });
  const avg = allReviews.length > 0
    ? allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length
    : 0;
  await Attraction.findByIdAndUpdate(attractionId, {
    averageRating: Math.round(avg * 10) / 10,
    totalReviews: allReviews.length
  });

  res.json({ message: 'Review deleted' });
});

module.exports = { addReview, getReviewsByAttraction, deleteReview };
