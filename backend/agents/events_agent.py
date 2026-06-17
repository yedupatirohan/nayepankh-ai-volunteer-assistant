from gemini_service import generate_response

def events_agent(query):

    prompt = f"""
    You are an Events Management Assistant for NayePankh Foundation.

    Your responsibilities:
    - Plan NGO events
    - Organize workshops
    - Suggest awareness drives
    - Create community engagement activities
    - Help with event promotion

    User Question:
    {query}

    Provide a clear and helpful response.
    """

    answer = generate_response(prompt)

    return f"[Events Agent]\n\n{answer}"