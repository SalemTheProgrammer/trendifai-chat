"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function Earth() {
  const { scrollYProgress } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const earthY = useTransform(
    scrollYProgress,
    [0, 1],
    [windowHeight * 0.2, -windowHeight * 0.5]
  );

  const earthScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.8]
  );

  const earthRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 45]
  );

  return (
    <motion.div
      style={{
        y: earthY,
        scale: earthScale,
        rotate: earthRotate,
      }}
      className="fixed left-[10%] z-0 pointer-events-none hidden lg:block"
    >
      {/* Earth Planet */}
      <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.3)]">
        {/* Base color with gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 animate-gradient" />
        
        {/* Continents with subtle animation */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-green-700"
              initial={{ opacity: 0.5 }}
              animate={{ 
                opacity: [0.5, 0.7, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              style={{
                width: Math.random() * 150 + 50 + 'px',
                height: Math.random() * 150 + 50 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
        
        {/* Animated cloud layer */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              animate={{
                x: [0, 10, 0],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                width: Math.random() * 120 + 30 + 'px',
                height: Math.random() * 60 + 20 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
        
        {/* Enhanced atmosphere glow */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-transparent to-transparent animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-bl from-blue-300/10 via-transparent to-transparent animate-pulse delay-1000" />
        </div>
        
        {/* Animated polar ice caps */}
        <motion.div
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[70%] h-[20%] bg-white/30 blur-sm rounded-full"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            delay: 1.5,
            repeat: Infinity,
          }}
          className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[70%] h-[20%] bg-white/30 blur-sm rounded-full"
        />
      </div>
    </motion.div>
  );
} 