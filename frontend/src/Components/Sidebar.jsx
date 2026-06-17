import "./Sidebar.css";

function Sidebar({
  setPrompt,
  clearChat,
  darkMode,
  toggleTheme,
  messages,
}) {
  return (
    <div className="sidebar">

      <div className="logo-section">
        <h2>🌱 NayePankh AI</h2>
        <p>NGO Volunteer Assistant</p>
      </div>

      <button
        className="new-chat-btn"
        onClick={clearChat}
      >
        + New Chat
      </button>

      <button
        className="theme-btn"
        onClick={toggleTheme}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="menu">

        <div
          className="menu-item"
          onClick={() =>
            setPrompt("How can I volunteer?")
          }
        >
          🙋 Volunteer Help
        </div>

        <div
          className="menu-item"
          onClick={() =>
            setPrompt("Available internships")
          }
        >
          🎓 Internship Info
        </div>

        <div
          className="menu-item"
          onClick={() =>
            setPrompt("Create awareness content")
          }
        >
          📢 Content Creation
        </div>

        <div
          className="menu-item"
          onClick={() =>
            setPrompt("Awareness campaigns")
          }
        >
          🌍 Campaigns
        </div>

        <div
          className="menu-item"
          onClick={() =>
            setPrompt("Upcoming events")
          }
        >
          🎉 Events
        </div>

      </div>

      <div className="history-section">
        <h3>Recent Chats</h3>

        {messages
          .filter((msg) => msg.type === "user")
          .slice(-5)
          .reverse()
          .map((msg, index) => (
            <div
              key={index}
              className="history-item"
            >
              {msg.text}
            </div>
          ))}
      </div>

      <div className="footer">
        <p>Powered by Gemini AI</p>
        <p>Version 3.0</p>
      </div>

    </div>
  );
}

export default Sidebar;