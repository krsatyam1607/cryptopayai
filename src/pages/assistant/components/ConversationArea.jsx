import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const ConversationArea = ({ messages, isTyping = false }) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scroll-smooth"
      style={{ maxHeight: 'calc(100vh - 280px)' }}
    >
      {messages?.length === 0 && !isTyping ? (
        <div className="flex flex-col items-center justify-center h-full text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-950" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">
            Welcome to Solaris - A CryptoPayAI Assistant
          </h3>
          <p className="text-gray-400 max-w-md leading-relaxed">
            I'm here to help you with USDC payments, transaction explanations, scheduling assistance, and cryptocurrency best practices. Ask me anything!
          </p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-cyan-400/20 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-300">Payment Guidance</span>
              </div>
              <p className="text-xs text-gray-400">
                Get help with sending, receiving, and scheduling USDC payments
              </p>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-emerald-400/20 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-300">Transaction Analysis</span>
              </div>
              <p className="text-xs text-gray-400">
                Understand your transaction history and optimize your payments
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {messages?.map((message, index) => (
            <MessageBubble
              key={index}
              message={message?.content}
              isUser={message?.isUser}
              timestamp={message?.timestamp}
            />
          ))}
          
          {isTyping && (
            <MessageBubble
              message=""
              isTyping={true}
              isUser={false}
              timestamp={new Date()}
            />
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ConversationArea;