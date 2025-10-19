import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TransactionFilters = ({ onFiltersChange, resultsCount = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: '',
    search: ''
  });

  const transactionTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'sent', label: 'Sent' },
    { value: 'received', label: 'Received' },
    { value: 'recurring', label: 'Recurring' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      type: 'all',
      status: 'all',
      dateFrom: '',
      dateTo: '',
      amountMin: '',
      amountMax: '',
      search: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value !== '' && value !== 'all'
  );

  return (
    <div className="bg-surface border border-border rounded-xl p-6 mb-6">
      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <span className="font-semibold text-foreground">Filters</span>
          {hasActiveFilters && (
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>
      {/* Filter Controls */}
      <div className={`space-y-4 ${!isExpanded ? 'hidden lg:block' : ''}`}>
        {/* Search Bar */}
        <div className="w-full">
          <Input
            type="search"
            placeholder="Search by address, amount, or memo..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Filter Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Transaction Type
            </label>
            <select
              value={filters?.type}
              onChange={(e) => handleFilterChange('type', e?.target?.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {transactionTypes?.map(type => (
                <option key={type?.value} value={type?.value}>
                  {type?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Status
            </label>
            <select
              value={filters?.status}
              onChange={(e) => handleFilterChange('status', e?.target?.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {statusOptions?.map(status => (
                <option key={status?.value} value={status?.value}>
                  {status?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date From */}
          <div>
            <Input
              type="date"
              label="From Date"
              value={filters?.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
            />
          </div>

          {/* Date To */}
          <div>
            <Input
              type="date"
              label="To Date"
              value={filters?.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
            />
          </div>
        </div>

        {/* Filter Row 2 - Amount Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Input
              type="number"
              label="Min Amount (USDC)"
              placeholder="0.00"
              value={filters?.amountMin}
              onChange={(e) => handleFilterChange('amountMin', e?.target?.value)}
            />
          </div>

          <div>
            <Input
              type="number"
              label="Max Amount (USDC)"
              placeholder="10000.00"
              value={filters?.amountMax}
              onChange={(e) => handleFilterChange('amountMax', e?.target?.value)}
            />
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="w-full"
            >
              <Icon name="X" size={16} className="mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Search" size={16} />
            <span>
              {resultsCount} transaction{resultsCount !== 1 ? 's' : ''} found
            </span>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center space-x-2 text-sm text-primary">
              <Icon name="Filter" size={16} />
              <span>Filters active</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;