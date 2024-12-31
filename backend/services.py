import cohere

# Initialize Cohere client with your API key
COHERE_API_KEY = "eAJlWVw9OtDlB93ulL4VpY02vPQgnbwqspg6BB9B"  # Replace with your actual key
cohere_client = cohere.Client(COHERE_API_KEY)

def get_ai_response(question: str) -> str:
    try:
        # Use Cohere's Generate endpoint for text generation
        response = cohere_client.generate(
            model='command-xlarge-nightly',  # You can use other models like 'xlarge' or 'medium'
            prompt=question,
            max_tokens=50,  # Adjust as needed
            temperature=0.7  # Controls randomness
        )
        return response.generations[0].text.strip()
    except cohere.CohereError as e:
        return f"Error: {e}"
