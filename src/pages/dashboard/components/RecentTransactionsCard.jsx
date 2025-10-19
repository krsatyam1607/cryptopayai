import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentTransactionsCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const recentTransactions = [
    {
      id: "tx_001",
      type: "sent",
      amount: 150.00,
      currency: "USDC",
      recipient: "0x742d...8f3a",
      recipientName: "Alice Johnson",
      timestamp: new Date(Date.now() - 1800000),
      status: "confirmed",
      hash: "0x8f2a9b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a"
    },
    {
      id: "tx_002", 
      type: "received",
      amount: 75.50,
      currency: "USDC",
      sender: "0x123a...9d2c",
      senderName: "Bob Smith",
      timestamp: new Date(Date.now() - 3600000),
      status: "confirmed",
      hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2"
    },
    {
      id: "tx_003",
      type: "sent",
      amount: 200.00,
      currency: "USDC", 
      recipient: "0x456b...7e1f",
      recipientName: "Carol Davis",
      timestamp: new Date(Date.now() - 7200000),
      status: "pending",
      hash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4"
    },
    {
      id: "tx_004",
      type: "received",
      amount: 325.75,
      currency: "USDC",
      sender: "0x789c...4a8b",
      senderName: "David Wilson",
      timestamp: new Date(Date.now() - 10800000),
      status: "confirmed",
      hash: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6"
    },
    {
      id: "tx_005",
      type: "scheduled",
      amount: 100.00,
      currency: "USDC",
      recipient: "0x987f...2b5c",
      recipientName: "Eva Martinez",
      timestamp: new Date(Date.now() - 14400000),
      status: "processing",
      hash: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8"
    }
  ];

  const getTransactionIcon = (type) => {
    const iconMap = {
      sent: 'ArrowUpRight',
      received: 'ArrowDownLeft', 
      scheduled: 'Clock'
    };
    return iconMap?.[type] || 'ArrowRight';
  };

  const getStatusConfig = (status) => {
    const configs = {
      confirmed: { color: 'text-success', bg: 'bg-success/10', icon: 'CheckCircle' },
      pending: { color: 'text-warning', bg: 'bg-warning/10', icon: 'Clock' },
      processing: { color: 'text-primary', bg: 'bg-primary/10', icon: 'Loader2' },
      failed: { color: 'text-error', bg: 'bg-error/10', icon: 'XCircle' }
    };
    return configs?.[status] || configs?.pending;
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(amount);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString();
  };

  const handleTransactionClick = (transaction) => {
    navigate(`/transactions?id=${transaction?.id}`);
  };

  const handleViewAll = () => {
    navigate('/transactions');
  };

  return (
    <div className="p-6 rounded-xl bg-surface border border-border shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Receipt" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
            <p className="text-sm text-muted-foreground">Last 5 transactions</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewAll}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {isLoading ? (
          // Skeleton loading state
          (Array.from({ length: 5 })?.map((_, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 rounded-lg animate-pulse">
              <div className="w-10 h-10 bg-muted/30 rounded-lg shimmer"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted/30 rounded shimmer w-3/4"></div>
                <div className="h-3 bg-muted/30 rounded shimmer w-1/2"></div>
              </div>
              <div className="text-right space-y-2">
                <div className="h-4 bg-muted/30 rounded shimmer w-20"></div>
                <div className="h-3 bg-muted/30 rounded shimmer w-16"></div>
              </div>
            </div>
          )))
        ) : (
          recentTransactions?.map((transaction) => {
            const statusConfig = getStatusConfig(transaction?.status);
            
            return (
              <div
                key={transaction?.id}
                onClick={() => handleTransactionClick(transaction)}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer glow-hover group"
              >
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${transaction?.type === 'sent' ? 'bg-error/10' : ''}
                  ${transaction?.type === 'received' ? 'bg-success/10' : ''}
                  ${transaction?.type === 'scheduled' ? 'bg-primary/10' : ''}
                `}>
                  <Icon 
                    name={getTransactionIcon(transaction?.type)} 
                    size={18} 
                    className={`
                      ${transaction?.type === 'sent' ? 'text-error' : ''}
                      ${transaction?.type === 'received' ? 'text-success' : ''}
                      ${transaction?.type === 'scheduled' ? 'text-primary' : ''}
                    `}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-foreground capitalize">
                      {transaction?.type}
                    </span>
                    <div className={`
                      flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs
                      ${statusConfig?.bg} ${statusConfig?.color}
                    `}>
                      <Icon 
                        name={statusConfig?.icon} 
                        size={10} 
                        className={transaction?.status === 'processing' ? 'animate-spin' : ''}
                      />
                      <span className="capitalize">{transaction?.status}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {transaction?.type === 'sent' ? 'To: ' : 'From: '}
                    <span className="font-mono">
                      {transaction?.recipientName || transaction?.senderName}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`
                    text-sm font-semibold font-mono
                    ${transaction?.type === 'sent' ? 'text-error' : 'text-success'}
                  `}>
                    {transaction?.type === 'sent' ? '-' : '+'}
                    {formatAmount(transaction?.amount)} {transaction?.currency}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatTimestamp(transaction?.timestamp)}
                  </div>
                </div>
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-foreground transition-colors"
                />
              </div>
            );
          })
        )}
      </div>
      {!isLoading && recentTransactions?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Receipt" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No transactions yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Start by sending or receiving USDC
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentTransactionsCard;