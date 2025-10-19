import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AIAssistantFloat from '../../components/ui/AIAssistantFloat';
import SendPaymentForm from './components/SendPaymentForm';
import ReceivePaymentForm from './components/ReceivePaymentForm';
import SchedulePaymentForm from './components/SchedulePaymentForm';
import PaymentConfirmationModal from './components/PaymentConfirmationModal';
import RecentTransactions from './components/RecentTransactions';

const PaymentsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams?.get('action') || 'send');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    type: 'send',
    data: null,
    isLoading: false
  });

  const tabs = [
    { id: 'send', label: 'Send Payment', icon: 'Send', description: 'Transfer USDC to any wallet' },
    { id: 'receive', label: 'Receive Payment', icon: 'Download', description: 'Generate payment request' },
    { id: 'schedule', label: 'Schedule Payment', icon: 'Calendar', description: 'Set up recurring transfers' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ action: tabId });
  };

  const handleSendPayment = (transactionData) => {
    setConfirmationModal({
      isOpen: true,
      type: 'send',
      data: transactionData,
      isLoading: false
    });
  };

  const handleSchedulePayment = (scheduleData) => {
    setConfirmationModal({
      isOpen: true,
      type: 'schedule',
      data: scheduleData,
      isLoading: false
    });
  };

  const handleConfirmTransaction = async () => {
    setConfirmationModal(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Close modal and show success
      setConfirmationModal({ isOpen: false, type: 'send', data: null, isLoading: false });
      
      // In a real app, you would redirect to success page or show success toast
      alert(`${confirmationModal?.type === 'schedule' ? 'Payment scheduled' : 'Payment sent'} successfully!`);
    } catch (error) {
      setConfirmationModal(prev => ({ ...prev, isLoading: false }));
      alert('Transaction failed. Please try again.');
    }
  };

  const handleCloseModal = () => {
    if (!confirmationModal?.isLoading) {
      setConfirmationModal({ isOpen: false, type: 'send', data: null, isLoading: false });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'send':
        return <SendPaymentForm onSendPayment={handleSendPayment} />;
      case 'receive':
        return <ReceivePaymentForm />;
      case 'schedule':
        return <SchedulePaymentForm onSchedulePayment={handleSchedulePayment} />;
      default:
        return <SendPaymentForm onSendPayment={handleSendPayment} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <main className={`
        transition-all duration-300 ease-in-out pt-6 pb-20
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
      `}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Payments</h1>
                <p className="text-muted-foreground">
                  Send, receive, and schedule USDC transactions with ease
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-success/10 border border-success/20 rounded-lg px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-success">Network Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Payment Interface */}
            <div className="xl:col-span-2">
              {/* Tab Navigation */}
              <div className="bg-surface border border-border rounded-xl p-2 mb-6">
                <div className="grid grid-cols-3 gap-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => handleTabChange(tab?.id)}
                      className={`
                        flex flex-col items-center p-4 rounded-lg transition-all duration-200 text-center
                        ${activeTab === tab?.id
                          ? 'bg-primary/10 text-primary border border-primary/20 shadow-glow'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 glow-hover'
                        }
                      `}
                    >
                      <Icon name={tab?.icon} size={24} className="mb-2" />
                      <span className="font-medium text-sm">{tab?.label}</span>
                      <span className="text-xs opacity-80 mt-1 hidden sm:block">
                        {tab?.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-surface border border-border rounded-xl p-6">
                {renderTabContent()}
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              <RecentTransactions />
              
              {/* Quick Stats */}
              <div className="bg-surface/50 border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="TrendingUp" size={20} className="mr-2 text-secondary" />
                  Payment Stats
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">This Month</span>
                    <span className="font-mono font-semibold text-foreground">1,247.50 USDC</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Sent</span>
                    <span className="font-mono text-error">-892.30 USDC</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Received</span>
                    <span className="font-mono text-success">+2,139.80 USDC</span>
                  </div>
                  
                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">Net Flow</span>
                      <span className="font-mono font-semibold text-success">+1,247.50 USDC</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-warning/5 border border-warning/20 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Shield" size={20} className="text-warning mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-warning mb-1">Security Reminder</h4>
                    <p className="text-xs text-muted-foreground">
                      Always verify wallet addresses before sending payments. Transactions cannot be reversed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Payment Confirmation Modal */}
      <PaymentConfirmationModal
        isOpen={confirmationModal?.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmTransaction}
        transactionData={confirmationModal?.data}
        type={confirmationModal?.type}
        isLoading={confirmationModal?.isLoading}
      />
      <AIAssistantFloat />
    </div>
  );
};

export default PaymentsPage;