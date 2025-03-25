// Get the form elements and result container
const scenarioInput = document.getElementById("scenario");
const adjectiveInput = document.getElementById("adjective");
const nounInput = document.getElementById("noun");
const aiResponseElement = document.getElementById("ai-response");
const submitButton = document.getElementById("submit");

// Function to call the serverless function
async function getOpenAIResponse(scenario, adjective, noun) {
  try {
    const response = await fetch("/.netlify/functions/openai/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scenario,
          adjective,
          noun,
        }),
      });
      


    const data = await response.json();
    return data.aiResponse;
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

  aiResponseElement.textContent = "Loading...";

  const aiResponse = await getOpenAIResponse(scenario, adjective, noun);
  aiResponseElement.textContent = aiResponse;
});
