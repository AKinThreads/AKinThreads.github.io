document.getElementById('submit-btn').addEventListener('click', async function() {
  const scenario = document.getElementById('scenario').value;
  const adjective = document.getElementById('adjective').value;
  const noun = document.getElementById('noun').value;
  const responseDiv = document.getElementById('ai-response');
  const responseText = document.getElementById('response-text');

  // Basic validation
  if (!scenario || !adjective || !noun) {
      alert("Please fill in all fields!");
      return;
  }

  const prompt = `Scenario: ${scenario}\nSurvival item: ${adjective} ${noun}.\nDetermine if the person survives in a single small sentence.`;

  try {
      // Debugging: Log before sending request
      console.log("Sending request to backend with prompt:", prompt);

      // Call the backend to get AI's response
      const response = await fetch('/get-openai-response', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();
      
      // Debugging: Log the response
      console.log("Received response from AI:", data);

      // Check if AI response exists
      if (data.ai_response) {
          responseText.innerText = data.ai_response;
          responseDiv.style.display = 'block';  // Show the AI response section
      } else {
          responseText.innerText = "No response from AI.";
          responseDiv.style.display = 'block';
      }

  } catch (error) {
      console.error('Error fetching AI response:', error);
      responseText.innerText = "Error fetching response. Please try again.";
      responseDiv.style.display = 'block';
  }
});

document.getElementById('continue-btn').addEventListener('click', function() {
  document.getElementById('ai-response').style.display = 'none';
  document.getElementById('scenario').value = '';
  document.getElementById('adjective').value = '';
  document.getElementById('noun').value = '';
});

document.getElementById('quit-btn').addEventListener('click', function() {
  window.location.href = '/';  // Go back to the home page
});