import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AIAssistantFloat from '../../components/ui/AIAssistantFloat';
import Icon from '../../components/AppIcon';
import ProfileSection from './components/ProfileSection';
import WalletSection from './components/WalletSection';
import SecuritySection from './components/SecuritySection';
import NotificationSection from './components/NotificationSection';
import PreferencesSection from './components/PreferencesSection';
import LogoutSection from './components/LogoutSection';

const Settings = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  const settingsSections = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Personal information and account details'
    },
    {
      id: 'wallet',
      label: 'Wallet',
      icon: 'Wallet',
      description: 'Circle wallet connection and settings'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      description: 'Password, 2FA, and session management'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Email, push, and SMS preferences'
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: 'Settings2',
      description: 'App settings and customization'
    },
    {
      id: 'logout',
      label: 'Sign Out',
      icon: 'LogOut',
      description: 'Account actions and session management'
    }
  ];

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'wallet':
        return <WalletSection />;
      case 'security':
        return <SecuritySection />;
      case 'notifications':
        return <NotificationSection />;
      case 'preferences':
        return <PreferencesSection />;
      case 'logout':
        return <LogoutSection />;
      default:
        return <ProfileSection />;
    }
  };

  const getActiveSection = () => {
    return settingsSections?.find(section => section?.id === activeSection);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleSidebar} />
      <main className={`
        transition-all duration-300 ease-in-out pt-6 pb-20
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
      `}>
        <div className="px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={20} className="text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            </div>
            <p className="text-muted-foreground">
              Manage your account preferences, security settings, and application configuration
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-surface rounded-xl border border-border p-4 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">Settings Menu</h3>
                <nav className="space-y-2">
                  {settingsSections?.map((section) => (
                    <button
                      key={section?.id}
                      onClick={() => setActiveSection(section?.id)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200
                        ${activeSection === section?.id
                          ? 'bg-primary/10 text-primary border border-primary/20 shadow-glow'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 glow-hover'
                        }
                      `}
                    >
                      <Icon 
                        name={section?.icon} 
                        size={18} 
                        className={activeSection === section?.id ? 'text-primary' : ''} 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{section?.label}</div>
                        <div className="text-xs text-muted-foreground truncate hidden sm:block">
                          {section?.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="mt-6 pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-3">Account Status</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Profile</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-success">Complete</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Wallet</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-success">Connected</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Security</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-warning rounded-full"></div>
                        <span className="text-warning">Review</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              {/* Section Header */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <Icon 
                    name={getActiveSection()?.icon} 
                    size={24} 
                    className="text-primary" 
                  />
                  <h2 className="text-2xl font-bold text-foreground">
                    {getActiveSection()?.label}
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  {getActiveSection()?.description}
                </p>
              </div>

              {/* Active Section Content */}
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </main>
      <AIAssistantFloat />
    </div>
  );
};

export default Settings;