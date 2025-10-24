import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

import AssistantHeader from './components/AssistantHeader';
import ConversationArea from './components/ConversationArea';
import QuickSuggestions from './components/QuickSuggestions';
import ChatInput from './components/ChatInput';

const Assistant = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  // ✅ AI response library
  const mockResponses = {
    schedule: [
      "You can schedule recurring USDC payments. Do you want me to guide you?",
      "Recurring payments are easy to set up. Should I show you how?",
      "I can help you automate monthly USDC transfers. Do you want to proceed?",
      "You can schedule payments in advance. Want me to take you there?"
    ],
    transaction: [
      "Your last payment of 250 USDC was successful. Do you want details?",
      "Transaction confirmed. Fee was 0.15 USDC. Need more info?",
      "You sent 250 USDC. Do you want a summary of recent transactions?",
      "All recent transactions are complete. Should I review them for you?"
    ],
    security: [
      "Your wallet is secure. Multi-signature and 2FA are enabled. Want to update recovery options?",
      "Security looks good. Do you want tips for added protection?",
      "Setup is safe. Should I guide you to improve security further?",
      "2FA and hardware wallet are active. Do you want to check recovery settings?"
    ],
    education: [
      "Double-check addresses before sending and start small with new recipients.",
      "Use Polygon for lower fees and always verify the recipient.",
      "Keep recovery phrases offline and test with small transfers first.",
      "Batch small payments and keep offline backups of your keys."
    ],
    optimization: [
      "You can save fees by batching payments or using Polygon. Want me to optimize the next transfer?",
      "Combine smaller transfers to reduce costs.",
      "I can suggest cheaper times or chains for transfers. Do you want that?",
      "Optimizing payment timing can save fees. Shall I do it?"
    ],
    fees: [
      "Network fees are low. Circle charges nothing. Polygon is cheaper for small transfers.",
      "Fees are minimal. Want me to track them for you?",
      "Circle doesn’t charge fees. Only network gas applies.",
      "Using Polygon can reduce costs further. Want me to guide you?"
    ],
    general: [
      "Got it. What would you like me to do next?",
      "Sure, what’s next?",
      "No problem. Should I proceed?",
      "Understood. Do you want me to handle it?"
    ],
    fallback: [
      "I didn’t quite catch that. Can you rephrase?",
      "I’m not sure I understand. Can you give more info?",
      "I can help with payments, security, or tips. What do you need?",
      "Could you clarify your request so I can assist?"
    ]
  };

  // ✅ Generate concise AI response
  const generateAIResponse = (userMessage) => {
    const message = userMessage?.toLowerCase();

    if (message.includes('schedule') || message.includes('recurring')) 
      return mockResponses.schedule[Math.floor(Math.random() * mockResponses.schedule.length)];

    if (message.includes('transaction') || message.includes('explain') || message.includes('recent')) 
      return mockResponses.transaction[Math.floor(Math.random() * mockResponses.transaction.length)];

    if (message.includes('security') || message.includes('safe') || message.includes('protected')) 
      return mockResponses.security[Math.floor(Math.random() * mockResponses.security.length)];

    if (message.includes('best practice') || message.includes('usdc') || message.includes('tip')) 
      return mockResponses.education[Math.floor(Math.random() * mockResponses.education.length)];

    if (message.includes('optimization') || message.includes('optimize') || message.includes('save fee')) 
      return mockResponses.optimization[Math.floor(Math.random() * mockResponses.optimization.length)];

    if (message.includes('fee') || message.includes('cost') || message.includes('gas')) 
      return mockResponses.fees[Math.floor(Math.random() * mockResponses.fees.length)];

    if (message.includes('hi') || message.includes('hello') || message.includes('hey')) 
      return "Hello! How can I help with your USDC today?";

    if (message.includes('thanks') || message.includes('thank you')) 
      return "You're welcome. Let me know if you need anything else.";

    return mockResponses.fallback[Math.floor(Math.random() * mockResponses.fallback.length)];
  };

  // ✅ Handle sending a message
  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      content: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setShowSuggestions(false);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        content: generateAIResponse(messageText),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

      if (isVoiceEnabled && aiResponse.content) {
        const utterance = new SpeechSynthesisUtterance(aiResponse.content);
        utterance.lang = 'en-US';
        utterance.rate = 1;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }
    }, 1000 + Math.random() * 500);
  };

  // ✅ Voice Input
  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      handleSendMessage(text);
    };

    recognition.onerror = (event) => console.error('Voice error:', event.error);
    recognition.start();
    recognitionRef.current = recognition;
  };

  const handleSuggestionClick = (text) => handleSendMessage(text);

  // ✅ Clear chat: remove history, show suggestions
  const handleClearChat = () => {
    setMessages([]);
    setIsTyping(false);
    setShowSuggestions(true);
    localStorage.removeItem('assistant-messages'); // remove saved chat
  };

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  // ✅ Load saved messages (if any)
  useEffect(() => {
    const savedMessages = localStorage.getItem('assistant-messages');
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      setMessages(parsed);
      if (parsed?.length > 0) setShowSuggestions(false);
    }
  }, []);

  useEffect(() => {
    if (messages?.length > 0)
      localStorage.setItem('assistant-messages', JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-100">
      <Header />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={toggleSidebar} />

      <main className={`${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} transition-all duration-300 ease-in-out`}>
        <div className="flex flex-col h-screen pt-16">
          <AssistantHeader
            onClearChat={handleClearChat}
            messageCount={messages?.length}
            isVoiceEnabled={isVoiceEnabled}
            onToggleVoice={() => setIsVoiceEnabled(!isVoiceEnabled)}
          />

          <ConversationArea messages={messages} isTyping={isTyping} />

          <div className="border-t border-gray-700 bg-gray-900/50 p-6">
            <QuickSuggestions
              onSuggestionClick={handleSuggestionClick}
              isVisible={showSuggestions && messages?.length === 0}
            />

            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isTyping}
              onVoiceInput={startVoiceInput}
            />

            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                AI responses are for guidance only. Always verify transaction details before confirming payments.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Assistant;
