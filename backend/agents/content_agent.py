from gemini_service import generate_response


def content_agent(query):
    prompt = f"""
    You are a Content Creation Assistant.

    Create NGO awareness content,
    social media posts,
    campaign ideas and captions.

    User Question:
    {query}
    """

    return generate_response(prompt)