import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LogoutSection = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Simulate logout process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Clear any stored data (in a real app, this would clear tokens, etc.)
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    
    // Navigate to login
    navigate('/login');
  };

  const handleLogoutClick = () => {
    setShowConfirmDialog(true);
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-error to-destructive rounded-lg flex items-center justify-center">
            <Icon name="LogOut" size={20} className="text-background" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Account Actions</h3>
            <p className="text-sm text-muted-foreground">Manage your account session and data</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Current Session Info */}
          <div className="p-4 bg-muted/20 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-foreground">Current Session</h4>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-success">Active</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Logged in as:</span>
                <p className="font-medium text-foreground">alex.johnson@example.com</p>
              </div>
              <div>
                <span className="text-muted-foreground">Session started:</span>
                <p className="font-medium text-foreground">Today at 2:30 PM</p>
              </div>
              <div>
                <span className="text-muted-foreground">Device:</span>
                <p className="font-medium text-foreground">MacBook Pro - Chrome</p>
              </div>
              <div>
                <span className="text-muted-foreground">Location:</span>
                <p className="font-medium text-foreground">San Francisco, CA</p>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={16} className="text-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-warning mb-2">Security Notice</h4>
                <p className="text-sm text-muted-foreground">
                  Logging out will end your current session and require you to sign in again. 
                  Make sure you have saved any pending work before proceeding.
                </p>
              </div>
            </div>
          </div>

          {/* Logout Actions */}
          <div className="space-y-3">
            <Button
              variant="destructive"
              onClick={handleLogoutClick}
              iconName="LogOut"
              iconPosition="left"
              fullWidth
              className="justify-center"
            >
              Sign Out of CryptoPayAI
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant="outline"
                iconName="Smartphone"
                iconPosition="left"
                className="justify-center"
              >
                Sign Out All Devices
              </Button>
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                className="justify-center"
              >
                Export Account Data
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Need help? Contact our support team at support@cryptopayai.com</p>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <>
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={handleCancel} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
            <div className="bg-surface border border-border rounded-xl shadow-modal p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-error/20 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-error" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Confirm Sign Out</h3>
                  <p className="text-sm text-muted-foreground">Are you sure you want to sign out?</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  You will be signed out of your CryptoPayAI account and redirected to the login page. 
                  Any unsaved changes will be lost.
                </p>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="ghost"
                  onClick={handleCancel}
                  disabled={isLoggingOut}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  loading={isLoggingOut}
                  iconName="LogOut"
                  iconPosition="left"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LogoutSection;