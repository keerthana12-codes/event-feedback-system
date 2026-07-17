document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const event = document.getElementById('event').value.trim();
  const message = document.getElementById('message').value.trim();

  const statusEl = document.getElementById('statusMsg');

  // Basic validation: check that nothing is empty (after trimming whitespace)
  if (!name || !event || !message) {
    statusEl.innerText = 'Please fill in all fields before submitting.';
    statusEl.style.color = 'red';
    return;   // stop here — don't send the request if validation fails
  }

  try {
    const response = await fetch('http://localhost:5000/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, event, message })
    });

    const data = await response.json();
    console.log(data);
    
    if (data.success) {
      statusEl.innerText = data.message;
      statusEl.style.color = '#1a7a3c';
      statusEl.style.backgroundColor = '#e6f7ec';
      document.getElementById('feedbackForm').reset();
    } else {
      statusEl.innerText = 'Something went wrong. Please try again.';
      statusEl.style.color = '#c0392b';
      statusEl.style.backgroundColor = '#fdecea';
    }
    

  } catch (err) {
    console.error('Error submitting feedback:', err);
    statusEl.innerText = 'Something went wrong. Please try again.';
    statusEl.style.color = 'red';
  }
});