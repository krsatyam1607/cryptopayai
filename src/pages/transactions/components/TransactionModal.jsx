import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import TransactionStatusIndicator from '../../../components/ui/TransactionStatusIndicator';

const TransactionModal = ({ transaction, isOpen, onClose }) => {
  if (!isOpen || !transaction) return null;

  const formatDate = (date) => {
    return new Date(date)?.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    })?.format(amount);
  };

  const getTypeIcon = (type) => {
    const icons = {
      sent: 'ArrowUpRight',
      received: 'ArrowDownLeft',
      recurring: 'RotateCcw'
    };
    return icons?.[type] || 'ArrowRight';
  };

  const getTypeColor = (type) => {
    const colors = {
      sent: 'text-error',
      received: 'text-success',
      recurring: 'text-primary'
    };
    return colors?.[type] || 'text-foreground';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  const openBlockchainExplorer = () => {
    // Mock blockchain explorer URL
    window.open(`https://etherscan.io/tx/${transaction?.hash}`, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-surface border border-border rounded-xl shadow-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${transaction?.type === 'sent' ? 'bg-error/10' : ''}
                ${transaction?.type === 'received' ? 'bg-success/10' : ''}
                ${transaction?.type === 'recurring' ? 'bg-primary/10' : ''}
              `}>
                <Icon 
                  name={getTypeIcon(transaction?.type)} 
                  size={20} 
                  className={getTypeColor(transaction?.type)}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground capitalize">
                  {transaction?.type} Transaction
                </h2>
                <p className="text-sm text-muted-foreground">
                  Transaction Details
                </p>
              </div>
            </div>
            
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Amount & Status */}
            <div className="text-center py-6 bg-muted/20 rounded-lg">
              <div className="text-3xl font-bold font-mono text-foreground mb-2">
                {formatAmount(transaction?.amount)} USDC
              </div>
              <TransactionStatusIndicator 
                status={transaction?.status}
                timestamp={transaction?.date}
                amount={transaction?.amount}
                hash={transaction?.hash}
              />
            </div>

            {/* Transaction Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Transaction Date
                  </label>
                  <div className="text-foreground">
                    {formatDate(transaction?.date)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Transaction Type
                  </label>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getTypeIcon(transaction?.type)} 
                      size={16} 
                      className={getTypeColor(transaction?.type)}
                    />
                    <span className="text-foreground capitalize">
                      {transaction?.type}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Network Fee
                  </label>
                  <div className="font-mono text-foreground">
                    {transaction?.networkFee || '0.001'} ETH
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    {transaction?.type === 'sent' ? 'Recipient Address' : 'Sender Address'}
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm text-foreground bg-muted/30 px-3 py-2 rounded flex-1">
                      {transaction?.address}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(transaction?.address)}
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Transaction Hash
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm text-foreground bg-muted/30 px-3 py-2 rounded flex-1">
                      {transaction?.hash}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(transaction?.hash)}
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Block Number
                  </label>
                  <div className="font-mono text-foreground">
                    {transaction?.blockNumber || '18,542,891'}
                  </div>
                </div>
              </div>
            </div>

            {/* Memo */}
            {transaction?.memo && (
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Transaction Memo
                </label>
                <div className="bg-muted/20 rounded-lg p-4">
                  <p className="text-foreground">{transaction?.memo}</p>
                </div>
              </div>
            )}

            {/* Recurring Details */}
            {transaction?.type === 'recurring' && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2 flex items-center">
                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  Recurring Payment Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Frequency:</span>
                    <span className="text-foreground ml-2">{transaction?.frequency || 'Monthly'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Next Payment:</span>
                    <span className="text-foreground ml-2">{transaction?.nextPayment || 'Nov 18, 2025'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={openBlockchainExplorer}
                className="flex-1"
              >
                <Icon name="ExternalLink" size={16} className="mr-2" />
                View on Blockchain
              </Button>
              
              <Button
                variant="outline"
                onClick={() => copyToClipboard(transaction?.hash)}
                className="flex-1"
              >
                <Icon name="Download" size={16} className="mr-2" />
                Export Receipt
              </Button>
              
              {transaction?.type === 'recurring' && (
                <Button
                  variant="outline"
                  className="flex-1"
                >
                  <Icon name="Settings" size={16} className="mr-2" />
                  Manage Schedule
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionModal;