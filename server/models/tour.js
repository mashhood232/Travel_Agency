const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  mealIncluded: { type: Boolean, required: true },
  price: { type: Number, required: true },
  days: { type: Number, required: true },
  travelMode: { type: String, enum: ['bus', 'plane'], required: true },
  departureDate: { type: Date, required: true },
  totalSeats: { type: Number, required: true },
  selected: { type: Boolean, default: false }, // Tracks if a user has selected the tour
  agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true }, // Agent that listed the tour
  reviews: [{ type: mongoose.Schema.Types.Mixed }]
}, { timestamps: true });

module.exports = mongoose.model('Tour', tourSchema);
