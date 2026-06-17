from agents.volunteer_agent import volunteer_agent
from agents.internship_agent import internship_agent
from agents.content_agent import content_agent
from agents.awareness_agent import awareness_agent
from agents.events_agent import events_agent

from memory.memory import save_memory


def route_query(query):

    query_lower = query.lower()

    if "volunteer" in query_lower:
        agent = "Volunteer Agent"
        response = volunteer_agent(query)

    elif "internship" in query_lower:
        agent = "Internship Agent"
        response = internship_agent(query)

    elif "content" in query_lower or "post" in query_lower:
        agent = "Content Agent"
        response = content_agent(query)

    elif (
        "event" in query_lower
        or "workshop" in query_lower
        or "seminar" in query_lower
    ):
        agent = "Events Agent"
        response = events_agent(query)

    elif (
        "campaign" in query_lower
        or "awareness" in query_lower
    ):
        agent = "Awareness Agent"
        response = awareness_agent(query)

    else:
        agent = "Assistant"
        response = """
I can help with:

• Volunteer Management
• Internship Information
• Content Creation
• Awareness Campaigns
• Event Planning

Please ask a related question.
"""

    save_memory(query, response)

    return {
        "agent": agent,
        "response": response
    }