from gemini_service import generate_response

def volunteer_agent(query):

    prompt = f"""
    You are NayePankh Foundation's Volunteer Management Assistant.

    Your responsibilities:
    - Guide volunteers
    - Suggest volunteer activities
    - Explain volunteering benefits
    - Help with volunteer onboarding

    User Question:
    {query}
    """

    answer = generate_response(prompt)

    return f"[Volunteer Agent]\n\n{answer}"