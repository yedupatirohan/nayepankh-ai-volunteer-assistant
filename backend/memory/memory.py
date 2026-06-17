chat_history = []

def save_memory(user_query, response):
    chat_history.append({
        "user": user_query,
        "assistant": response
    })

def get_memory():
    return chat_history