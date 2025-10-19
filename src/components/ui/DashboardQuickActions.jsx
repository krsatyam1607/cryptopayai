import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';


const DashboardQuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Send Payment',
      description: 'Transfer USDC to any wallet',
      icon: 'Send',
      color: 'primary',
      action: () => navigate('/payments?action=send'),
      shortcut: 'S'
    },
    {
      title: 'Receive Payment',
      description: 'Generate payment request',
      icon: 'Download',
      color: 'secondary',
      action: () => navigate('/payments?action=receive'),
      shortcut: 'R'
    },
    {
      title: 'Schedule Payment',
      description: 'Set up recurring transfers',
      icon: 'Clock',
      color: 'accent',
      action: () => navigate('/payments?action=schedule'),
      shortcut: 'T'
    },
    {
      title: 'AI Assistant',
      description: 'Get payment guidance',
      icon: 'Bot',
      color: 'success',
      action: () => navigate('/assistant'),
      shortcut: 'A'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 hover:shadow-glow',
      secondary: 'bg-secondary/10 border-secondary/20 text-secondary hover:bg-secondary/20 hover:shadow-glow-emerald',
      accent: 'bg-accent/10 border-accent/20 text-accent hover:bg-accent/20 hover:shadow-glow',
      success: 'bg-success/10 border-success/20 text-success hover:bg-success/20 hover:shadow-glow-emerald'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickActions?.map((action, index) => (
        <button
          key={index}
          onClick={action?.action}
          className={`
            group relative p-6 rounded-xl border transition-all duration-200 text-left
            ${getColorClasses(action?.color)}
            glow-hover spring-transition
          `}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`
              w-12 h-12 rounded-lg flex items-center justify-center
              ${action?.color === 'primary' ? 'bg-primary/20' : ''}
              ${action?.color === 'secondary' ? 'bg-secondary/20' : ''}
              ${action?.color === 'accent' ? 'bg-accent/20' : ''}
              ${action?.color === 'success' ? 'bg-success/20' : ''}
            `}>
              <Icon name={action?.icon} size={24} />
            </div>
            
            <div className="text-xs font-mono bg-muted/50 px-2 py-1 rounded opacity-60 group-hover:opacity-100 transition-opacity">
              {action?.shortcut}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-1 group-hover:text-current transition-colors">
              {action?.title}
            </h3>
            <p className="text-sm text-muted-foreground group-hover:text-current/80 transition-colors">
              {action?.description}
            </p>
          </div>
          
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Icon name="ArrowRight" size={16} />
          </div>
        </button>
      ))}
    </div>
  );
};

export default DashboardQuickActions;