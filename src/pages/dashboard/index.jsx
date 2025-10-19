import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AIAssistantFloat from '../../components/ui/AIAssistantFloat';
import DashboardQuickActions from '../../components/ui/DashboardQuickActions';
import WalletBalanceCard from './components/WalletBalanceCard';
import RecentTransactionsCard from './components/RecentTransactionsCard';
import AIAssistantToggle from './components/AIAssistantToggle';
import ConnectedWalletCard from './components/ConnectedWalletCard';
import ScheduledPaymentsCard from './components/ScheduledPaymentsCard';
import TransactionSummaryCard from './components/TransactionSummaryCard';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Add keyboard shortcuts
    const handleKeyPress = (e) => {
      if (e?.ctrlKey || e?.metaKey) {
        switch (e?.key) {
          case 's':
            e?.preventDefault();
            navigate('/payments?action=send');
            break;
          case 'r':
            e?.preventDefault();
            navigate('/payments?action=receive');
            break;
          case 't':
            e?.preventDefault();
            navigate('/payments?action=schedule');
            break;
          case 'a':
            e?.preventDefault();
            navigate('/assistant');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={handleToggleSidebar}
      />
      <main className={`
        transition-all duration-300 ease-in-out pt-6 pb-20
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
      `}>
        <div className="px-6 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome back! 👋
                </h1>
                <p className="text-muted-foreground mt-1">
                  Here's your cryptocurrency payment overview for {new Date()?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <DashboardQuickActions />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Primary Cards */}
            <div className="lg:col-span-2 space-y-6">
              {/* Wallet Balance */}
              <WalletBalanceCard />
              
              {/* Recent Transactions */}
              <RecentTransactionsCard />
            </div>

            {/* Right Column - Secondary Cards */}
            <div className="space-y-6">
              {/* AI Assistant Toggle */}
              <AIAssistantToggle />
              
              {/* Connected Wallet Info */}
              <ConnectedWalletCard />
            </div>
          </div>

          {/* Bottom Section - Additional Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scheduled Payments */}
            <ScheduledPaymentsCard />
            
            {/* Transaction Summary */}
            <TransactionSummaryCard />
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-foreground font-medium">Loading dashboard...</p>
                <p className="text-sm text-muted-foreground mt-1">Syncing wallet data</p>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Floating AI Assistant */}
      <AIAssistantFloat />
    </div>
  );
};

export default Dashboard;