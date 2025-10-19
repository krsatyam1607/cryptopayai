import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  transactionData, 
  type = 'send',
  isLoading = false 
}) => {
  if (!isOpen || !transactionData) return null;

  const getModalTitle = () => {
    switch (type) {
      case 'send':
        return 'Confirm Payment';
      case 'schedule':
        return 'Confirm Scheduled Payment';
      default:
        return 'Confirm Transaction';
    }
  };

  const getModalIcon = () => {
    switch (type) {
      case 'send':
        return 'Send';
      case 'schedule':
        return 'Calendar';
      default:
        return 'CheckCircle';
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-surface border border-border rounded-xl shadow-modal w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Icon name={getModalIcon()} size={20} className="text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">{getModalTitle()}</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              disabled={isLoading}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Transaction Details */}
            <div className="bg-background border border-border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="font-mono text-lg font-semibold text-foreground">
                  {transactionData?.amount} USDC
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">USD Value</span>
                <span className="font-mono text-foreground">
                  ${parseFloat(transactionData?.amount)?.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">To Address</span>
                <span className="font-mono text-sm text-foreground">
                  {formatAddress(transactionData?.recipientAddress)}
                </span>
              </div>

              {type === 'schedule' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Frequency</span>
                    <span className="text-foreground capitalize">{transactionData?.frequency}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Start Date</span>
                    <span className="text-foreground">
                      {new Date(transactionData.startDate)?.toLocaleDateString()}
                    </span>
                  </div>
                </>
              )}

              {transactionData?.memo && (
                <div className="pt-2 border-t border-border">
                  <span className="text-sm text-muted-foreground block mb-1">Memo</span>
                  <span className="text-sm text-foreground">{transactionData?.memo}</span>
                </div>
              )}
            </div>

            {/* Fee Information */}
            <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-warning mt-0.5" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network Fee:</span>
                    <span className="font-mono text-foreground">~0.001 USDC</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">Total Cost:</span>
                    <span className="font-mono text-foreground">
                      {(parseFloat(transactionData?.amount) + 0.001)?.toFixed(6)} USDC
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-error/5 border border-error/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Shield" size={16} className="text-error mt-0.5" />
                <div className="text-sm">
                  <p className="text-error font-medium mb-1">Security Notice</p>
                  <p className="text-muted-foreground">
                    {type === 'schedule' ?'Scheduled payments will execute automatically. Ensure sufficient balance is maintained.' :'This transaction cannot be reversed. Please verify all details before confirming.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              loading={isLoading}
              disabled={isLoading}
              fullWidth
              iconName={type === 'schedule' ? 'Calendar' : 'Send'}
              iconPosition="left"
            >
              {isLoading 
                ? (type === 'schedule' ? 'Scheduling...' : 'Sending...') 
                : (type === 'schedule' ? 'Schedule Payment' : 'Send Payment')
              }
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentConfirmationModal;