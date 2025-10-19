import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-modal">
            <Icon name="Zap" size={32} className="text-primary-foreground" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-background">
            <Icon name="CheckCircle" size={12} className="text-background" />
          </div>
        </div>
      </div>

      {/* Title and Description */}
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Welcome to CryptoPayAI
      </h1>
      <p className="text-muted-foreground text-lg mb-2">
        AI-powered USDC payment management
      </p>
      <p className="text-sm text-muted-foreground">
        Secure • Automated • Intelligent
      </p>

      {/* Version Badge */}
      <div className="inline-flex items-center space-x-2 mt-4 px-3 py-1 bg-muted/20 rounded-full">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        <span className="text-xs font-mono text-muted-foreground">v2.1.0 • Live</span>
      </div>
    </div>
  );
};

export default LoginHeader;