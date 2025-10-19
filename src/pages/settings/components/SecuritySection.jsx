import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySection = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const activeSessions = [
    {
      id: 1,
      device: "MacBook Pro",
      location: "San Francisco, CA",
      browser: "Chrome 118.0",
      lastActive: "2025-10-18T16:10:00Z",
      current: true
    },
    {
      id: 2,
      device: "iPhone 15 Pro",
      location: "San Francisco, CA",
      browser: "Safari Mobile",
      lastActive: "2025-10-18T14:30:00Z",
      current: false
    },
    {
      id: 3,
      device: "Windows Desktop",
      location: "New York, NY",
      browser: "Edge 118.0",
      lastActive: "2025-10-17T22:15:00Z",
      current: false
    }
  ];

  const handlePasswordChange = async () => {
    setIsUpdating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsChangingPassword(false);
    setIsUpdating(false);
  };

  const handleToggle2FA = async () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleRevokeSession = async (sessionId) => {
    // Simulate session revocation
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const formatLastActive = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Active now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-error to-warning rounded-lg flex items-center justify-center">
          <Icon name="Shield" size={20} className="text-background" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
          <p className="text-sm text-muted-foreground">Manage your account security and authentication</p>
        </div>
      </div>
      <div className="space-y-8">
        {/* Password Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Password</h4>
              <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
            </div>
            {!isChangingPassword && (
              <Button 
                variant="outline" 
                onClick={() => setIsChangingPassword(true)}
                iconName="Key"
                iconPosition="left"
              >
                Change Password
              </Button>
            )}
          </div>

          {isChangingPassword && (
            <div className="space-y-4 p-4 bg-muted/20 rounded-lg border border-border">
              <Input
                label="Current Password"
                type="password"
                value={passwordData?.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e?.target?.value }))}
                placeholder="Enter current password"
              />
              <Input
                label="New Password"
                type="password"
                value={passwordData?.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e?.target?.value }))}
                placeholder="Enter new password"
                description="Must be at least 8 characters with numbers and symbols"
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={passwordData?.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e?.target?.value }))}
                placeholder="Confirm new password"
              />
              
              <div className="flex items-center justify-end space-x-3">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsChangingPassword(false)}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handlePasswordChange}
                  loading={isUpdating}
                  iconName="Save"
                  iconPosition="left"
                >
                  Update Password
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Two-Factor Authentication */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-sm ${twoFactorEnabled ? 'text-success' : 'text-muted-foreground'}`}>
                {twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
              <Checkbox
                checked={twoFactorEnabled}
                onChange={handleToggle2FA}
                size="lg"
              />
            </div>
          </div>

          {twoFactorEnabled && (
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Smartphone" size={16} className="text-success" />
                <div>
                  <p className="text-sm font-medium text-success">Authenticator App Connected</p>
                  <p className="text-xs text-muted-foreground">Google Authenticator configured</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Sessions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Active Sessions</h4>
              <p className="text-sm text-muted-foreground">Manage devices that are currently signed in</p>
            </div>
            <Button variant="outline" iconName="LogOut" iconPosition="left">
              Sign Out All
            </Button>
          </div>

          <div className="space-y-3">
            {activeSessions?.map((session) => (
              <div key={session?.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={session?.device?.includes('iPhone') ? 'Smartphone' : 'Monitor'} 
                      size={16} 
                      className="text-primary" 
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-foreground">{session?.device}</p>
                      {session?.current && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {session?.browser} • {session?.location}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatLastActive(session?.lastActive)}
                    </p>
                  </div>
                </div>
                
                {!session?.current && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRevokeSession(session?.id)}
                    iconName="X"
                  >
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <h4 className="font-medium text-warning mb-2">Security Recommendations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Enable two-factor authentication for enhanced security</li>
                <li>• Use a strong, unique password for your account</li>
                <li>• Regularly review and revoke unused sessions</li>
                <li>• Keep your recovery codes in a safe place</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;