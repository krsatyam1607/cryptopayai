import React from 'react';
import Icon from '../AppIcon';

const TransactionStatusIndicator = ({ 
  status = 'pending', 
  amount, 
  currency = 'USDC', 
  timestamp, 
  hash,
  size = 'default' 
}) => {
  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        icon: 'Clock',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/20',
        label: 'Pending',
        description: 'Transaction processing'
      },
      confirmed: {
        icon: 'CheckCircle',
        color: 'text-success',
        bgColor: 'bg-success/10',
        borderColor: 'border-success/20',
        label: 'Confirmed',
        description: 'Transaction completed'
      },
      failed: {
        icon: 'XCircle',
        color: 'text-error',
        bgColor: 'bg-error/10',
        borderColor: 'border-error/20',
        label: 'Failed',
        description: 'Transaction failed'
      },
      processing: {
        icon: 'Loader2',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        borderColor: 'border-primary/20',
        label: 'Processing',
        description: 'Confirming on blockchain'
      }
    };
    return configs?.[status] || configs?.pending;
  };

  const config = getStatusConfig(status);
  const isSmall = size === 'small';
  const isProcessing = status === 'processing';

  const formatAmount = (amount) => {
    if (!amount) return '';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    })?.format(amount);
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp)?.toLocaleString();
  };

  const truncateHash = (hash) => {
    if (!hash) return '';
    return `${hash?.slice(0, 6)}...${hash?.slice(-4)}`;
  };

  return (
    <div className={`
      flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200
      ${config?.bgColor} ${config?.borderColor}
      ${isSmall ? 'p-3' : 'p-4'}
    `}>
      {/* Status Icon */}
      <div className={`
        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
        ${config?.bgColor} ${config?.borderColor} border
        ${isSmall ? 'w-8 h-8' : 'w-10 h-10'}
      `}>
        <Icon 
          name={config?.icon} 
          size={isSmall ? 16 : 20} 
          className={`${config?.color} ${isProcessing ? 'animate-spin' : ''}`}
        />
      </div>
      {/* Transaction Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className={`
            font-semibold ${config?.color}
            ${isSmall ? 'text-sm' : 'text-base'}
          `}>
            {config?.label}
          </span>
          
          {amount && (
            <span className={`
              font-mono font-medium text-foreground
              ${isSmall ? 'text-sm' : 'text-base'}
            `}>
              {formatAmount(amount)} {currency}
            </span>
          )}
        </div>
        
        <p className={`
          text-muted-foreground
          ${isSmall ? 'text-xs' : 'text-sm'}
        `}>
          {config?.description}
        </p>
        
        {/* Additional Info */}
        <div className={`
          flex items-center justify-between mt-2 text-xs text-muted-foreground
          ${isSmall ? 'mt-1' : 'mt-2'}
        `}>
          {timestamp && (
            <span>{formatTimestamp(timestamp)}</span>
          )}
          
          {hash && (
            <span className="font-mono bg-muted/30 px-2 py-1 rounded">
              {truncateHash(hash)}
            </span>
          )}
        </div>
      </div>
      {/* Action Indicator */}
      {status === 'confirmed' && (
        <div className="flex-shrink-0">
          <Icon name="ExternalLink" size={16} className="text-muted-foreground hover:text-foreground cursor-pointer" />
        </div>
      )}
    </div>
  );
};

export default TransactionStatusIndicator;