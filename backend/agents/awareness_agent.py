from gemini_service import generate_response


def awareness_agent(query):

    prompt = f"""
    You are an NGO Awareness Campaign Assistant.

    Generate:
    - Awareness Campaign Ideas
    - Social Media Strategies
    - Event Promotion Ideas
    - Community Engagement Plans

    User Question:
    {query}
    """

    return generate_response(prompt)