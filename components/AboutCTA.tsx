"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function AboutCTA() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Prêt à Transformer Votre Entreprise ?
          </h2>
          <p className="text-xl text-blue-400/80 max-w-3xl mx-auto mb-12">
            Travaillons ensemble pour créer un avenir plus intelligent et efficace.
            Collaborez avec Agentia dès aujourd&apos;hui.
          </p>
          <button 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 
              text-white rounded-xl px-8 py-4 font-medium hover:shadow-lg hover:shadow-blue-500/30 
              transition-all duration-200 hover:scale-105 border border-blue-400/20"
          >
            <span>Commencer Maintenant</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
} 