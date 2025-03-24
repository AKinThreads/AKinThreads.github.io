document.getElementById('submit-btn').addEventListener('click', async function() {
  const scenario = document.getElementById('scenario').value;
  const adjective = document.getElementById('adjective').value;
  const noun = document.getElementById('noun').value;
  const responseTextArea = document.getElementById('response-text');  // Selects the textarea

  // Basic validation
  if (!scenario || !adjective || !noun) {
      alert("Please fill in all fields!");
      return;
  }

  const prompt = `Scenario: ${scenario}\nSurvival item: ${adjective} ${noun}.\nDetermine if the person survives in a single small sentence.`;

  try {
      console.log("Sending request to backend with prompt:", prompt);

      const response = await fetch('/get-openai-response', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();
      
      console.log("Received response from AI:", data);

      if (data.ai_response) {
          responseTextArea.value = data.ai_response;  // Updates the text area
      } else {
          responseTextArea.value = "No response from AI.";
      }

  } catch (error) {
      console.error('Error fetching AI response:', error);
      responseTextArea.value = "Error fetching response. Please try again.";
  }
});

document.getElementById('continue-btn').addEventListener('click', function() {
  document.getElementById('scenario').value = '';
  document.getElementById('adjective').value = '';
  document.getElementById('noun').value = '';
  document.getElementById('response-text').value = ''; // Clear response
});

document.getElementById('quit-btn').addEventListener('click', function() {
  window.location.href = '/';  // Go back to home page
});
