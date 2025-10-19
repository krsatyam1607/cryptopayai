import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ selectedCount, onExport, onClearSelection }) => {
  if (selectedCount === 0) return null;

  const handleExportCSV = () => {
    onExport('csv');
  };

  const handleExportPDF = () => {
    onExport('pdf');
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-surface border border-border rounded-xl shadow-modal p-4 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Check" size={16} className="text-primary" />
          </div>
          <span className="text-foreground font-medium">
            {selectedCount} transaction{selectedCount !== 1 ? 's' : ''} selected
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
          >
            <Icon name="FileText" size={16} className="mr-2" />
            Export CSV
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPDF}
          >
            <Icon name="FileDown" size={16} className="mr-2" />
            Export PDF
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;