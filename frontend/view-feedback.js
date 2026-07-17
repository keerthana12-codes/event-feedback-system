// Function to fetch feedback from the backend and display it
async function loadFeedback() {
  try {
    // Send a GET request to our backend API
    const response = await fetch('http://localhost:5000/api/feedback');

    // Convert the response into a JS array of feedback objects
    const feedbackData = await response.json();

    const container = document.getElementById('feedbackList');

    // If there's no feedback yet
    if (feedbackData.length === 0) {
      container.innerHTML = '<p>No feedback submitted yet.</p>';
      return;
    }

    // Build HTML for each feedback entry and join them together
    container.innerHTML = feedbackData.map(fb => `
      <div class="feedback-card">
        <strong>${fb.name}</strong> — <em>${fb.event}</em>
        <p>${fb.message}</p>
        <small>${new Date(fb.createdAt).toLocaleString()}</small>
      </div>
    `).join('');

  } catch (err) {
    console.error('Error loading feedback:', err);
    document.getElementById('feedbackList').innerText = 'Failed to load feedback.';
  }
}

// Run this function as soon as the page loads
loadFeedback();