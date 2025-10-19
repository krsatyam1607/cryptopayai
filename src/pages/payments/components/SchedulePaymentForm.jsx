import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SchedulePaymentForm = ({ onSchedulePayment }) => {
  const [formData, setFormData] = useState({
    recipientAddress: '',
    amount: '',
    memo: '',
    frequency: 'weekly',
    startDate: '',
    endDate: '',
    isRecurring: true
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const frequencyOptions = [
    { value: 'daily', label: 'Daily', icon: 'Calendar' },
    { value: 'weekly', label: 'Weekly', icon: 'CalendarDays' },
    { value: 'monthly', label: 'Monthly', icon: 'CalendarRange' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
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
    }

    if (!formData?.startDate) {
      newErrors.startDate = 'Start date is required';
    } else if (new Date(formData.startDate) < new Date()) {
      newErrors.startDate = 'Start date cannot be in the past';
    }

    if (formData?.isRecurring && formData?.endDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const scheduleData = {
        ...formData,
        amount: parseFloat(formData?.amount),
        id: `schedule_${Date.now()}`,
        status: 'active',
        nextExecution: formData?.startDate,
        createdAt: new Date()?.toISOString()
      };
      
      onSchedulePayment(scheduleData);
      
      setFormData({
        recipientAddress: '',
        amount: '',
        memo: '',
        frequency: 'weekly',
        startDate: '',
        endDate: '',
        isRecurring: true
      });
    } catch (error) {
      setErrors({ submit: 'Failed to schedule payment. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateNextPayments = () => {
    if (!formData?.startDate || !formData?.amount) return [];

    const startDate = new Date(formData.startDate);
    const payments = [];
    
    for (let i = 0; i < 3; i++) {
      const paymentDate = new Date(startDate);
      
      switch (formData?.frequency) {
        case 'daily':
          paymentDate?.setDate(startDate?.getDate() + i);
          break;
        case 'weekly':
          paymentDate?.setDate(startDate?.getDate() + (i * 7));
          break;
        case 'monthly':
          paymentDate?.setMonth(startDate?.getMonth() + i);
          break;
      }
      
      payments?.push({
        date: paymentDate?.toLocaleDateString(),
        amount: parseFloat(formData?.amount)
      });
    }
    
    return payments;
  };

  const nextPayments = calculateNextPayments();

  return (
    <div className="space-y-6">
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
          description="Enter the USDC wallet address for scheduled payments"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Amount per Payment (USDC)"
            type="number"
            name="amount"
            placeholder="0.00"
            value={formData?.amount}
            onChange={handleInputChange}
            error={errors?.amount}
            required
            min="0"
            step="0.000001"
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Payment Frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {frequencyOptions?.map((option) => (
                <button
                  key={option?.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, frequency: option?.value }))}
                  className={`
                    flex flex-col items-center p-3 rounded-lg border transition-all duration-200
                    ${formData?.frequency === option?.value
                      ? 'bg-primary/10 border-primary/20 text-primary' :'bg-surface border-border text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  <Icon name={option?.icon} size={20} className="mb-1" />
                  <span className="text-xs font-medium">{option?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            name="startDate"
            value={formData?.startDate}
            onChange={handleInputChange}
            error={errors?.startDate}
            required
            min={new Date()?.toISOString()?.split('T')?.[0]}
          />

          <Input
            label="End Date (Optional)"
            type="date"
            name="endDate"
            value={formData?.endDate}
            onChange={handleInputChange}
            error={errors?.endDate}
            disabled={!formData?.isRecurring}
            description="Leave empty for indefinite scheduling"
          />
        </div>

        <Input
          label="Payment Memo (Optional)"
          type="text"
          name="memo"
          placeholder="Monthly subscription payment..."
          value={formData?.memo}
          onChange={handleInputChange}
          description="Add a note for scheduled payments"
        />

        <Checkbox
          label="Enable Recurring Payments"
          checked={formData?.isRecurring}
          onChange={(e) => setFormData(prev => ({ ...prev, isRecurring: e?.target?.checked }))}
          description="Automatically execute payments based on schedule"
        />

        {/* Schedule Preview */}
        {nextPayments?.length > 0 && (
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-accent mb-3 flex items-center">
              <Icon name="Calendar" size={16} className="mr-2" />
              Next 3 Scheduled Payments
            </h4>
            <div className="space-y-2">
              {nextPayments?.map((payment, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{payment?.date}</span>
                  <span className="font-mono text-foreground">{payment?.amount} USDC</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">Total per cycle:</span>
                <span className="font-mono font-semibold text-foreground">
                  {(nextPayments?.[0]?.amount || 0)?.toFixed(6)} USDC
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
          disabled={!formData?.recipientAddress || !formData?.amount || !formData?.startDate || isLoading}
          fullWidth
          iconName="Calendar"
          iconPosition="left"
        >
          {isLoading ? 'Creating Schedule...' : 'Schedule Payment'}
        </Button>
      </form>
    </div>
  );
};

export default SchedulePaymentForm;