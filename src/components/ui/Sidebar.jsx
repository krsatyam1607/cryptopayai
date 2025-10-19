import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: 'LayoutDashboard',
      description: 'Overview & Quick Actions'
    },
    { 
      label: 'Payments', 
      path: '/payments', 
      icon: 'CreditCard',
      description: 'Send & Receive USDC'
    },
    { 
      label: 'Transactions', 
      path: '/transactions', 
      icon: 'Receipt',
      description: 'Transaction History'
    },
    { 
      label: 'AI Assistant', 
      path: '/assistant', 
      icon: 'Bot',
      description: 'Smart Payment Help'
    },
  ];

  const secondaryItems = [
    { 
      label: 'Settings', 
      path: '/settings', 
      icon: 'Settings',
      description: 'Account & Preferences'
    },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className={`
      fixed left-0 top-16 bottom-0 z-40 bg-surface border-r border-border transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-16' : 'w-64'}
      hidden lg:block
    `}>
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Navigation
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="glow-hover"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          <div className="space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  group relative flex items-center w-full px-3 py-3 rounded-lg text-left transition-all duration-200
                  ${isActivePath(item?.path)
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-glow'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 glow-hover'
                  }
                `}
                title={isCollapsed ? item?.label : ''}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={`flex-shrink-0 ${isActivePath(item?.path) ? 'text-primary' : ''}`}
                />
                
                {!isCollapsed && (
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{item?.label}</div>
                    <div className="text-xs text-muted-foreground truncate">{item?.description}</div>
                  </div>
                )}

                {isActivePath(item?.path) && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"></div>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-modal">
                    {item?.label}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-border"></div>

          {/* Secondary Navigation */}
          <div className="space-y-1">
            {secondaryItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  group relative flex items-center w-full px-3 py-3 rounded-lg text-left transition-all duration-200
                  ${isActivePath(item?.path)
                    ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50 glow-hover'
                  }
                `}
                title={isCollapsed ? item?.label : ''}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={`flex-shrink-0 ${isActivePath(item?.path) ? 'text-primary' : ''}`}
                />
                
                {!isCollapsed && (
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{item?.label}</div>
                    <div className="text-xs text-muted-foreground truncate">{item?.description}</div>
                  </div>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-modal">
                    {item?.label}
                  </div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">User Account</div>
                <div className="text-xs text-muted-foreground truncate">Connected</div>
              </div>
              <div className="w-2 h-2 bg-success rounded-full"></div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary-foreground" />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;