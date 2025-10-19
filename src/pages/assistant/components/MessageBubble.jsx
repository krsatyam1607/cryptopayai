import React from 'react';
import Icon from '../../../components/AppIcon';

const MessageBubble = ({ message, isUser, timestamp, isTyping = false }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} className="text-gray-950" />
        </div>
        <div className="flex-1">
          <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-2xl rounded-tl-md px-4 py-3 max-w-3xl">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 mb-6 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
        ${isUser 
          ? 'bg-gradient-to-br from-cyan-400 to-cyan-500' :'bg-gradient-to-br from-emerald-400 to-emerald-500'
        }
      `}>
        <Icon 
          name={isUser ? "User" : "Bot"} 
          size={16} 
          className="text-gray-950" 
        />
      </div>

      {/* Message Content */}
      <div className="flex-1">
        <div className={`
          rounded-2xl px-4 py-3 max-w-3xl
          ${isUser 
            ? 'bg-cyan-400/10 border border-cyan-400/20 rounded-tr-md ml-auto' :'bg-emerald-400/10 border border-emerald-400/20 rounded-tl-md'
          }
        `}>
          <div className={`
            text-sm leading-relaxed whitespace-pre-wrap
            ${isUser ? 'text-cyan-100' : 'text-emerald-100'}
          `}>
            {message}
          </div>
        </div>
        
        {/* Timestamp */}
        <div className={`
          text-xs text-gray-400 mt-1 px-2
          ${isUser ? 'text-right' : 'text-left'}
        `}>
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;