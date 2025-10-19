import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickSuggestions = ({ onSuggestionClick, isVisible = true }) => {
  const suggestions = [
    {
      text: "Schedule monthly payment",
      icon: "Calendar",
      category: "scheduling"
    },
    {
      text: "Explain last transaction",
      icon: "HelpCircle",
      category: "explanation"
    },
    {
      text: "Check wallet security",
      icon: "Shield",
      category: "security"
    },
    {
      text: "USDC best practices",
      icon: "BookOpen",
      category: "education"
    },
    {
      text: "Payment optimization tips",
      icon: "TrendingUp",
      category: "optimization"
    },
    {
      text: "Transaction fees explained",
      icon: "DollarSign",
      category: "fees"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="Lightbulb" size={16} className="text-emerald-400" />
        <span className="text-sm font-medium text-gray-300">Quick suggestions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions?.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion?.text)}
            className="
              flex items-center space-x-2 px-3 py-2 rounded-full text-sm
              bg-gray-800 border border-gray-700 text-gray-300
              hover:bg-gray-700 hover:border-gray-600 hover:text-gray-100
              transition-all duration-200 glow-hover
            "
          >
            <Icon name={suggestion?.icon} size={14} />
            <span>{suggestion?.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickSuggestions;