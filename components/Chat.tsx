import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { formatMessageDate } from '@/lib/dateUtils';
import { memo } from 'react';
import { useState, useRef } from 'react';

interface Message {
  id: string;
  content: string;
  created_at: string;
  role: 'user' | 'assistant' | 'system';
}

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function Chat({ messages, loading, onSend }: {
  messages: Message[],
  loading?: boolean,
  onSend: (message: string) => void
}) {
  return (
    <div className="flex flex-col h-screen">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {loading && <TypingIndicator />}
        </AnimatePresence>
      </div>

      {/* Input */}
      <MessageInput onSend={onSend} disabled={loading} />
    </div>
  );
}

const MessageBubble = memo(function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const formattedDate = formatMessageDate(message.created_at);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      layout="position"
      layoutId={message.id}
    >
      <div className={`max-w-[80%] ${isUser ? 'bg-blue-600' : 'bg-blue-900/40'} 
        rounded-2xl px-4 py-2 shadow-lg transform-gpu`}>
        <p className="text-sm text-blue-100">{message.content}</p>
        <p className="text-xs text-blue-300/60 mt-1">{formattedDate}</p>
      </div>
    </motion.div>
  );
});

export function MessageInput({ onSend, disabled }: MessageInputProps): JSX.Element {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setMessage(textarea.value);
    
    // Auto-resize textarea
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="border-t border-blue-500/20 bg-blue-950/30 p-4"
    >
      <div className="flex items-end gap-2 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Écrivez votre message..."
            disabled={disabled}
            rows={1}
            className="w-full resize-none rounded-xl bg-blue-900/40 border border-blue-500/20 
              px-4 py-3 text-blue-100 placeholder-blue-400/50 focus:outline-none focus:border-blue-500/50
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style={{
              minHeight: '44px',
              maxHeight: '200px'
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="flex-shrink-0 rounded-xl bg-blue-600 p-3 text-white 
            hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
            disabled:hover:bg-blue-600 transition-colors"
        >
          {disabled ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-2 text-blue-400/60"
    >
      <Loader2 className="w-4 h-4 animate-spin" />
      <span className="text-sm">Assistant is typing...</span>
    </motion.div>
  );
} 