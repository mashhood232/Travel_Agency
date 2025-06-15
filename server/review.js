const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

module.exports = mongoose.model('Review', reviewSchema);
