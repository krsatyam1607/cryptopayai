

import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SendPaymentForm = ({ onSendPayment }) => {
  const [formData, setFormData] = useState({
    recipientAddress: '',
    amount: '',
    memo: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const mockUserBalance = 2547.89;

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.recipientAddress?.trim()) {
      newErrors.recipientAddress = 'Wallet address is required';
    } else if (!/^0x[a-fA-F0-9]{40}$/?.test(formData?.recipientAddress)) {
      newErrors.recipientAddress = 'Invalid wallet address format';
    }

    if (!formData?.amount) {
      newErrors.amount = 'Amount is required';
    } else if (parseFloat(formData?.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    } else if (parseFloat(formData?.amount) > mockUserBalance) {
      newErrors.amount = 'Insufficient balance';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const transactionData = {
        ...formData,
        amount: parseFloat(formData?.amount),
        timestamp: new Date()?.toISOString(),
        hash: `0x${Math.random()?.toString(16)?.substr(2, 64)}`,
        status: 'pending'
      };
      
      onSendPayment(transactionData);
      
      // Reset form
      setFormData({
        recipientAddress: '',
        amount: '',
        memo: ''
      });
    } catch (error) {
      setErrors({ submit: 'Transaction failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const formatUSDValue = (usdcAmount) => {
    if (!usdcAmount) return '$0.00';
    return `$${parseFloat(usdcAmount)?.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      {/* Balance Display */}
      <div className="bg-surface/50 border border-border rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="Wallet" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-xl font-bold text-foreground">{mockUserBalance?.toLocaleString()} USDC</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">USD Value</p>
            <p className="text-lg font-semibold text-success">{formatUSDValue(mockUserBalance)}</p>
          </div>
        </div>
      </div>
      {/* Send Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Recipient Wallet Address"
          type="text"
          name="recipientAddress"
          placeholder="0x742d35Cc6634C0532925a3b8D4C2C0c8b2A5d8e9"
          value={formData?.recipientAddress}
          onChange={handleInputChange}
          error={errors?.recipientAddress}
          required
          description="Enter the USDC wallet address of the recipient"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Amount (USDC)"
            type="number"
            name="amount"
            placeholder="0.00"
            value={formData?.amount}
            onChange={handleInputChange}
            error={errors?.amount}
            required
            min="0"
            step="0.000001"
            description="Minimum: 0.000001 USDC"
          />
          
          <div className="flex flex-col justify-end">
            <div className="bg-muted/30 border border-border rounded-lg p-3">
              <p className="text-sm text-muted-foreground mb-1">USD Equivalent</p>
              <p className="text-lg font-semibold text-foreground">
                {formatUSDValue(formData?.amount)}
              </p>
            </div>
          </div>
        </div>

        <Input
          label="Memo (Optional)"
          type="text"
          name="memo"
          placeholder="Payment for services..."
          value={formData?.memo}
          onChange={handleInputChange}
          description="Add a note for this transaction"
        />

        {/* Transaction Preview */}
        {formData?.amount && formData?.recipientAddress && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-primary mb-3 flex items-center">
              <Icon name="Eye" size={16} className="mr-2" />
              Transaction Preview
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-mono text-foreground">{formData?.amount} USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network Fee:</span>
                <span className="font-mono text-foreground">~0.001 USDC</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="text-muted-foreground font-medium">Total:</span>
                <span className="font-mono font-semibold text-foreground">
                  {(parseFloat(formData?.amount || 0) + 0.001)?.toFixed(6)} USDC
                </span>
              </div>
            </div>
          </div>
        )}

        {errors?.submit && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm text-error">{errors?.submit}</p>
            </div>
          </div>
        )}

        <Button
          type="submit"
          loading={isLoading}
          disabled={!formData?.recipientAddress || !formData?.amount || isLoading}
          fullWidth
          iconName="Send"
          iconPosition="left"
        >
          {isLoading ? 'Processing Transaction...' : 'Send Payment'}
        </Button>
      </form>
    </div>
  );
};

export default SendPaymentForm;