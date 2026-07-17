const Feedback = require('./models/Feedback');
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
// Replace the string below with YOUR actual connection string from Atlas
mongoose.connect('mongodb://localhost:27017/eventFeedbackDB')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Import the Express framework
const express = require('express');

// Import CORS so our frontend can call this backend without being blocked
const cors = require('cors');

// Create an instance of an Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Allow the server to understand JSON data sent in requests
app.use(express.json());

// Basic route: when someone visits the homepage of our API, send a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Event Feedback API');
});

// Temporary in-memory storage (not a real database yet — that's Level 3)
let feedbackList = [];

// Route to RECEIVE feedback data sent from the frontend
// POST means the client is sending data to the server (not just asking for a page)
// Route to RECEIVE feedback data and SAVE it to MongoDB
app.post('/api/feedback', async (req, res) => {
  try {
    const { name, event, message } = req.body;

    // Create a new Feedback document using our Mongoose model
    const newFeedback = new Feedback({ name, event, message });

    // Save it to MongoDB (this is an async operation, so we use await)
    await newFeedback.save();

    console.log('Feedback saved to database:', newFeedback);

    res.json({ success: true, message: 'Feedback saved successfully!' });
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({ success: false, message: 'Failed to save feedback' });
  }
});

// Route to DISPLAY all submitted feedback
// GET means the client is asking to retrieve data (this is what browsers do by default)
// Route to RETRIEVE all feedback from MongoDB
app.get('/api/feedback', async (req, res) => {
  try {
    // Fetch all documents from the "feedbacks" collection
    // .sort({ createdAt: -1 }) shows newest feedback first
    const allFeedback = await Feedback.find().sort({ createdAt: -1 });

    res.json(allFeedback);
  } catch (err) {
    console.error('Error fetching feedback:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch feedback' });
  }
});

// Start the server and listen on port 5000
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});