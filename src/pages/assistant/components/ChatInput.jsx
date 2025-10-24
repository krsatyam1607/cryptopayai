import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ChatInput = ({ onSendMessage, isLoading, onVoiceInput }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center bg-gray-800 border border-gray-700 rounded-2xl p-3 focus-within:border-emerald-400 transition-all duration-200">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Ask your assistant anything..."
        rows={1}
        className="flex-1 bg-transparent text-gray-200 text-sm resize-none focus:outline-none px-2"
      />

      <div className="flex items-center space-x-2">
        <button
          onClick={onVoiceInput}
          className="text-gray-400 hover:text-gray-200 transition"
          title="Speak to Assistant"
        >
          <Icon name="Mic" size={18} />
        </button>

        <button
          onClick={handleSend}
          disabled={isLoading}
          className={`rounded-full p-2 transition-all ${
            isLoading
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-emerald-500 hover:bg-emerald-600 text-gray-900'
          }`}
        >
          <Icon name="Send" size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
