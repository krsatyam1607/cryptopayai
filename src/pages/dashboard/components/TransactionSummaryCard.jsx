import React from 'react';
import Icon from '../../../components/AppIcon';

const TransactionSummaryCard = () => {
  const summaryData = {
    thisMonth: {
      sent: { amount: 2450.75, count: 12, change: 15.2 },
      received: { amount: 3120.50, count: 8, change: -5.8 },
      scheduled: { amount: 650.00, count: 2, change: 0 }
    },
    lastMonth: {
      sent: { amount: 2130.25, count: 10 },
      received: { amount: 3310.80, count: 9 },
      scheduled: { amount: 650.00, count: 2 }
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatChange = (change) => {
    if (change === 0) return null;
    return (
      <div className={`
        flex items-center space-x-1 text-xs
        ${change > 0 ? 'text-success' : 'text-error'}
      `}>
        <Icon name={change > 0 ? "TrendingUp" : "TrendingDown"} size={10} />
        <span>{Math.abs(change)}%</span>
      </div>
    );
  };

  const summaryItems = [
    {
      label: 'Sent',
      icon: 'ArrowUpRight',
      color: 'text-error',
      bgColor: 'bg-error/10',
      data: summaryData?.thisMonth?.sent
    },
    {
      label: 'Received', 
      icon: 'ArrowDownLeft',
      color: 'text-success',
      bgColor: 'bg-success/10',
      data: summaryData?.thisMonth?.received
    },
    {
      label: 'Scheduled',
      icon: 'Clock',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      data: summaryData?.thisMonth?.scheduled
    }
  ];

  return (
    <div className="p-6 rounded-xl bg-surface border border-border shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">This Month</h3>
            <p className="text-sm text-muted-foreground">Transaction summary</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Net Flow</p>
          <p className="text-lg font-semibold text-success font-mono">
            +${formatAmount(summaryData?.thisMonth?.received?.amount - summaryData?.thisMonth?.sent?.amount)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {summaryItems?.map((item, index) => (
          <div
            key={index}
            className={`
              flex items-center justify-between p-4 rounded-lg border border-border/50
              ${item?.bgColor} hover:bg-opacity-20 transition-colors
            `}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item?.bgColor}`}>
                <Icon name={item?.icon} size={16} className={item?.color} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{item?.label}</p>
                <p className="text-xs text-muted-foreground">
                  {item?.data?.count} transaction{item?.data?.count !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-semibold font-mono ${item?.color}`}>
                  ${formatAmount(item?.data?.amount)}
                </span>
                {formatChange(item?.data?.change)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Compared to last month</span>
          <span>
            Total: ${formatAmount(
              summaryData?.thisMonth?.sent?.amount + 
              summaryData?.thisMonth?.received?.amount + 
              summaryData?.thisMonth?.scheduled?.amount
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummaryCard;