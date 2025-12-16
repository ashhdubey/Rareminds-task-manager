const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action: { type: String, required: true }, // e.g., "Created Task", "Updated Status"
  details: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);