const mongoose = require('mongoose');

const letterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  fileUrl: String,
  deliveryDate: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Letter', letterSchema);
