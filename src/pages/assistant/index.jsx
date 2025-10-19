import React, { useState, useEffect } from 'react';
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
  const navigate = useNavigate();

  // Mock AI responses for different query types
  const mockResponses = {
    schedule: `I can help you schedule payments! Here's how to set up recurring USDC payments:

1. **Monthly Payments**: Go to Payments → Schedule → Select "Monthly"
2. **Set Amount**: Enter your USDC amount (minimum 1 USDC)
3. **Choose Date**: Pick your preferred payment date (1st-28th of month)
4. **Add Recipient**: Enter the wallet address or select from contacts

**Pro Tips:**
• Schedule payments 2-3 days before due dates for processing time
• Use our smart scheduling to optimize gas fees
• Set up notifications to track payment status

Would you like me to guide you to the payments page to set this up?`,

    transaction: `Let me explain your recent transaction activity:

**Last Transaction Analysis:**
• **Amount**: 250.00 USDC
• **Type**: Sent Payment
• **Status**: Confirmed ✅
• **Fee**: 0.15 USDC (Gas optimization saved 40%)
• **Confirmation Time**: 2 minutes 34 seconds

**Transaction Breakdown:**
1. **Network Fee**: Paid to Ethereum validators
2. **Processing**: Circle's USDC smart contract execution
3. **Confirmation**: 12 block confirmations for security

**Optimization Suggestions:**
• Your transaction was sent during low-traffic hours (saved $2.30)
• Consider batching smaller payments to reduce fees
• Use our fee predictor for optimal timing

Need help understanding any specific transaction? Share the transaction hash!`,

    security: `Your wallet security looks good! Here's your current security status:

**Security Score: 8.5/10** 🛡️

**Active Protections:**
✅ **Multi-signature enabled** (2-of-3 setup)
✅ **Hardware wallet connected** (Ledger Nano X)
✅ **Transaction limits set** (Max: 1,000 USDC/day)
✅ **Email notifications active**
✅ **2FA authentication enabled**

**Recommendations:**
⚠️ **Update recovery phrase backup** (Last updated 45 days ago)
⚠️ **Enable biometric authentication** for mobile access

**Best Practices:**
• Never share your private keys or seed phrase
• Always verify recipient addresses before sending
• Use our address book for frequent recipients
• Enable transaction confirmations for amounts &gt; 100 USDC

Want me to guide you through updating your security settings?`,

    education: `Here are essential USDC best practices for safe and efficient transactions:

**💰 USDC Fundamentals:**
• **Stability**: 1 USDC = 1 USD (backed by US dollar reserves)
• **Network**: Runs on Ethereum, Polygon, and other blockchains
• **Regulation**: Issued by Circle, regulated and audited monthly

**🚀 Transaction Best Practices:**
1. **Double-check addresses** - Transactions are irreversible
2. **Start small** - Test with small amounts for new recipients
3. **Gas optimization** - Use our fee predictor for best rates
4. **Timing matters** - Avoid peak hours (6-9 PM EST) for lower fees

**🔒 Security Guidelines:**
• Use hardware wallets for large amounts (&gt;$1,000)
• Enable transaction limits and notifications
• Keep recovery phrases offline and secure
• Verify smart contract addresses before interacting

**💡 Pro Tips:**
• Batch multiple payments to save on gas fees
• Use our scheduling feature for recurring payments
• Monitor Circle's reserve reports for transparency
• Consider Layer 2 solutions (Polygon) for micro-transactions

Need specific guidance on any of these topics?`,

    optimization: `Here are personalized optimization tips based on your payment patterns:

**📊 Your Payment Analysis:**
• **Average transaction**: 185 USDC
• **Frequency**: 12 payments/month
• **Peak activity**: Weekday mornings
• **Total fees paid**: 8.45 USDC (last 30 days)

**💡 Optimization Opportunities:**

**1. Fee Reduction (Save ~35%)**
• Batch payments on Tuesdays/Wednesdays (lowest gas)
• Use our "Smart Timing" feature for automatic optimization
• Consider Polygon network for amounts &lt; 50 USDC

**2. Scheduling Efficiency**
• Set up 3 recurring payments instead of 12 individual ones
• Use our bulk payment feature for multiple recipients
• Enable "Gas Price Alerts" for optimal timing

**3. Workflow Improvements**
• Create payment templates for frequent amounts
• Use address book to avoid typing errors
• Enable quick-send for trusted recipients

**💰 Potential Monthly Savings: $12-18**

**Next Steps:**
1. Review your payment patterns in Transactions
2. Set up recurring payments for regular expenses
3. Enable smart timing for all future payments

Want me to help you implement any of these optimizations?`,

    fees: `Let me break down USDC transaction fees and how to minimize them:

**🔍 Fee Structure Breakdown:**

**Network Fees (Gas):**
• **Base fee**: 15-50 Gwei (varies by network congestion)
• **Priority fee**: 1-5 Gwei (for faster processing)
• **Typical cost**: $0.50-$3.00 per transaction

**Circle USDC Fees:**
• **Minting/Burning**: Free (when using Circle account)
• **Transfer fees**: Only network gas fees apply
• **No additional service fees** for standard transfers

**💰 Fee Optimization Strategies:**

**1. Timing Optimization:**
• **Cheapest**: Weekends, early mornings (2-6 AM EST)
• **Most expensive**: Weekdays 6-9 PM EST
• **Average savings**: 40-60% with optimal timing

**2. Network Selection:**
• **Ethereum**: Most secure, higher fees ($1-5)
• **Polygon**: Faster, cheaper ($0.01-0.10)
• **Arbitrum**: Good balance ($0.10-0.50)

**3. Transaction Batching:**
• Combine multiple payments into one transaction
• Use our bulk payment feature
• Save 70-80% on fees for multiple recipients

**📱 Tools to Help:**
• Gas price tracker in your dashboard
• Smart timing recommendations
• Fee calculator for different networks

**Your Recent Fee Performance:**
• Average fee: $1.23 (15% below network average)
• Optimal timing usage: 67%
• Potential additional savings: $4.50/month

Need help setting up fee optimization alerts?`
  };

  // Simulate AI response based on message content
  const generateAIResponse = (userMessage) => {
    const message = userMessage?.toLowerCase();
    
    if (message?.includes('schedule') || message?.includes('recurring') || message?.includes('monthly')) {
      return mockResponses?.schedule;
    } else if (message?.includes('transaction') || message?.includes('explain') || message?.includes('last')) {
      return mockResponses?.transaction;
    } else if (message?.includes('security') || message?.includes('safe') || message?.includes('protect')) {
      return mockResponses?.security;
    } else if (message?.includes('best practice') || message?.includes('usdc') || message?.includes('guide')) {
      return mockResponses?.education;
    } else if (message?.includes('optimization') || message?.includes('optimize') || message?.includes('improve')) {
      return mockResponses?.optimization;
    } else if (message?.includes('fee') || message?.includes('cost') || message?.includes('gas')) {
      return mockResponses?.fees;
    } else {
      return `I understand you're asking about "${userMessage}". I can help you with:

• **Payment scheduling** and recurring transfers
• **Transaction explanations** and history analysis  
• **Wallet security** and best practices
• **USDC education** and blockchain concepts
• **Fee optimization** and cost reduction
• **Payment workflows** and automation

Could you be more specific about what you'd like to know? For example:
- "How do I schedule monthly payments?"
- "Explain my last transaction" -"What are USDC best practices?" -"How can I reduce transaction fees?"`;
    }
  };

  const handleSendMessage = async (messageText) => {
    // Add user message
    const userMessage = {
      content: messageText,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setShowSuggestions(false);
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = {
        content: generateAIResponse(messageText),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // 1.5-2.5 second delay
  };

  const handleSuggestionClick = (suggestionText) => {
    handleSendMessage(suggestionText);
  };

  const handleClearChat = () => {
    setMessages([]);
    setShowSuggestions(true);
    setIsTyping(false);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Load conversation history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('assistant-messages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
        if (parsedMessages?.length > 0) {
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error('Failed to load conversation history:', error);
      }
    }
  }, []);

  // Save conversation history to localStorage
  useEffect(() => {
    if (messages?.length > 0) {
      localStorage.setItem('assistant-messages', JSON.stringify(messages));
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-100">
      <Header />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={toggleSidebar} />
      <main className={`
        transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
      `}>
        <div className="flex flex-col h-screen pt-16">
          {/* Assistant Header */}
          <AssistantHeader 
            onClearChat={handleClearChat}
            messageCount={messages?.length}
          />

          {/* Conversation Area */}
          <ConversationArea 
            messages={messages}
            isTyping={isTyping}
          />

          {/* Input Area */}
          <div className="border-t border-gray-700 bg-gray-900/50 p-6">
            {/* Quick Suggestions */}
            <QuickSuggestions 
              onSuggestionClick={handleSuggestionClick}
              isVisible={showSuggestions && messages?.length === 0}
            />

            {/* Chat Input */}
            <ChatInput 
              onSendMessage={handleSendMessage}
              isLoading={isTyping}
            />

            {/* Disclaimer */}
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                AI responses are for guidance only. Always verify transaction details before confirming payments.
              </p>
            </div>
          </div>
        </div>
      </main>
      {/* Don't show floating assistant on assistant page */}
    </div>
  );
};

export default Assistant;