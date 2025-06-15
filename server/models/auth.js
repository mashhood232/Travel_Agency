const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'agency'], default: 'user' },
  agencyDetails: {
    type: Object,
    default: null,
  },
  selectedTours: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }]
});

module.exports = mongoose.model('User', userSchema);
