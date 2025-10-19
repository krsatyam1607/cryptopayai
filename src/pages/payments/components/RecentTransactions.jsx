import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentTransactions = () => {
  const navigate = useNavigate();

  const mockTransactions = [
    {
      id: 'tx_001',
      type: 'sent',
      amount: 150.50,
      recipient: '0x742d35Cc6634C0532925a3b8D4C2C0c8b2A5d8e9',
      recipientName: 'Alice Johnson',
      timestamp: new Date(Date.now() - 3600000)?.toISOString(),
      status: 'confirmed',
      hash: '0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
      memo: 'Freelance payment'
    },
    {
      id: 'tx_002',
      type: 'received',
      amount: 75.25,
      sender: '0x9876543210abcdef9876543210abcdef98765432',
      senderName: 'Bob Smith',
      timestamp: new Date(Date.now() - 7200000)?.toISOString(),
      status: 'confirmed',
      hash: '0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567a',
      memo: 'Service payment'
    },
    {
      id: 'tx_003',
      type: 'sent',
      amount: 200.00,
      recipient: '0x1234567890abcdef1234567890abcdef12345678',
      recipientName: 'Carol Davis',
      timestamp: new Date(Date.now() - 14400000)?.toISOString(),
      status: 'pending',
      hash: '0xc3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2',
      memo: 'Monthly subscription'
    }
  ];

  const getTransactionIcon = (type, status) => {
    if (status === 'pending') return 'Clock';
    return type === 'sent' ? 'ArrowUpRight' : 'ArrowDownLeft';
  };

  const getTransactionColor = (type, status) => {
    if (status === 'pending') return 'text-warning';
    return type === 'sent' ? 'text-error' : 'text-success';
  };

  const formatAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div className="bg-surface/50 border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="History" size={20} className="mr-2 text-primary" />
          Recent Transactions
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/transactions')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {mockTransactions?.map((transaction) => (
          <div
            key={transaction?.id}
            className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
            onClick={() => navigate(`/transactions?id=${transaction?.id}`)}
          >
            <div className="flex items-center space-x-4">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${transaction?.type === 'sent' ?'bg-error/10 border border-error/20' :'bg-success/10 border border-success/20'
                }
              `}>
                <Icon 
                  name={getTransactionIcon(transaction?.type, transaction?.status)} 
                  size={20} 
                  className={getTransactionColor(transaction?.type, transaction?.status)}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-sm font-medium text-foreground">
                    {transaction?.type === 'sent' ? 'Sent to' : 'Received from'}
                  </p>
                  <span className={`
                    text-xs px-2 py-1 rounded-full font-medium
                    ${transaction?.status === 'confirmed' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                    }
                  `}>
                    {transaction?.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>
                    {transaction?.type === 'sent' 
                      ? transaction?.recipientName || formatAddress(transaction?.recipient)
                      : transaction?.senderName || formatAddress(transaction?.sender)
                    }
                  </span>
                  <span>•</span>
                  <span>{formatTime(transaction?.timestamp)}</span>
                </div>
                
                {transaction?.memo && (
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {transaction?.memo}
                  </p>
                )}
              </div>
            </div>

            <div className="text-right">
              <p className={`
                font-mono font-semibold
                ${getTransactionColor(transaction?.type, transaction?.status)}
              `}>
                {transaction?.type === 'sent' ? '-' : '+'}{transaction?.amount} USDC
              </p>
              <p className="text-xs text-muted-foreground">
                ${transaction?.amount?.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      {mockTransactions?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Receipt" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No recent transactions</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your payment history will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;