"use client";

import { memo, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const StarField = memo(function StarField() {
  const controls = useAnimation();

  const generateStars = useCallback(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {generateStars().map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full transform-gpu"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.scale * 0.5,
          }}
          animate={{
            opacity: [star.scale * 0.5, star.scale, star.scale * 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}); 