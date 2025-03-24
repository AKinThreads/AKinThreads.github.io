from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os

# Force load the .env file from an absolute path
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

# Get API Key
api_key = os.getenv("OPENAI_API_KEY")


if not api_key:
    raise ValueError("Error: OPENAI_API_KEY not found in .env file")

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
