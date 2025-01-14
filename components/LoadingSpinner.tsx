import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 40, 
  color = "rgb(59, 130, 246)", // blue-500
  className = "" 
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className="relative"
        style={{
          width: size,
          height: size
        }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-current opacity-25"
          style={{ color }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            ease: "linear",
            repeat: Infinity,
          }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-1 rounded-full border-2 border-transparent border-t-current"
          style={{ color }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        {/* Center dot */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: size / 8,
            height: size / 8,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: color,
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </motion.div>
    </div>
  );
} 