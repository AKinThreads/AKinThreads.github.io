from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load the environment variables from the .env file
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
app = Flask(__name__)
client = OpenAI(api_key=api_key)

@app.route('/get-openai-response', methods=['POST'])
def get_openai_response():
    try:
        data = request.get_json()
        prompt = data.get('prompt')

        if not prompt:
            return jsonify({'error': 'No prompt provided'}), 400

        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "system", "content": prompt}]
        )

        ai_response = completion.choices[0].message.content
        return jsonify({'ai_response': ai_response})

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
