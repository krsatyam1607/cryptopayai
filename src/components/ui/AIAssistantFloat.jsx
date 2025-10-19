import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AIAssistantFloat = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
    setHasNewMessage(false);
  };

  const handleOpenAssistant = () => {
    navigate('/assistant');
    setIsExpanded(false);
    setHasNewMessage(false);
  };

  const quickActions = [
    { label: 'Send Payment', icon: 'Send', action: () => navigate('/payments?action=send') },
    { label: 'Check Balance', icon: 'Wallet', action: () => navigate('/dashboard') },
    { label: 'Transaction Help', icon: 'HelpCircle', action: () => navigate('/assistant') },
  ];

  // Don't show on login page or assistant page
  if (location?.pathname === '/login' || location?.pathname === '/assistant') {
    return null;
  }

  return (
    <>
      {/* Expanded Quick Actions Panel */}
      {isExpanded && (
        <>
          <div 
            className="fixed inset-0 bg-background/20 backdrop-blur-sm z-40"
            onClick={() => setIsExpanded(false)}
          />
          <div className="fixed bottom-20 right-6 z-50 bg-surface border border-border rounded-xl shadow-modal p-4 w-64 spring-transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
                className="h-6 w-6"
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
            
            <div className="space-y-2 mb-4">
              {quickActions?.map((action, index) => (
                <button
                  key={index}
                  onClick={action?.action}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-left text-sm hover:bg-muted/50 transition-colors glow-hover"
                >
                  <Icon name={action?.icon} size={16} className="text-primary" />
                  <span className="text-foreground">{action?.label}</span>
                </button>
              ))}
            </div>
            
            <Button
              onClick={handleOpenAssistant}
              className="w-full"
              variant="outline"
            >
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Open Full Assistant
            </Button>
          </div>
        </>
      )}
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* New message indicator */}
          {hasNewMessage && !isExpanded && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse border-2 border-background"></div>
          )}
          
          <Button
            onClick={handleToggleExpanded}
            size="lg"
            className="w-14 h-14 rounded-full shadow-modal glow-hover bg-gradient-to-br from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            <Icon 
              name={isExpanded ? "X" : "Bot"} 
              size={24} 
              className="text-primary-foreground transition-transform duration-200"
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default AIAssistantFloat;