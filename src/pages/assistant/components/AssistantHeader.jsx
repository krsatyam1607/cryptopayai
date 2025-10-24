import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssistantHeader = ({ onClearChat, messageCount = 0, isVoiceEnabled, onToggleVoice }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-900/50">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center">
            <Icon name="Bot" size={24} className="text-gray-950" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-gray-900 flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-100"> Solaris - A CryptoPayAI Assistant</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Online • Voice {isVoiceEnabled ? 'Enabled' : 'Muted'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {messageCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearChat}
            className="text-gray-400 hover:text-gray-300"
          >
            <Icon name="Trash2" size={16} className="mr-2" />
            Clear Chat
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleVoice}
          className="text-gray-400 hover:text-gray-300"
        >
          <Icon name={isVoiceEnabled ? 'Volume2' : 'VolumeX'} size={18} className="mr-2" />
          {isVoiceEnabled ? 'Voice On' : 'Voice Off'}
        </Button>

        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300">
          <Icon name="MoreVertical" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default AssistantHeader;
