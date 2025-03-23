document.getElementById('submit-btn').addEventListener('click', async function() {
    const scenario = document.getElementById('scenario').value;
    const adjective = document.getElementById('adjective').value;
    const noun = document.getElementById('noun').value;
  
    // Basic validation
    if (!scenario || !adjective || !noun) {
      alert("Please fill in all fields!");
      return;
    }
  
    const prompt = `Scenario: ${scenario}\nSurvival item: ${adjective} ${noun}.\nDetermine if the person survives in a single small sentence.`;
  
    try {
      // Call your backend to interact with the OpenAI API
      const response = await fetch('/get-openai-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });
  
      const data = await response.json();
  
      // Display the response from AI
      document.getElementById('response-text').innerText = data.ai_response;
      document.getElementById('ai-response').style.display = 'block';
    } catch (error) {
      console.error('Error fetching AI response:', error);
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
  