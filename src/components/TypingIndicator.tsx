
import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center chat-ai-bubble">
        <Bot className="w-4 h-4" />
      </div>

      {/* Typing Animation */}
      <div className="max-w-[70%]">
        <div className="inline-block px-4 py-3 rounded-2xl rounded-bl-md chat-ai-bubble">
          <div className="flex items-center gap-1">
            <span className="text-sm chat-typing font-medium">Escribiendo</span>
            <div className="flex gap-1 ml-2">
              <div className="w-1 h-1 bg-current rounded-full animate-bounce-dots"></div>
              <div className="w-1 h-1 bg-current rounded-full animate-bounce-dots" style={{ animationDelay: '0.16s' }}></div>
              <div className="w-1 h-1 bg-current rounded-full animate-bounce-dots" style={{ animationDelay: '0.32s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
