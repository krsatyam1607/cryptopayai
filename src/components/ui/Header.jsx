import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Payments', path: '/payments', icon: 'CreditCard' },
    { label: 'Transactions', path: '/transactions', icon: 'Receipt' },
    { label: 'Assistant', path: '/assistant', icon: 'Bot' },
  ];

  const secondaryItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer glow-hover"
            onClick={() => handleNavigation('/dashboard')}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} className="text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground tracking-tight">CryptoPayAI</span>
                <span className="text-xs text-muted-foreground font-mono">v2.1.0</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActivePath(item?.path)
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-glow'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 glow-hover'
                  }
                `}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            ))}
            
            {/* More Menu */}
            <div className="relative ml-2">
              <button
                onClick={() => handleNavigation('/settings')}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActivePath('/settings')
                    ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50 glow-hover'
                  }
                `}
              >
                <Icon name="Settings" size={16} />
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed top-16 left-0 right-0 bg-surface border-b border-border z-50 md:hidden shadow-modal">
              <nav className="px-6 py-4 space-y-2">
                {[...navigationItems, ...secondaryItems]?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`
                      flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-all duration-200
                      ${isActivePath(item?.path)
                        ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }
                    `}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span className="font-medium">{item?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </>
        )}
      </header>
      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;