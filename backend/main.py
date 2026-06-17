from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from memory.memory import get_memory

from router import route_query

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str


@app.get("/")
def home():
    return {
        "message": "NayePankh AI Volunteer Assistant Running"
    }


@app.post("/chat")
def chat(data: PromptRequest):

    try:
        result = route_query(data.prompt)

        return result

    except Exception as e:
        return {
            "error": str(e)
        }
@app.get("/memory")
def memory():

    return {
        "history": get_memory()
    }