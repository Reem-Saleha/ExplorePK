const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Attraction name is required'], trim: true },
  city: { type: String, required: [true, 'City is required'], trim: true },
  category: {
    type: String,
    enum: ['historical', 'natural', 'religious', 'adventure', 'cultural'],
    required: true
  },
  description: { type: String, required: [true, 'Description is required'] },
  images: [{ type: String }],
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  timings: { type: String },
  nearbyHotels: [{ type: String }],
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attraction', attractionSchema);
