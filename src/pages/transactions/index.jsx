import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AIAssistantFloat from '../../components/ui/AIAssistantFloat';
import TransactionFilters from './components/TransactionFilters';
import TransactionTable from './components/TransactionTable';
import TransactionModal from './components/TransactionModal';
import BulkActions from './components/BulkActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TransactionsPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock transaction data
  const mockTransactions = [
    {
      id: "tx_001",
      date: "2025-10-18T14:30:00Z",
      type: "sent",
      amount: 1250.50,
      address: "0x742d35Cc6634C0532925a3b8D4C2C4e1234567890",
      status: "confirmed",
      hash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
      memo: "Payment for freelance web development services - Project Alpha",
      networkFee: "0.0021",
      blockNumber: "18542891"
    },
    {
      id: "tx_002",
      date: "2025-10-18T12:15:00Z",
      type: "received",
      amount: 750.00,
      address: "0x8ba1f109551bD432803012645Hac189B3c9c3456",
      status: "confirmed",
      hash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab",
      memo: "Monthly salary payment",
      networkFee: "0.0018",
      blockNumber: "18542856"
    },
    {
      id: "tx_003",
      date: "2025-10-18T10:45:00Z",
      type: "recurring",
      amount: 500.00,
      address: "0x456789abcdef1234567890abcdef1234567890abcd",
      status: "pending",
      hash: "0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
      memo: "Monthly subscription payment to SaaS provider",
      frequency: "Monthly",
      nextPayment: "2025-11-18",
      networkFee: "0.0019",
      blockNumber: "18542823"
    },
    {
      id: "tx_004",
      date: "2025-10-17T16:20:00Z",
      type: "sent",
      amount: 2100.75,
      address: "0x789abcdef1234567890abcdef1234567890abcdef12",
      status: "confirmed",
      hash: "0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      memo: "Equipment purchase for office setup",
      networkFee: "0.0025",
      blockNumber: "18541992"
    },
    {
      id: "tx_005",
      date: "2025-10-17T14:10:00Z",
      type: "received",
      amount: 325.25,
      address: "0xabcdef1234567890abcdef1234567890abcdef1234",
      status: "failed",
      hash: "0x5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12",
      memo: "Refund for cancelled service",
      networkFee: "0.0015",
      blockNumber: "18541945"
    },
    {
      id: "tx_006",
      date: "2025-10-16T11:30:00Z",
      type: "recurring",
      amount: 150.00,
      address: "0xdef1234567890abcdef1234567890abcdef1234567",
      status: "confirmed",
      hash: "0x6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
      memo: "Weekly team lunch budget",
      frequency: "Weekly",
      nextPayment: "2025-10-23",
      networkFee: "0.0012",
      blockNumber: "18540876"
    },
    {
      id: "tx_007",
      date: "2025-10-15T09:45:00Z",
      type: "sent",
      amount: 875.00,
      address: "0x1234567890abcdef1234567890abcdef1234567890",
      status: "confirmed",
      hash: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
      memo: "Marketing campaign payment",
      networkFee: "0.0022",
      blockNumber: "18539654"
    },
    {
      id: "tx_008",
      date: "2025-10-14T15:20:00Z",
      type: "received",
      amount: 1800.50,
      address: "0x567890abcdef1234567890abcdef1234567890abcd",
      status: "processing",
      hash: "0x890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567",
      memo: "Client payment for consulting services",
      networkFee: "0.0028",
      blockNumber: "18538432"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFiltersChange = (filters) => {
    let filtered = [...transactions];

    // Filter by type
    if (filters?.type !== 'all') {
      filtered = filtered?.filter(tx => tx?.type === filters?.type);
    }

    // Filter by status
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(tx => tx?.status === filters?.status);
    }

    // Filter by date range
    if (filters?.dateFrom) {
      filtered = filtered?.filter(tx => new Date(tx.date) >= new Date(filters.dateFrom));
    }
    if (filters?.dateTo) {
      filtered = filtered?.filter(tx => new Date(tx.date) <= new Date(filters.dateTo));
    }

    // Filter by amount range
    if (filters?.amountMin) {
      filtered = filtered?.filter(tx => tx?.amount >= parseFloat(filters?.amountMin));
    }
    if (filters?.amountMax) {
      filtered = filtered?.filter(tx => tx?.amount <= parseFloat(filters?.amountMax));
    }

    // Filter by search
    if (filters?.search) {
      const searchLower = filters?.search?.toLowerCase();
      filtered = filtered?.filter(tx => 
        tx?.address?.toLowerCase()?.includes(searchLower) ||
        tx?.hash?.toLowerCase()?.includes(searchLower) ||
        (tx?.memo && tx?.memo?.toLowerCase()?.includes(searchLower)) ||
        tx?.amount?.toString()?.includes(searchLower)
      );
    }

    setFilteredTransactions(filtered);
    setSelectedTransactions([]); // Clear selection when filters change
  };

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleExport = (format) => {
    const selectedTxs = transactions?.filter(tx => selectedTransactions?.includes(tx?.id));
    
    if (format === 'csv') {
      // Mock CSV export
      const csvContent = selectedTxs?.map(tx => 
        `${tx?.date},${tx?.type},${tx?.amount},${tx?.address},${tx?.status},${tx?.hash}`
      )?.join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL?.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions_${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
      a?.click();
    } else if (format === 'pdf') {
      // Mock PDF export
      console.log('Exporting PDF for transactions:', selectedTxs);
    }
    
    setSelectedTransactions([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Transactions - CryptoPayAI</title>
        </Helmet>
        <Header />
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <div className="p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted/20 rounded w-1/4"></div>
              <div className="h-32 bg-muted/20 rounded"></div>
              <div className="h-96 bg-muted/20 rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Transactions - CryptoPayAI</title>
        <meta name="description" content="View and manage your USDC transaction history with advanced filtering and search capabilities." />
      </Helmet>
      <Header />
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Transaction History
              </h1>
              <p className="text-muted-foreground">
                View and manage your complete USDC payment history
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Icon name="Download" size={16} className="mr-2" />
                Export All
              </Button>
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                New Payment
              </Button>
            </div>
          </div>

          {/* Filters */}
          <TransactionFilters 
            onFiltersChange={handleFiltersChange}
            resultsCount={filteredTransactions?.length}
          />

          {/* Transaction Table */}
          <TransactionTable
            transactions={filteredTransactions}
            onTransactionClick={handleTransactionClick}
            selectedTransactions={selectedTransactions}
            onSelectionChange={setSelectedTransactions}
          />

          {/* Empty State */}
          {filteredTransactions?.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Receipt" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No transactions found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search criteria
              </p>
              <Button variant="outline">
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      {/* Bulk Actions */}
      <BulkActions
        selectedCount={selectedTransactions?.length}
        onExport={handleExport}
        onClearSelection={() => setSelectedTransactions([])}
      />
      {/* Transaction Modal */}
      <TransactionModal
        transaction={selectedTransaction}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTransaction(null);
        }}
      />
      <AIAssistantFloat />
    </div>
  );
};

export default TransactionsPage;