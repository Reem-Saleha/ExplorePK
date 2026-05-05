const asyncHandler = require('express-async-handler');
const Attraction = require('../models/Attraction');
const Review = require('../models/Review');

// GET /api/attractions
const getAttractions = asyncHandler(async (req, res) => {
  const { city, category, search } = req.query;
  const query = {};
  if (city) query.city = { $regex: city, $options: 'i' };
  if (category) query.category = category;
  if (search) query.$or = [
    { name: { $regex: search, $options: 'i' } },
    { description: { $regex: search, $options: 'i' } },
    { city: { $regex: search, $options: 'i' } }
  ];
  const attractions = await Attraction.find(query).sort({ createdAt: -1 });
  res.json(attractions);
});

// GET /api/attractions/:id
const getAttractionById = asyncHandler(async (req, res) => {
  const attraction = await Attraction.findById(req.params.id).populate('createdBy', 'name');
  if (!attraction) {
    res.status(404);
    throw new Error('Attraction not found');
  }
  const reviews = await Review.find({ attraction: req.params.id }).populate('user', 'name');
  res.json({ attraction, reviews });
});

// POST /api/attractions
const createAttraction = asyncHandler(async (req, res) => {
  const { name, city, category, description, images, location, timings, nearbyHotels } = req.body;
  if (!name || !city || !category || !description) {
    res.status(400);
    throw new Error('Please fill all required fields');
  }
  const attraction = await Attraction.create({
    name, city, category, description, images, location, timings, nearbyHotels,
    createdBy: req.user._id
  });
  res.status(201).json(attraction);
});

// PUT /api/attractions/:id
const updateAttraction = asyncHandler(async (req, res) => {
  const attraction = await Attraction.findById(req.params.id);
  if (!attraction) {
    res.status(404);
    throw new Error('Attraction not found');
  }
  const updated = await Attraction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.json(updated);
});

// DELETE /api/attractions/:id
const deleteAttraction = asyncHandler(async (req, res) => {
  const attraction = await Attraction.findById(req.params.id);
  if (!attraction) {
    res.status(404);
    throw new Error('Attraction not found');
  }
  await attraction.deleteOne();
  await Review.deleteMany({ attraction: req.params.id });
  res.json({ message: 'Attraction deleted successfully' });
});

module.exports = { getAttractions, getAttractionById, createAttraction, updateAttraction, deleteAttraction };
