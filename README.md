# 🌱 NayePankh AI Volunteer Assistant

An AI-powered NGO Volunteer Management System designed to assist volunteers, interns, and NGOs through intelligent conversation and automation.

## Features

* 🤖 Gemini AI Powered Chat Assistant
* 🙋 Volunteer Guidance & Support
* 🎓 Internship Information
* 📢 Awareness Campaign Content Generation
* 🎉 Event Management Assistance
* 🔍 Chat Search Functionality
* 💾 Chat History Storage
* 📤 Export Chat Feature
* 🌙 Dark Mode Support

## Tech Stack

### Frontend

* React.js
* Vite
* Axios
* React Markdown
* CSS3

### Backend

* FastAPI
* Python
* Gemini AI API

## Project Structure

```text
nayepankh-ai-volunteer-assistant/
│
├── backend/
│   ├── agents/
│   ├── memory/
│   ├── main.py
│   ├── router.py
│   └── gemini_service.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Installation

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Author

Rohan Yedupati

## License

Educational and Portfolio Project.
