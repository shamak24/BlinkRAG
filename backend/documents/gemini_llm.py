import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_answer_with_gemini(question, context):
    prompt = f"""Answer the following question using ONLY the context provided below.
If the answer is not in the context, respond: "I don't know based on the document."

Context:
{context}

Question: {question}
"""
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(prompt)
    print("====CONTEXT PASSED TO GEMINI====")
    print(context)
    print("====QUESTION====")
    print(question)
    return response.text.strip()
