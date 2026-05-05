const asyncHandler = require('express-async-handler');
const Event = require('../models/Event');
const Registration = require('../models/Registration');

// GET /api/events
const getEvents = asyncHandler(async (req, res) => {
  const { city, category, dateFrom, dateTo } = req.query;
  const query = {};
  if (city) query.city = { $regex: city, $options: 'i' };
  if (category) query.category = category;
  if (dateFrom || dateTo) {
    query.date = {};
    if (dateFrom) query.date.$gte = new Date(dateFrom);
    if (dateTo) query.date.$lte = new Date(dateTo);
  }
  const events = await Event.find(query).sort({ date: 1 });
  res.json(events);
});

// GET /api/events/:id
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate('createdBy', 'name');
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }
  res.json(event);
});

// POST /api/events
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, category, city, venue, date, time, images, totalSeats, isFree, price } = req.body;
  if (!title || !category || !date) {
    res.status(400);
    throw new Error('Please provide title, category, and date');
  }
  const event = await Event.create({
    title, description, category, city, venue, date, time, images,
    totalSeats: totalSeats || 100, isFree, price: price || 0,
    createdBy: req.user._id
  });
  res.status(201).json(event);
});

// PUT /api/events/:id
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.json(updated);
});

// DELETE /api/events/:id
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }
  await event.deleteOne();
  await Registration.deleteMany({ event: req.params.id });
  res.json({ message: 'Event deleted successfully' });
});

// POST /api/events/:id/register
const registerForEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }
  if (event.registeredCount >= event.totalSeats) {
    res.status(400);
    throw new Error('Event is fully booked');
  }
  const alreadyRegistered = await Registration.findOne({ user: req.user._id, event: req.params.id });
  if (alreadyRegistered) {
    res.status(400);
    throw new Error('You are already registered for this event');
  }
  const registration = await Registration.create({ user: req.user._id, event: req.params.id });
  await Event.findByIdAndUpdate(req.params.id, { $inc: { registeredCount: 1 } });
  res.status(201).json({ message: 'Successfully registered for event', registration });
});

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent, registerForEvent };
