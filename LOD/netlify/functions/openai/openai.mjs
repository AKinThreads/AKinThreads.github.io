const fetch = require('node-fetch');  // Netlify supports this module for serverless functions

exports.handler = async function(event, context) {
  const { scenario, adjective, noun } = JSON.parse(event.body);
  const prompt = `Scenario: ${scenario}\nSurvival item: ${adjective} ${noun}.\nDetermine if the person survives in a single small sentence.`;

  const apiKey = process.env.OPENAI_API_KEY;  // Ensure you set this in the Netlify environment variables
  
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
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

    return {
      statusCode: 200,
      body: JSON.stringify({ aiResponse }),
    };
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong with the OpenAI request" }),
    };
  }
};

