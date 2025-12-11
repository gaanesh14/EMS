import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Cpu, User } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat window on new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const newUserEntry = { sender: "user", text: userMessage };

    // Optimistically update the UI with user's message
    setMessages((prevMessages) => [...prevMessages, newUserEntry]);
    setInput("");
    setIsLoading(true);

    try {
      const token = sessionStorage.getItem("token");
      // Adjust the URL to your Express backend endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}employee/chat`,
        {
          message: userMessage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const botReply = response.data.reply;
      const botEntry = { sender: "bot", text: botReply };

      // Add the bot's response
      setMessages((prevMessages) => [...prevMessages, botEntry]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorEntry = {
        sender: "bot",
        text: "Sorry, I am currently unable to connect to the AI service.",
      };
      setMessages((prevMessages) => [...prevMessages, errorEntry]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-90px)] bg-gray-50 p-4 overflow-hidden">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl flex flex-col h-full">
        {/* Header */}
        <div className="p-4 bg-teal-600 text-white flex items-center shadow-md">
          <Cpu className="w-6 h-6 mr-3" />
          <h2 className="text-xl font-semibold">Employee MS AI Assistant</h2>
        </div>

        {/* Chat Window */}
        <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              <p>
                Ask me anything about employees, departments, or system status!
              </p>
              <p className="text-sm italic mt-2">
                I have access to the current counts of employees and
                departments.
              </p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="p-2 mr-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-700">
                  <Cpu className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md ${
                  msg.sender === "user"
                    ? "bg-teal-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <div className="p-2 ml-2 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* Loading/Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-2 mr-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-700">
                <Cpu className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bg-gray-100 text-gray-800 p-3 rounded-xl rounded-tl-none shadow-md">
                <div className="flex space-x-1">
                  <span className="animate-bounce w-2 h-2 bg-gray-500 rounded-full delay-0"></span>
                  <span className="animate-bounce w-2 h-2 bg-gray-500 rounded-full delay-75"></span>
                  <span className="animate-bounce w-2 h-2 bg-gray-500 rounded-full delay-150"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-50 border-t flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message here..."
            disabled={isLoading}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150 shadow-inner mr-3"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`p-3 rounded-lg text-white font-medium flex items-center justify-center transition duration-200 ${
              isLoading || !input.trim()
                ? "bg-teal-300 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700 shadow-md"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
