from gemini_service import generate_response
def internship_agent(query):

    prompt = f"""
    You are NayePankh Foundation's Internship Assistant.

    Help students with:
    - Internship information
    - Learning opportunities
    - Certificates
    - Skill development

    User Question:
    {query}
    """

    answer = generate_response(prompt)

    return f"[Internship Agent]\n\n{answer}"