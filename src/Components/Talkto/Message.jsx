import React, { useState, useEffect } from "react";
import "./Message.css";

export default function ChatAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  // Auto-message on open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "How can I help you today?"
        }
      ]);
    }
  }, [open, messages]);

  // Language detection (simple)
  const detectLanguage = (msg) => {
    const romanWords = ["dard", "bukhar", "khansi", "shukriya", "mujhe", "chahiye"];
    const found = romanWords.some((word) => msg.toLowerCase().includes(word));
    return found ? "roman" : "english";
  };

  // Bot replies in both languages
  const getBotReply = (userMsg) => {
    const lang = detectLanguage(userMsg);
    const lower = userMsg.toLowerCase();

    if (lang === "english") {
      if (lower.includes("hi") || lower.includes("hello")) {
        return "Hello! 👋 Do you need any medicine or consultation?";
      }
      if(lower.includes("yep")|| lower.includes("yes") || lower.includes("sure")){
        return "Great! How can I assist you further?";
      }
      if (lower.includes("pain")) {
        return "For pain relief we usually suggest Paracetamol (500mg).";
      }
      if (lower.includes("fever")) {
        return "For fever, you can take Paracetamol and keep yourself hydrated.";
      }
       if (lower.includes("fever") && lower.includes("cough")) {
    return "Since you have both fever and cough, you can take Paracetamol (500mg) for fever and a cough syrup containing Dextromethorphan. Stay hydrated and rest well.";
  }
      if (lower.includes("cough")) {
        return "For cough, syrup like Dextromethorphan can help.";
      }
      if (lower.includes("bye")|| lower.includes("thanks")) {
        return "Thank you! Stay healthy.";
      }
      return "Sorry, I can only answer basic pharmacy queries in English.";
    }

    // Roman Urdu replies
    if (lang === "roman") {
      if (lower.includes("hi") || lower.includes("salam") || lower.includes("hello")) {
        return "Hello! 👋 Kya aap ko dawa ya mashwara chahiye?";
      }
      if(lower.includes("haan")|| lower.includes("ji") || lower.includes("gi")){
        return "Acha! Main aap ki kis tarah madad kar sakta hoon?"; 
      }
      if (lower.includes("dard")) {
        return "Dard ke liye aam tor par Paracetamol (500mg) use hoti hai.";
      }
      if (lower.includes("bukhar")) {
        return "Bukhar ke liye Paracetamol lo aur paani zyada piya karo.";
      }
      if (lower.includes("khansi")) {
        return "Khansi ke liye syrup jaise Dextromethorphan use hota hai.";
      }
      if (lower.includes("bukhar") && lower.includes("khansi")) {
  return "Mujhe afsos hai ke aap theek mehsoos nahi kar rahe 😷. Agar aapko bukhar aur khansi dono hain to aap Paracetamol (500mg) le sakte hain bukhar ke liye, aur khansi ke liye koi Dextromethorphan wala syrup lein. Pani zyada piyein aur achi tarhan aaram karein.";
}

      if (lower.includes("shukriya") || lower.includes("bye")) {
        return "Shukriya! Sehatmand rahiye.";
      }
      return "Maazrat, main sirf basic pharmacy sawalon ka jawab de sakta hoon Roman Urdu mein.";
    }
  };

  // Handle user message
  const handleSend = (e) => {
    e.preventDefault();
    const input = e.target.elements.userMsg.value.trim();
    if (!input) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    e.target.reset();

    // Bot auto-reply after delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: getBotReply(input) }
      ]);
    }, 1000);
  };

  return (
    <div className="chat-agent-wrapper">
      {/* Toggle Button */}
      {!open && (
        <button className="chat-toggle-btn" onClick={() => setOpen(true)}>
          💊
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <span>⚕️ Pharmacy Assistant</span>
            <button onClick={() => setOpen(false)}>×</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <form className="chat-input" onSubmit={handleSend}>
            <input
              type="text"
              name="userMsg"
              placeholder="Type your message..."
              autoComplete="off"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}
// Note: This component provides a simple chat interface where users can interact with a basic pharmacy assistant bot that understands both English and Roman Urdu. The bot can respond to common queries about pain, fever, and cough, and it detects the language based on specific keywords.
