import React from 'react';
import Icon from '../../../components/AppIcon';

const WalletBalanceCard = () => {
  const walletBalance = {
    amount: 2847.56,
    currency: 'USDC',
    usdValue: 2847.56,
    change24h: 2.34,
    isPositive: true
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(amount);
  };

  return (
    <div className="relative p-6 rounded-xl bg-gradient-to-br from-surface to-surface/80 border border-primary/20 shadow-card glow-hover">
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-secondary to-primary opacity-20 blur-sm animate-pulse"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Wallet" size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">USDC Wallet</h3>
              <p className="text-sm text-muted-foreground">Circle DCW Connected</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-success font-medium">Live</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-foreground font-mono">
              {formatAmount(walletBalance?.amount)}
            </span>
            <span className="text-lg text-primary font-semibold">
              {walletBalance?.currency}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              ≈ ${formatAmount(walletBalance?.usdValue)} USD
            </span>
            
            <div className={`
              flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
              ${walletBalance?.isPositive 
                ? 'bg-success/10 text-success' :'bg-error/10 text-error'
              }
            `}>
              <Icon 
                name={walletBalance?.isPositive ? "TrendingUp" : "TrendingDown"} 
                size={12} 
              />
              <span>
                {walletBalance?.isPositive ? '+' : ''}{walletBalance?.change24h}%
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Last updated</span>
            <span className="font-mono">
              {new Date()?.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletBalanceCard;