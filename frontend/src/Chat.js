

import React, { useState } from 'react';
import axios from 'axios';
import './css/Chat.css';

function ChatComponent() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    const newMessage = { text: input, author: 'user' };
    setMessages([...messages, newMessage]);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/get-movie-recommendations/`, {
            input: input
        }, {
            withCredentials: true  
        });
      const botMessage = { text: response.data.response, author: 'bot' };
      setMessages(messages => [...messages, botMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages(messages => [...messages, { text: 'Error getting response from the server.', author: 'bot' }]);
    }
    setInput('');
  };

  return (
    <div className="chat-container">
      <h2>Movie Recommendations Chat</h2>
      <div className="chat-box">
        <div key={-1} className={`message ${'bot'}`}>
            <span className={`message-text ${'bot'}`}>{"Hello! Please tell me what you like so I can recommend a movie to you!"}</span>
        </div>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.author}`}>
            <span className={`message-text ${msg.author}`}>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me for movie recommendations..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatComponent;

