
import React from 'react';
import { Message } from './ChatContainer';
import { User, Bot } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isError = message.content.startsWith('❌');

  return (
    <div 
      className={`flex items-start gap-3 animate-fade-in ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div 
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'chat-user-bubble' 
            : isError 
              ? 'bg-destructive'
              : 'chat-ai-bubble'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Message Content */}
      <div 
        className={`max-w-[70%] ${
          isUser ? 'text-right' : 'text-left'
        }`}
      >
        <div 
          className={`inline-block px-4 py-3 rounded-2xl shadow-sm ${
            isUser 
              ? 'chat-user-bubble rounded-br-md' 
              : isError
                ? 'bg-destructive/10 border border-destructive/20 text-destructive rounded-bl-md'
                : 'chat-ai-bubble rounded-bl-md'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        
        {/* Timestamp */}
        <div 
          className={`text-xs text-muted-foreground mt-1 ${
            isUser ? 'text-right' : 'text-left'
          }`}
        >
          {message.timestamp.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
};
