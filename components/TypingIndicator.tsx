import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 p-3">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            initial={{ opacity: 0.5, y: 0 }}
            animate={{ opacity: 1, y: -3 }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: dot * 0.2,
            }}
            className="w-1.5 h-1.5 bg-blue-400 rounded-full"
          />
        ))}
      </div>
      <span className="text-sm text-blue-400/80">Assistant écrit...</span>
    </div>
  );
} 