import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIAssistantToggle = () => {
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [hasNewSuggestion, setHasNewSuggestion] = useState(true);
  const navigate = useNavigate();

  const aiSuggestions = [
    "Schedule your monthly rent payment for automatic processing",
    "Your spending pattern suggests setting up a $500 weekly limit",
    "Consider splitting your next large payment into smaller amounts"
  ];

  const currentSuggestion = aiSuggestions?.[0];

  const handleToggleAI = () => {
    setIsAIEnabled(!isAIEnabled);
    if (hasNewSuggestion) {
      setHasNewSuggestion(false);
    }
  };

  const handleOpenAssistant = () => {
    navigate('/assistant');
    setHasNewSuggestion(false);
  };

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-surface to-surface/80 border border-secondary/20 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
              <Icon name="Bot" size={24} className="text-primary-foreground" />
            </div>
            {hasNewSuggestion && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full animate-pulse border-2 border-surface"></div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Assistant</h3>
            <p className="text-sm text-muted-foreground">Smart payment guidance</p>
          </div>
        </div>

        {/* Neon Toggle Switch */}
        <div className="relative">
          <button
            onClick={handleToggleAI}
            className={`
              relative w-14 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50
              ${isAIEnabled 
                ? 'bg-gradient-to-r from-secondary to-primary shadow-glow-emerald' 
                : 'bg-muted border border-border'
              }
            `}
          >
            <div className={`
              absolute top-1 w-6 h-6 rounded-full transition-all duration-300 shadow-lg
              ${isAIEnabled 
                ? 'left-7 bg-white' :'left-1 bg-muted-foreground'
              }
            `}>
              {isAIEnabled && (
                <Icon 
                  name="Zap" 
                  size={12} 
                  className="text-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                />
              )}
            </div>
          </button>
        </div>
      </div>

      {isAIEnabled && (
        <div className="space-y-4">
          {hasNewSuggestion && (
            <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Lightbulb" size={14} className="text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground mb-2">
                    {currentSuggestion}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => setHasNewSuggestion(false)}
                    >
                      Dismiss
                    </Button>
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={handleOpenAssistant}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>AI monitoring active</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenAssistant}
              iconName="MessageSquare"
              iconPosition="left"
            >
              Chat
            </Button>
          </div>
        </div>
      )}

      {!isAIEnabled && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground mb-3">
            Enable AI assistance for smart payment insights
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleAI}
            iconName="Zap"
            iconPosition="left"
          >
            Enable AI
          </Button>
        </div>
      )}
    </div>
  );
};

export default AIAssistantToggle;