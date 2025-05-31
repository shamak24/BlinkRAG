import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# Configure the Gemini API key from environment variables
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_answer_with_gemini(question, context):
    """
    Generate an answer to a question using the Gemini language model,
    based only on the provided context. If the answer is not found in the context,
    a default response is returned.
    """
    # Construct the prompt with instructions and context
    prompt = f"""Answer the following question using ONLY the context provided below.
If the answer is not in the context, respond: "I don't know based on the document."

Context:
{context}

Question: {question}
"""
    # Initialize the Gemini model (using the 'gemini-2.0-flash' variant)
    model = genai.GenerativeModel("gemini-2.0-flash")
    # Generate a response from the model
    response = model.generate_content(prompt)
    # Print context and question for debugging purposes
    print("====CONTEXT PASSED TO GEMINI====")
    print(context)
    print("====QUESTION====")
    print(question)
    # Return the model's response, stripped of leading/trailing whitespace
    return response.text.strip()
