import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationSection = () => {
  const [notifications, setNotifications] = useState({
    email: {
      transactions: true,
      payments: true,
      security: true,
      marketing: false,
      weekly: true
    },
    push: {
      transactions: true,
      payments: true,
      security: true,
      reminders: false
    },
    sms: {
      security: true,
      payments: false,
      transactions: false
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleNotificationChange = (category, type, value) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [type]: value
      }
    }));
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const notificationCategories = [
    {
      id: 'email',
      title: 'Email Notifications',
      description: 'Receive updates via email',
      icon: 'Mail',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      options: [
        { key: 'transactions', label: 'Transaction Confirmations', description: 'Get notified when transactions are completed' },
        { key: 'payments', label: 'Payment Alerts', description: 'Receive alerts for incoming and outgoing payments' },
        { key: 'security', label: 'Security Alerts', description: 'Important security notifications and login alerts' },
        { key: 'weekly', label: 'Weekly Summary', description: 'Weekly transaction and balance summary' },
        { key: 'marketing', label: 'Product Updates', description: 'New features and product announcements' }
      ]
    },
    {
      id: 'push',
      title: 'Push Notifications',
      description: 'Browser and mobile notifications',
      icon: 'Bell',
      color: 'text-primary',
      bgColor: 'bg-primary/20',
      options: [
        { key: 'transactions', label: 'Real-time Transactions', description: 'Instant notifications for all transactions' },
        { key: 'payments', label: 'Payment Requests', description: 'Notifications for payment requests and approvals' },
        { key: 'security', label: 'Security Alerts', description: 'Immediate security and login notifications' },
        { key: 'reminders', label: 'Payment Reminders', description: 'Reminders for scheduled payments' }
      ]
    },
    {
      id: 'sms',
      title: 'SMS Notifications',
      description: 'Text message alerts',
      icon: 'MessageSquare',
      color: 'text-success',
      bgColor: 'bg-success/20',
      options: [
        { key: 'security', label: 'Security Codes', description: 'Two-factor authentication codes' },
        { key: 'payments', label: 'High-Value Payments', description: 'SMS alerts for payments over $1,000' },
        { key: 'transactions', label: 'Failed Transactions', description: 'Immediate alerts for failed transactions' }
      ]
    }
  ];

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
            <p className="text-sm text-muted-foreground">Choose how you want to be notified about account activity</p>
          </div>
        </div>
        
        <Button 
          onClick={handleSavePreferences}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save Preferences
        </Button>
      </div>
      <div className="space-y-8">
        {notificationCategories?.map((category) => (
          <div key={category?.id} className="space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-border">
              <div className={`w-8 h-8 ${category?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={category?.icon} size={16} className={category?.color} />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{category?.title}</h4>
                <p className="text-sm text-muted-foreground">{category?.description}</p>
              </div>
            </div>

            <div className="space-y-4 pl-11">
              {category?.options?.map((option) => (
                <div key={option?.key} className="flex items-start space-x-3">
                  <Checkbox
                    checked={notifications?.[category?.id]?.[option?.key]}
                    onChange={(e) => handleNotificationChange(category?.id, option?.key, e?.target?.checked)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-foreground cursor-pointer">
                      {option?.label}
                    </label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {option?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Notification Schedule */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-border">
            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={16} className="text-accent" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Notification Schedule</h4>
              <p className="text-sm text-muted-foreground">Control when you receive notifications</p>
            </div>
          </div>

          <div className="pl-11 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/20 rounded-lg border border-border">
                <h5 className="font-medium text-foreground mb-2">Quiet Hours</h5>
                <p className="text-sm text-muted-foreground mb-3">Pause non-urgent notifications</p>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-foreground">10:00 PM</span>
                  <span className="text-muted-foreground">to</span>
                  <span className="text-foreground">8:00 AM</span>
                </div>
              </div>

              <div className="p-4 bg-muted/20 rounded-lg border border-border">
                <h5 className="font-medium text-foreground mb-2">Timezone</h5>
                <p className="text-sm text-muted-foreground mb-3">Your local timezone</p>
                <div className="text-sm text-foreground">
                  UTC-8 (Pacific Time)
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                checked
                onChange={() => {}}
              />
              <div>
                <label className="text-sm font-medium text-foreground">
                  Respect quiet hours for all notifications
                </label>
                <p className="text-xs text-muted-foreground">
                  Security alerts will still be delivered immediately
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
          <Button variant="outline" iconName="Volume2" iconPosition="left">
            Test Notifications
          </Button>
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Preferences
          </Button>
          <Button variant="ghost" iconName="RotateCcw" iconPosition="left">
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;