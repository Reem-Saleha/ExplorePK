const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Event title is required'], trim: true },
  description: { type: String },
  category: {
    type: String,
    enum: ['cultural', 'music', 'sports', 'youth', 'food', 'other'],
    required: true
  },
  city: { type: String, trim: true },
  venue: { type: String, trim: true },
  date: { type: Date, required: [true, 'Event date is required'] },
  time: { type: String },
  images: [{ type: String }],
  totalSeats: { type: Number, default: 100 },
  registeredCount: { type: Number, default: 0 },
  isFree: { type: Boolean, default: true },
  price: { type: Number, default: 0 },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
