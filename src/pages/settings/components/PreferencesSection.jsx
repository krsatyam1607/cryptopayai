import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PreferencesSection = () => {
  const [preferences, setPreferences] = useState({
    currency: 'USDC',
    language: 'en-US',
    theme: 'dark',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    aiAssistant: true,
    autoRefresh: true,
    soundEffects: false,
    animations: true
  });

  const [isSaving, setIsSaving] = useState(false);

  const currencyOptions = [
    { value: 'USDC', label: 'USDC (Primary)', description: 'USD Coin - Primary display currency' },
    { value: 'USD', label: 'USD (Equivalent)', description: 'Show USD equivalent values' },
    { value: 'BOTH', label: 'Both USDC & USD', description: 'Display both currencies' }
  ];

  const languageOptions = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'en-GB', label: 'English (UK)' },
    { value: 'es-ES', label: 'Español' },
    { value: 'fr-FR', label: 'Français' },
    { value: 'de-DE', label: 'Deutsch' },
    { value: 'ja-JP', label: '日本語' },
    { value: 'ko-KR', label: '한국어' },
    { value: 'zh-CN', label: '中文 (简体)' }
  ];

  const themeOptions = [
    { value: 'dark', label: 'Dark Theme', description: 'Current theme with dark backgrounds' },
    { value: 'light', label: 'Light Theme', description: 'Light backgrounds and dark text' },
    { value: 'auto', label: 'System Default', description: 'Follow system theme preference' }
  ];

  const dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US Format)' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (International)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO Format)' },
    { value: 'DD MMM YYYY', label: 'DD MMM YYYY (e.g., 18 Oct 2025)' }
  ];

  const timeFormatOptions = [
    { value: '12h', label: '12-hour (AM/PM)' },
    { value: '24h', label: '24-hour' }
  ];

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleResetDefaults = () => {
    setPreferences({
      currency: 'USDC',
      language: 'en-US',
      theme: 'dark',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      aiAssistant: true,
      autoRefresh: true,
      soundEffects: false,
      animations: true
    });
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
            <Icon name="Settings2" size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Application Preferences</h3>
            <p className="text-sm text-muted-foreground">Customize your CryptoPayAI experience</p>
          </div>
        </div>
        
        <Button 
          onClick={handleSavePreferences}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save Changes
        </Button>
      </div>
      <div className="space-y-8">
        {/* Display Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Eye" size={16} className="text-primary" />
            <span>Display Settings</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
            <Select
              label="Default Currency Display"
              description="How amounts are shown throughout the app"
              options={currencyOptions}
              value={preferences?.currency}
              onChange={(value) => handlePreferenceChange('currency', value)}
            />

            <Select
              label="Language"
              description="Interface language and localization"
              options={languageOptions}
              value={preferences?.language}
              onChange={(value) => handlePreferenceChange('language', value)}
            />

            <Select
              label="Theme"
              description="Visual appearance of the application"
              options={themeOptions}
              value={preferences?.theme}
              onChange={(value) => handlePreferenceChange('theme', value)}
            />

            <Select
              label="Date Format"
              description="How dates are displayed"
              options={dateFormatOptions}
              value={preferences?.dateFormat}
              onChange={(value) => handlePreferenceChange('dateFormat', value)}
            />

            <Select
              label="Time Format"
              description="12-hour or 24-hour time display"
              options={timeFormatOptions}
              value={preferences?.timeFormat}
              onChange={(value) => handlePreferenceChange('timeFormat', value)}
            />
          </div>
        </div>

        {/* AI Assistant Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Bot" size={16} className="text-success" />
            <span>AI Assistant</span>
          </h4>
          
          <div className="pl-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border">
              <div>
                <label className="font-medium text-foreground">Enable AI Assistant</label>
                <p className="text-sm text-muted-foreground">Get intelligent help with payments and transactions</p>
              </div>
              <Checkbox
                checked={preferences?.aiAssistant}
                onChange={(e) => handlePreferenceChange('aiAssistant', e?.target?.checked)}
                size="lg"
              />
            </div>

            {preferences?.aiAssistant && (
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Sparkles" size={16} className="text-success" />
                  <div>
                    <p className="text-sm font-medium text-success">AI Assistant Active</p>
                    <p className="text-xs text-muted-foreground">
                      Powered by Gemini AI • Available 24/7 for payment assistance
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interface Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Monitor" size={16} className="text-accent" />
            <span>Interface Settings</span>
          </h4>
          
          <div className="pl-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border">
              <div>
                <label className="font-medium text-foreground">Auto-refresh Data</label>
                <p className="text-sm text-muted-foreground">Automatically update balances and transactions</p>
              </div>
              <Checkbox
                checked={preferences?.autoRefresh}
                onChange={(e) => handlePreferenceChange('autoRefresh', e?.target?.checked)}
                size="lg"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border">
              <div>
                <label className="font-medium text-foreground">Smooth Animations</label>
                <p className="text-sm text-muted-foreground">Enable transitions and micro-interactions</p>
              </div>
              <Checkbox
                checked={preferences?.animations}
                onChange={(e) => handlePreferenceChange('animations', e?.target?.checked)}
                size="lg"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border">
              <div>
                <label className="font-medium text-foreground">Sound Effects</label>
                <p className="text-sm text-muted-foreground">Play sounds for notifications and actions</p>
              </div>
              <Checkbox
                checked={preferences?.soundEffects}
                onChange={(e) => handlePreferenceChange('soundEffects', e?.target?.checked)}
                size="lg"
              />
            </div>
          </div>
        </div>

        {/* Transaction Limits */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-warning" />
            <span>Transaction Limits</span>
          </h4>
          
          <div className="pl-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/20 rounded-lg border border-border">
                <h5 className="font-medium text-foreground mb-2">Daily Limit</h5>
                <div className="text-2xl font-bold text-primary">$10,000</div>
                <p className="text-xs text-muted-foreground">USDC equivalent</p>
              </div>
              
              <div className="p-4 bg-muted/20 rounded-lg border border-border">
                <h5 className="font-medium text-foreground mb-2">Single Transaction</h5>
                <div className="text-2xl font-bold text-primary">$5,000</div>
                <p className="text-xs text-muted-foreground">Maximum per transaction</p>
              </div>
              
              <div className="p-4 bg-muted/20 rounded-lg border border-border">
                <h5 className="font-medium text-foreground mb-2">Monthly Limit</h5>
                <div className="text-2xl font-bold text-primary">$100,000</div>
                <p className="text-xs text-muted-foreground">Rolling 30-day period</p>
              </div>
            </div>
            
            <Button variant="outline" className="mt-4" iconName="Edit" iconPosition="left">
              Request Limit Increase
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
          <Button variant="outline" onClick={handleResetDefaults} iconName="RotateCcw" iconPosition="left">
            Reset to Defaults
          </Button>
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Settings
          </Button>
          <Button variant="outline" iconName="Upload" iconPosition="left">
            Import Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;