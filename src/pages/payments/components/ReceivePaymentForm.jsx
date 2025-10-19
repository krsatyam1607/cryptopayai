import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ReceivePaymentForm = () => {
  const [requestAmount, setRequestAmount] = useState('');
  const [requestMemo, setRequestMemo] = useState('');
  const [copied, setCopied] = useState(false);

  const mockWalletAddress = '0x742d35Cc6634C0532925a3b8D4C2C0c8b2A5d8e9';

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard?.writeText(mockWalletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const generateQRCode = () => {
    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
    const params = new URLSearchParams({
      size: '200x200',
      data: mockWalletAddress,
      bgcolor: '0f0f0f',
      color: '22d3ee'
    });
    return `${baseUrl}?${params?.toString()}`;
  };

  const generatePaymentRequest = () => {
    const amount = parseFloat(requestAmount);
    if (!amount || amount <= 0) return;

    const requestData = {
      address: mockWalletAddress,
      amount: amount,
      memo: requestMemo,
      timestamp: new Date()?.toISOString()
    };

    // In a real app, this would generate a shareable link or QR code
    const requestUrl = `cryptopayai://pay?address=${mockWalletAddress}&amount=${amount}&memo=${encodeURIComponent(requestMemo)}`;
    
    navigator.clipboard?.writeText(requestUrl);
    alert('Payment request link copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Wallet Address Section */}
      <div className="bg-surface/50 border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Wallet" size={20} className="mr-2 text-primary" />
          Your USDC Wallet Address
        </h3>
        
        <div className="space-y-4">
          <div className="bg-background border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Wallet Address</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyAddress}
                iconName={copied ? "Check" : "Copy"}
                iconPosition="left"
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <p className="font-mono text-sm text-foreground break-all bg-muted/30 p-3 rounded-lg">
              {mockWalletAddress}
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-xl">
              <img
                src={generateQRCode()}
                alt="QR code for wallet address 0x742d35Cc6634C0532925a3b8D4C2C0c8b2A5d8e9"
                className="w-48 h-48"
                loading="lazy"
              />
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Share this QR code or address to receive USDC payments
            </p>
          </div>
        </div>
      </div>
      {/* Payment Request Generator */}
      <div className="bg-surface/50 border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Link" size={20} className="mr-2 text-secondary" />
          Generate Payment Request
        </h3>

        <div className="space-y-4">
          <Input
            label="Request Amount (USDC)"
            type="number"
            placeholder="0.00"
            value={requestAmount}
            onChange={(e) => setRequestAmount(e?.target?.value)}
            min="0"
            step="0.000001"
            description="Specify the amount you want to request"
          />

          <Input
            label="Payment Description (Optional)"
            type="text"
            placeholder="Invoice #1234, Service payment..."
            value={requestMemo}
            onChange={(e) => setRequestMemo(e?.target?.value)}
            description="Add a description for this payment request"
          />

          {requestAmount && parseFloat(requestAmount) > 0 && (
            <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-secondary mb-3 flex items-center">
                <Icon name="Receipt" size={16} className="mr-2" />
                Request Preview
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Requested Amount:</span>
                  <span className="font-mono text-foreground">{requestAmount} USDC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">USD Value:</span>
                  <span className="font-mono text-foreground">${parseFloat(requestAmount)?.toFixed(2)}</span>
                </div>
                {requestMemo && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Description:</span>
                    <span className="text-foreground text-right max-w-48 truncate">{requestMemo}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <Button
            onClick={generatePaymentRequest}
            disabled={!requestAmount || parseFloat(requestAmount) <= 0}
            fullWidth
            variant="outline"
            iconName="Share"
            iconPosition="left"
          >
            Generate Payment Request
          </Button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant="ghost"
          onClick={handleCopyAddress}
          iconName="Copy"
          iconPosition="left"
          className="h-12"
        >
          Copy Address
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => window.print()}
          iconName="Printer"
          iconPosition="left"
          className="h-12"
        >
          Print QR Code
        </Button>
      </div>
    </div>
  );
};

export default ReceivePaymentForm;