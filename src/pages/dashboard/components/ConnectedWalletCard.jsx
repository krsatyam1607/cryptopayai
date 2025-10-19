import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConnectedWalletCard = () => {
  const [showDetails, setShowDetails] = useState(false);

  const walletInfo = {
    address: "0x742d35Cc6634C0532925a3b8F39319C1e311f8f3a",
    network: "Ethereum Mainnet",
    provider: "Circle DCW",
    connectionStatus: "connected",
    lastSync: new Date(Date.now() - 300000),
    gasBalance: 0.0234,
    networkFee: "Low"
  };

  const formatAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    return timestamp?.toLocaleTimeString();
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard?.writeText(text);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="p-6 rounded-xl bg-surface border border-border shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Link" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Connected Wallet</h3>
            <p className="text-sm text-muted-foreground">{walletInfo?.provider}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-success font-medium capitalize">
            {walletInfo?.connectionStatus}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {/* Wallet Address */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50">
          <div className="flex items-center space-x-3">
            <Icon name="Wallet" size={16} className="text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">Wallet Address</p>
              <p className="text-xs font-mono text-muted-foreground">
                {showDetails ? walletInfo?.address : formatAddress(walletInfo?.address)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDetails(!showDetails)}
              className="h-8 w-8"
            >
              <Icon name={showDetails ? "EyeOff" : "Eye"} size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(walletInfo?.address)}
              className="h-8 w-8"
            >
              <Icon name="Copy" size={14} />
            </Button>
          </div>
        </div>

        {/* Network Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Network</p>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm font-medium text-foreground">
                {walletInfo?.network}
              </span>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Gas Balance</p>
            <span className="text-sm font-medium text-foreground font-mono">
              {walletInfo?.gasBalance} ETH
            </span>
          </div>
        </div>

        {/* Network Status */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Network fees: {walletInfo?.networkFee}
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Synced {formatTimestamp(walletInfo?.lastSync)}
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border/50">
        <Button
          variant="outline"
          size="sm"
          iconName="RefreshCw"
          iconPosition="left"
          className="flex-1"
        >
          Refresh
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Settings"
          iconPosition="left"
          className="flex-1"
        >
          Settings
        </Button>
      </div>
    </div>
  );
};

export default ConnectedWalletCard;