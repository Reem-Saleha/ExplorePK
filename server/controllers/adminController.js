const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Attraction = require('../models/Attraction');
const Event = require('../models/Event');
const Registration = require('../models/Registration');

// GET /api/admin/stats
const getStats = asyncHandler(async (req, res) => {
  const [totalAttractions, totalEvents, totalUsers, totalRegistrations] = await Promise.all([
    Attraction.countDocuments(),
    Event.countDocuments(),
    User.countDocuments(),
    Registration.countDocuments()
  ]);
  const recentRegistrations = await Registration.find()
    .sort({ registeredAt: -1 })
    .limit(5)
    .populate('user', 'name email')
    .populate('event', 'title date');
  res.json({ totalAttractions, totalEvents, totalUsers, totalRegistrations, recentRegistrations });
});

// GET /api/admin/users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
});

// DELETE /api/admin/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  if (user.role === 'admin') {
    res.status(400);
    throw new Error('Cannot delete an admin account');
  }
  await user.deleteOne();
  res.json({ message: 'User deleted successfully' });
});

module.exports = { getStats, getAllUsers, deleteUser };
