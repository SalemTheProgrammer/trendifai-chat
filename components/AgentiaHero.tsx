import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const AgentiaHero = memo(function AgentiaHero() {
  const [text, setText] = useState("");
  const fullText = "Transformez votre entreprise grâce à nos solutions d'IA sur mesure. De l'automatisation à l'analyse prédictive, innovez avec Agentia.";
  
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-100 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Intelligence Artificielle
          <span className="text-blue-400"> pour l&apos;Entreprise</span>
        </motion.h1>

        <motion.p 
          className="text-lg sm:text-xl text-blue-200 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link 
            href="/dashboard" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl
              bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors
              duration-200 transform-gpu hover:scale-105"
          >
            Commencer maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl
              bg-blue-900/40 hover:bg-blue-800/40 text-blue-200 font-medium
              border border-blue-500/20 transition-colors duration-200
              transform-gpu hover:scale-105"
          >
            Nous contacter
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default AgentiaHero; 