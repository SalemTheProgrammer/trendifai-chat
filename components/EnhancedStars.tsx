"use client";

import { memo, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const EnhancedStars = memo(function EnhancedStars() {
  const generateStars = useCallback(() => {
    const stars: Star[] = [];
    const sizes = [1, 2, 3]; // Small, medium, large
    const counts = [700, 200, 100]; // Number of each size

    sizes.forEach((size, index) => {
      for (let i = 0; i < counts[index]; i++) {
        stars.push({
          id: stars.length,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size,
          duration: 2 + Math.random() * 4,
          delay: Math.random() * 2
        });
      }
    });

    return stars;
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {generateStars().map((star) => (
        <motion.div
          key={star.id}
          className={`absolute rounded-full bg-white transform-gpu`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: star.size === 3 ? '0 0 4px #fff' : 'none'
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}); 