import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import TransactionStatusIndicator from '../../../components/ui/TransactionStatusIndicator';

const TransactionTable = ({ transactions, onTransactionClick, selectedTransactions, onSelectionChange }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTransactions = [...transactions]?.sort((a, b) => {
    if (sortConfig?.key === 'date') {
      return sortConfig?.direction === 'asc' 
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
    if (sortConfig?.key === 'amount') {
      return sortConfig?.direction === 'asc' 
        ? a?.amount - b?.amount
        : b?.amount - a?.amount;
    }
    return 0;
  });

  const paginatedTransactions = sortedTransactions?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(transactions?.length / itemsPerPage);

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(paginatedTransactions?.map(t => t?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectTransaction = (transactionId, checked) => {
    if (checked) {
      onSelectionChange([...selectedTransactions, transactionId]);
    } else {
      onSelectionChange(selectedTransactions?.filter(id => id !== transactionId));
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    })?.format(amount);
  };

  const truncateAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  const getTypeIcon = (type) => {
    const icons = {
      sent: 'ArrowUpRight',
      received: 'ArrowDownLeft',
      recurring: 'RotateCcw'
    };
    return icons?.[type] || 'ArrowRight';
  };

  const getTypeColor = (type) => {
    const colors = {
      sent: 'text-error',
      received: 'text-success',
      recurring: 'text-primary'
    };
    return colors?.[type] || 'text-foreground';
  };

  const SortButton = ({ column, children }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center space-x-1 text-left font-medium text-foreground hover:text-primary transition-colors"
    >
      <span>{children}</span>
      <Icon 
        name={sortConfig?.key === column && sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
        size={14}
        className={sortConfig?.key === column ? 'text-primary' : 'text-muted-foreground'}
      />
    </button>
  );

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/20 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedTransactions?.length === paginatedTransactions?.length && paginatedTransactions?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border bg-input text-primary focus:ring-primary/50"
                />
              </th>
              <th className="px-6 py-4 text-left">
                <SortButton column="date">Date</SortButton>
              </th>
              <th className="px-6 py-4 text-left">Type</th>
              <th className="px-6 py-4 text-left">
                <SortButton column="amount">Amount</SortButton>
              </th>
              <th className="px-6 py-4 text-left">Address</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Hash</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions?.map((transaction) => (
              <tr 
                key={transaction?.id}
                className="border-b border-border hover:bg-muted/10 transition-colors cursor-pointer"
                onClick={() => onTransactionClick(transaction)}
              >
                <td className="px-6 py-4" onClick={(e) => e?.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedTransactions?.includes(transaction?.id)}
                    onChange={(e) => handleSelectTransaction(transaction?.id, e?.target?.checked)}
                    className="rounded border-border bg-input text-primary focus:ring-primary/50"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">
                    {formatDate(transaction?.date)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getTypeIcon(transaction?.type)} 
                      size={16} 
                      className={getTypeColor(transaction?.type)}
                    />
                    <span className="text-sm text-foreground capitalize">
                      {transaction?.type}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-mono text-foreground">
                    {formatAmount(transaction?.amount)} USDC
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-mono text-sm text-muted-foreground">
                    {truncateAddress(transaction?.address)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <TransactionStatusIndicator 
                    status={transaction?.status}
                    amount={transaction?.amount}
                    timestamp={transaction?.date}
                    hash={transaction?.hash}
                    size="small"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="font-mono text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                    {truncateAddress(transaction?.hash)}
                  </div>
                </td>
                <td className="px-6 py-4" onClick={(e) => e?.stopPropagation()}>
                  <Button variant="ghost" size="sm">
                    <Icon name="ExternalLink" size={14} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-4 p-4">
        {paginatedTransactions?.map((transaction) => (
          <div 
            key={transaction?.id}
            className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:bg-muted/10 transition-colors"
            onClick={() => onTransactionClick(transaction)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedTransactions?.includes(transaction?.id)}
                  onChange={(e) => {
                    e?.stopPropagation();
                    handleSelectTransaction(transaction?.id, e?.target?.checked);
                  }}
                  className="rounded border-border bg-input text-primary focus:ring-primary/50"
                />
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getTypeIcon(transaction?.type)} 
                    size={16} 
                    className={getTypeColor(transaction?.type)}
                  />
                  <span className="text-sm font-medium text-foreground capitalize">
                    {transaction?.type}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-medium text-foreground">
                  {formatAmount(transaction?.amount)} USDC
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(transaction?.date)}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Address:</span>
                <span className="font-mono text-sm text-foreground">
                  {truncateAddress(transaction?.address)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <TransactionStatusIndicator 
                  status={transaction?.status}
                  amount={transaction?.amount}
                  timestamp={transaction?.date}
                  hash={transaction?.hash}
                  size="small"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Hash:</span>
                <span className="font-mono text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                  {truncateAddress(transaction?.hash)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, transactions?.length)} of {transactions?.length} transactions
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            
            <span className="text-sm text-foreground px-3">
              {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;