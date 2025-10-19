import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, isLoading = false, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !isLoading && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 120)}px`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end space-x-3 p-4 bg-gray-800 border border-gray-700 rounded-2xl">
        {/* Attachment Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="flex-shrink-0 text-gray-400 hover:text-gray-300"
          disabled={disabled}
        >
          <Icon name="Paperclip" size={20} />
        </Button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about payments, transactions, or USDC management..."
            disabled={disabled || isLoading}
            className="
              w-full bg-transparent text-gray-100 placeholder-gray-400
              resize-none border-0 outline-none
              min-h-[24px] max-h-[120px] leading-6
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            rows={1}
          />
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          size="icon"
          disabled={!message?.trim() || isLoading || disabled}
          className="
            flex-shrink-0 bg-gradient-to-r from-cyan-400 to-emerald-400 
            hover:from-cyan-500 hover:to-emerald-500
            disabled:from-gray-600 disabled:to-gray-600
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isLoading ? (
            <Icon name="Loader2" size={20} className="animate-spin text-gray-950" />
          ) : (
            <Icon name="Send" size={20} className="text-gray-950" />
          )}
        </Button>
      </div>
      {/* Character count indicator */}
      {message?.length > 200 && (
        <div className="absolute -top-6 right-0 text-xs text-gray-400">
          {message?.length}/500
        </div>
      )}
    </form>
  );
};

export default ChatInput;