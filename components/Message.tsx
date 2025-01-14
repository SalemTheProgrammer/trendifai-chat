import { motion } from "framer-motion";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MessageProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export function Message({ content, role, timestamp }: MessageProps) {
  const isUser = role === 'user';
  const formattedDate = formatDistanceToNow(new Date(timestamp), { 
    addSuffix: true,
    locale: fr 
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] p-4 rounded-xl ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-blue-950/50 border border-blue-500/20 text-blue-200'
        }`}
      >
        <p className="text-sm">{content}</p>
        <p className="text-xs opacity-60 mt-1">{formattedDate}</p>
      </div>
    </motion.div>
  );
} 