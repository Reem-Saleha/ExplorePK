const asyncHandler = require('express-async-handler');
const Registration = require('../models/Registration');
const Review = require('../models/Review');

// GET /api/users/my-registrations
const getMyRegistrations = asyncHandler(async (req, res) => {
  const registrations = await Registration.find({ user: req.user._id })
    .populate('event', 'title date city venue isFree price')
    .sort({ registeredAt: -1 });
  res.json(registrations);
});

// GET /api/users/my-reviews
const getMyReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ user: req.user._id })
    .populate('attraction', 'name city images')
    .sort({ createdAt: -1 });
  res.json(reviews);
});

module.exports = { getMyRegistrations, getMyReviews };
