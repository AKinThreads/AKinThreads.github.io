// Get the form elements and result container
const scenarioInput = document.getElementById("scenario");
const adjectiveInput = document.getElementById("adjective");
const nounInput = document.getElementById("noun");
const aiResponseElement = document.getElementById("ai-response");
const submitButton = document.getElementById("submit");

// Fetch the API key from the environment variables
const API_KEY = process.env.OPENAI_API_KEY;

// Function to call OpenAI API
async function getOpenAIResponse(prompt) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    return aiResponse;
  } catch (error) {
    console.error("Error fetching OpenAI response:", error);
    return "Sorry, something went wrong. Please try again later.";
  }
}

// Event listener for the submit button
submitButton.addEventListener("click", async () => {
  const scenario = scenarioInput.value;
  const adjective = adjectiveInput.value;
  const noun = nounInput.value;

  if (!scenario || !adjective || !noun) {
    aiResponseElement.textContent = "Please fill in all fields before submitting.";
    return;
  }

  const prompt = `Scenario: ${scenario}\nSurvival item: ${adjective} ${noun}.\nDetermine if the person survives in a single small sentence.`;

  aiResponseElement.textContent = "Loading...";

  const aiResponse = await getOpenAIResponse(prompt);
  aiResponseElement.textContent = aiResponse;
});
