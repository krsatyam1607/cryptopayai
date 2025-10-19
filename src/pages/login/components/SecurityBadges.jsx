import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      label: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'Lock',
      label: 'Secure Wallet',
      description: 'Circle DCW protected'
    },
    {
      icon: 'CheckCircle',
      label: 'Verified',
      description: 'Blockchain verified'
    }
  ];

  return (
    <div className="flex items-center justify-center space-x-6 mt-8">
      {securityFeatures?.map((feature, index) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-success/10 border border-success/20 flex items-center justify-center">
            <Icon name={feature?.icon} size={16} className="text-success" />
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-foreground">{feature?.label}</div>
            <div className="text-xs text-muted-foreground">{feature?.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecurityBadges;