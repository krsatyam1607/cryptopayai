import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScheduledPaymentsCard = () => {
  const navigate = useNavigate();

  const scheduledPayments = [
    {
      id: "sp_001",
      recipient: "Alice Johnson",
      recipientAddress: "0x742d...8f3a",
      amount: 500.00,
      currency: "USDC",
      frequency: "monthly",
      nextPayment: new Date(Date.now() + 86400000 * 3),
      status: "active",
      description: "Monthly rent payment"
    },
    {
      id: "sp_002", 
      recipient: "Bob Smith",
      recipientAddress: "0x123a...9d2c",
      amount: 150.00,
      currency: "USDC",
      frequency: "weekly",
      nextPayment: new Date(Date.now() + 86400000 * 2),
      status: "active",
      description: "Weekly service fee"
    }
  ];

  const getFrequencyIcon = (frequency) => {
    const iconMap = {
      daily: 'Calendar',
      weekly: 'CalendarDays',
      monthly: 'CalendarRange'
    };
    return iconMap?.[frequency] || 'Calendar';
  };

  const getFrequencyColor = (frequency) => {
    const colorMap = {
      daily: 'text-primary',
      weekly: 'text-secondary', 
      monthly: 'text-accent'
    };
    return colorMap?.[frequency] || 'text-primary';
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(amount);
  };

  const formatNextPayment = (date) => {
    const now = new Date();
    const diff = date - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days <= 7) return `In ${days} days`;
    return date?.toLocaleDateString();
  };

  const handleViewAll = () => {
    navigate('/payments?tab=scheduled');
  };

  const handleCreateScheduled = () => {
    navigate('/payments?action=schedule');
  };

  return (
    <div className="p-6 rounded-xl bg-surface border border-border shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="CalendarClock" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Scheduled Payments</h3>
            <p className="text-sm text-muted-foreground">
              {scheduledPayments?.length} active schedules
            </p>
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
        {scheduledPayments?.length > 0 ? (
          scheduledPayments?.map((payment) => (
            <div
              key={payment?.id}
              className="flex items-center space-x-4 p-4 rounded-lg border border-border/50 hover:bg-muted/20 transition-colors cursor-pointer glow-hover group"
            >
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${payment?.frequency === 'daily' ? 'bg-primary/10' : ''}
                ${payment?.frequency === 'weekly' ? 'bg-secondary/10' : ''}
                ${payment?.frequency === 'monthly' ? 'bg-accent/10' : ''}
              `}>
                <Icon 
                  name={getFrequencyIcon(payment?.frequency)} 
                  size={18} 
                  className={getFrequencyColor(payment?.frequency)}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">
                    {payment?.recipient}
                  </span>
                  <span className="text-sm font-semibold font-mono text-foreground">
                    {formatAmount(payment?.amount)} {payment?.currency}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`
                      text-xs px-2 py-1 rounded-full font-medium capitalize
                      ${getFrequencyColor(payment?.frequency)} 
                      ${payment?.frequency === 'daily' ? 'bg-primary/10' : ''}
                      ${payment?.frequency === 'weekly' ? 'bg-secondary/10' : ''}
                      ${payment?.frequency === 'monthly' ? 'bg-accent/10' : ''}
                    `}>
                      {payment?.frequency}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {payment?.description}
                    </span>
                  </div>
                  
                  <span className="text-xs text-muted-foreground">
                    Next: {formatNextPayment(payment?.nextPayment)}
                  </span>
                </div>
              </div>

              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-foreground transition-colors"
              />
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="CalendarClock" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">No scheduled payments</p>
            <p className="text-sm text-muted-foreground mb-4">
              Set up recurring payments to automate your transactions
            </p>
            <Button
              variant="outline"
              onClick={handleCreateScheduled}
              iconName="Plus"
              iconPosition="left"
            >
              Create Schedule
            </Button>
          </div>
        )}
      </div>
      {scheduledPayments?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCreateScheduled}
            iconName="Plus"
            iconPosition="left"
            className="w-full"
          >
            Add New Schedule
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScheduledPaymentsCard;