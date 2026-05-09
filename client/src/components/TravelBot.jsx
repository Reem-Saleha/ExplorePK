import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import '../styles/travelbot.css';

const SUGGESTIONS = [
  'Plan a 3-day trip to Lahore',
  'Best places in northern Pakistan',
  'Upcoming events in Islamabad',
  'Budget travel tips for Pakistan'
];

const formatMessage = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />');
};

const TravelBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Assalam o Alaikum! I'm TravelBot 🌟 Your personal Pakistan travel guide. Ask me to plan a trip, recommend attractions, or tell you about events!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async (text) => {
    const userMessage = text || inputValue.trim();
    if (!userMessage || isLoading) return;

    setInputValue('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await api.post('/ai/chat', {
        message: userMessage,
        conversationHistory: messages.slice(-10)
      });
      setMessages((prev) => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again!" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showSuggestions = messages.length === 1 && !isLoading;

  return (
    <>
      <div className={`travelbot-panel ${isOpen ? 'active' : ''}`}>
        <div className="travelbot-header">
          <div className="travelbot-header-info">
            <i className="bi bi-robot me-2"></i>
            <span>TravelBot</span>
            <span className="travelbot-online-dot"></span>
          </div>
          <button className="travelbot-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="travelbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`travelbot-message ${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="travelbot-avatar">
                  <i className="bi bi-robot"></i>
                </div>
              )}
              <div
                className={`travelbot-bubble ${msg.role}`}
                dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
              />
            </div>
          ))}

          {isLoading && (
            <div className="travelbot-message assistant">
              <div className="travelbot-avatar">
                <i className="bi bi-robot"></i>
              </div>
              <div className="travelbot-typing">
                <span className="travelbot-dot"></span>
                <span className="travelbot-dot"></span>
                <span className="travelbot-dot"></span>
              </div>
            </div>
          )}

          {showSuggestions && (
            <div className="travelbot-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="travelbot-pill" onClick={() => sendMessage(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="travelbot-input-row">
          <input
            type="text"
            className="travelbot-input"
            placeholder="Ask about Pakistan travel..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            className="travelbot-send"
            onClick={() => sendMessage()}
            disabled={isLoading || !inputValue.trim()}
            aria-label="Send message"
          >
            <i className="bi bi-send-fill"></i>
          </button>
        </div>
      </div>

      <button
        className={`travelbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open TravelBot chat"
      >
        <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-chat-dots-fill'}`}></i>
      </button>
    </>
  );
};

export default TravelBot;
