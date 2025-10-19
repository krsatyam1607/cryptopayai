import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CreateAccountLink = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    // In a real app, this would navigate to signup page
    // For demo purposes, we'll show an alert alert('Account creation would redirect to signup page in production');
  };

  return (
    <div className="text-center mt-8 p-4 border border-border rounded-lg bg-surface/50">
      <p className="text-sm text-muted-foreground mb-3">
        Don't have an account yet?
      </p>
      <button
        onClick={handleCreateAccount}
        className="inline-flex items-center space-x-2 text-secondary hover:text-secondary/80 transition-colors font-medium"
      >
        <Icon name="UserPlus" size={16} />
        <span>Create Account</span>
        <Icon name="ArrowRight" size={14} />
      </button>
      
      <div className="mt-3 text-xs text-muted-foreground">
        Join thousands of users managing USDC payments with AI
      </div>
    </div>
  );
};

export default CreateAccountLink;