const mongoose = require('mongoose');

const yeetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    default: '',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Yeet',
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Yeet',
  },
  source: {
    type: String,
  },
  // Add more fields for media references if needed
});

const Yeet = mongoose.model('Yeet', yeetSchema);

module.exports = Yeet;
