import { useState, useRef, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../api";
function Chatbot() {

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto Scroll
  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const currentMessage = message;

    const userMessage = {
      sender: "user",
      text: currentMessage,
    };

    // Add user message
    setMessages((prev) => [...prev, userMessage]);

    // Clear input immediately
    setMessage("");

    // Show typing
    setLoading(true);

    try {

      const response = await axios.post(
        `${API_BASE_URL}/chat`,
        {
          message: currentMessage,
        }
      );

      const botMessage = {
        sender: "bot",
        text: response.data.reply,
      };

      // Add bot message
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {

      console.log(error);

      const botMessage = {
        sender: "bot",
        text: "Server error.",
      };

      setMessages((prev) => [...prev, botMessage]);

    } finally {

      // Stop typing
      setLoading(false);
    }
  };

  return (

    <div className="fixed bottom-5 right-5 z-50">

      {/* Floating Button */}
      {!open && (

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg text-2xl hover:scale-110 transition"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {open && (

        <div className="w-80 h-125 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">

          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">

            <h2 className="font-bold text-lg">
              Library AI
            </h2>

            <button
              onClick={() => setOpen(false)}
              className="text-xl"
            >
              ✖
            </button>

          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-100">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`p-3 rounded-xl max-w-[80%] wrap-break-word ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-white text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Typing Loader */}
            {loading && (

              <div className="bg-white text-black p-3 rounded-xl max-w-[80%]">
                Typing...
              </div>
            )}

            {/* Auto Scroll Target */}
            <div ref={messagesEndRef}></div>

          </div>

          {/* Input */}
          <div className="p-3 flex gap-2 border-t">

            <input
              type="text"
              placeholder="Ask something..."
              className="flex-1 border rounded-lg px-3 py-2 outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Send
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Chatbot;