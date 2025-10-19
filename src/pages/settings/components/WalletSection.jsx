import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WalletSection = () => {
  const [isReconnecting, setIsReconnecting] = useState(false);

  const walletData = {
    address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    balance: "2,847.50",
    network: "Ethereum Mainnet",
    status: "connected",
    lastSync: "2025-10-18T16:15:00Z"
  };

  const handleReconnect = async () => {
    setIsReconnecting(true);
    // Simulate reconnection
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsReconnecting(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    // You could add a toast notification here
  };

  const formatAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  const formatLastSync = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    return date?.toLocaleString();
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Wallet" size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Wallet Settings</h3>
            <p className="text-sm text-muted-foreground">Manage your Circle wallet connection and details</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={handleReconnect}
          loading={isReconnecting}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Reconnect
        </Button>
      </div>
      <div className="space-y-6">
        {/* Connection Status */}
        <div className="flex items-center justify-between p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
            <div>
              <p className="font-medium text-success">Wallet Connected</p>
              <p className="text-sm text-muted-foreground">Circle account active and verified</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success">Live</span>
          </div>
        </div>

        {/* Wallet Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Wallet Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Wallet Address</label>
            <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg border border-border">
              <span className="font-mono text-sm text-foreground flex-1">
                {formatAddress(walletData?.address)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(walletData?.address)}
                className="h-8 w-8"
              >
                <Icon name="Copy" size={14} />
              </Button>
            </div>
          </div>

          {/* Current Balance */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Current Balance</label>
            <div className="p-3 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary">{walletData?.balance}</span>
                <span className="text-sm text-muted-foreground">USDC</span>
              </div>
            </div>
          </div>

          {/* Network */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Network</label>
            <div className="p-3 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-foreground">{walletData?.network}</span>
              </div>
            </div>
          </div>

          {/* Last Sync */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Last Sync</label>
            <div className="p-3 bg-muted/30 rounded-lg border border-border">
              <span className="text-sm text-foreground">{formatLastSync(walletData?.lastSync)}</span>
            </div>
          </div>
        </div>

        {/* Circle Account Info */}
        <div className="p-4 bg-muted/20 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">Circle Account</h4>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm text-success">Verified</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Account ID:</span>
              <p className="font-mono text-foreground">circle_acc_123456</p>
            </div>
            <div>
              <span className="text-muted-foreground">KYC Status:</span>
              <p className="text-success">Verified</p>
            </div>
            <div>
              <span className="text-muted-foreground">API Version:</span>
              <p className="text-foreground">v1.2.0</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button variant="outline" iconName="ExternalLink" iconPosition="left">
            View on Circle
          </Button>
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Wallet Data
          </Button>
          <Button variant="destructive" iconName="Unlink" iconPosition="left">
            Disconnect Wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WalletSection;