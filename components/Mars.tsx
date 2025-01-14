"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function Mars() {
  const { scrollYProgress } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const marsY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -windowHeight * 0.3]
  );

  return (
    <motion.div
      style={{ y: marsY }}
      className="fixed right-[10%] top-[15%] z-0 pointer-events-none hidden lg:block"
    >
      <div className="space">
        <div className="planet">
          <div className="mars">
            <div className="img-map"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 