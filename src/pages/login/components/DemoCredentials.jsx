import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DemoCredentials = () => {
  const [isVisible, setIsVisible] = useState(false);

  const demoCredentials = {
    email: 'demo@cryptopayai.com',
    password: 'demo123'
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    // In a real app, you might show a toast notification
  };

  return (
    <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Demo Access</span>
        </div>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => setIsVisible(!isVisible)}
          iconName={isVisible ? "EyeOff" : "Eye"}
          iconPosition="left"
        >
          {isVisible ? 'Hide' : 'Show'}
        </Button>
      </div>
      {isVisible && (
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-background/50 rounded border">
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="text-sm font-mono text-foreground">{demoCredentials?.email}</div>
            </div>
            <button
              onClick={() => copyToClipboard(demoCredentials?.email)}
              className="p-1 hover:bg-muted/50 rounded transition-colors"
            >
              <Icon name="Copy" size={14} className="text-muted-foreground" />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-background/50 rounded border">
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">Password</div>
              <div className="text-sm font-mono text-foreground">{demoCredentials?.password}</div>
            </div>
            <button
              onClick={() => copyToClipboard(demoCredentials?.password)}
              className="p-1 hover:bg-muted/50 rounded transition-colors"
            >
              <Icon name="Copy" size={14} className="text-muted-foreground" />
            </button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            Use these credentials to explore the full CryptoPayAI experience
          </p>
        </div>
      )}
    </div>
  );
};

export default DemoCredentials;