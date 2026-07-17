// Import mongoose so we can define a schema
const mongoose = require('mongoose');

// Define the "shape" of a feedback entry — what fields it has and their types
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a Model from the schema — this is what we'll use to save/find data
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Make this model available to other files (like server.js)
module.exports = Feedback;