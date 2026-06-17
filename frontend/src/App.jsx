import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  

  const [darkMode, setDarkMode] =
  useState(false);
  const chatEndRef = useRef(null);

  // Load chat history
  useEffect(() => {
    const savedMessages =
      localStorage.getItem("nayePankhChat");

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save chat history
  useEffect(() => {
    localStorage.setItem(
      "nayePankhChat",
      JSON.stringify(messages)
    );
  }, [messages]);

  // Auto Scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const currentPrompt = prompt;

    const userMessage = {
      type: "user",
      text: currentPrompt,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    setPrompt("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          prompt: currentPrompt,
        }
      );

      const aiMessage = {
        type: "ai",
        text:
          res.data.response ||
          res.data.error ||
          "No response received",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "❌ Error connecting to backend",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(
      "nayePankhChat"
    );
  };
  const exportChat = () => {
  if (messages.length === 0) {
    alert("No chat available to export");
    return;
  }

  const chatContent = messages
    .map(
      (msg) =>
        `[${msg.time}] ${
          msg.type === "user"
            ? "User"
            : "AI"
        }: ${msg.text}`
    )
    .join("\n\n");

  const blob = new Blob(
    [chatContent],
    { type: "text/plain" }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    `NayePankhChat_${
      new Date().toISOString().split("T")[0]
    }.txt`;

  link.click();

  window.URL.revokeObjectURL(url);
};
  const toggleTheme = () => {
  setDarkMode(!darkMode);
  };
  const filteredMessages = messages.filter((msg) =>
  msg.text
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);

  return (
    <div
    className={
      darkMode
        ? "layout dark"
        : "layout"
  }
  >
      <Sidebar
        setPrompt={setPrompt}
        clearChat={clearChat}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        messages={messages}
      />

      <div className="app">
        <h1 className="main-title">
          🌱 NayePankh AI Volunteer Assistant
        </h1>

        <div className="chat-header">
          <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search chats..."
            value={searchTerm}
            onChange={(e) =>
            setSearchTerm(e.target.value)
            }
          />
          </div>
          <div>
            <h3>NayePankh Assistant</h3>
            <p>
              AI Volunteer Management System
            </p>
          </div>

          <div className="status">
            🟢 Online
          </div>
        </div>

        <div className="chat-box">

          {messages.length === 0 && (
            <div className="welcome-screen">
              <h2>
                Welcome to NayePankh AI 🌱
              </h2>

              <p>
                Your AI-powered NGO assistant
                for volunteering,
                internships, awareness
                campaigns, content creation,
                and event management.
              </p>

              <div className="suggestions">

                <div
                  className="suggestion-card"
                  onClick={() =>
                    setPrompt(
                      "How can I volunteer?"
                    )
                  }
                >
                  🙋 Volunteer Help
                </div>

                <div
                  className="suggestion-card"
                  onClick={() =>
                    setPrompt(
                      "Available internships"
                    )
                  }
                >
                  🎓 Internship Info
                </div>

                <div
                  className="suggestion-card"
                  onClick={() =>
                    setPrompt(
                      "Create awareness content"
                    )
                  }
                >
                  📢 Content Creation
                </div>

                <div
                  className="suggestion-card"
                  onClick={() =>
                    setPrompt(
                      "Upcoming events"
                    )
                  }
                >
                  🎉 Events
                </div>

              </div>
            </div>
          )}

          {filteredMessages.map(
              (msg, index) => (
              <div
                key={index}
                className={
                  msg.type === "user"
                    ? "message-row user-row"
                    : "message-row ai-row"
                }
              >
                <div className="avatar">
                  {msg.type === "user"
                    ? "👤"
                    : "🤖"}
                </div>

                <div className="message-wrapper">

                  <div
                    className={
                      msg.type === "user"
                        ? "message user"
                        : "message ai"
                    }
                  >
                    {msg.type === "ai" ? (
                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>

                  <div className="timestamp">
                    {msg.time}
                  </div>

                </div>
              </div>
            )
          )}

          {loading && (
            <div className="message-row ai-row">

              <div className="avatar">
                🤖
              </div>

              <div className="message ai loading">
                ● ● ●
              </div>

            </div>
          )}
         <div ref={chatEndRef}></div>
</div>

<div className="input-section">

  <input
    type="text"
    placeholder="Ask anything about volunteering, internships, events..."
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    }}
  />

  <button onClick={sendMessage}>
    Send
  </button>

  <button
    className="export-btn"
    onClick={exportChat}
  >
    Export
  </button>

  <button
    className="clear-btn"
    onClick={clearChat}
  >
    Clear
  </button>

</div>

<div className="footer-bar">
  Powered by React • FastAPI • Gemini AI
</div>

</div>
</div>
);
}

export default App;