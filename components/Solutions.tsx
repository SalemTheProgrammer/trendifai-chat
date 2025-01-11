"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Bot, Zap } from "lucide-react";

const solutionsList = [
  {
    title: "IA Conversationnelle",
    description: "Agents intelligents qui comprennent et répondent en langage naturel",
    icon: Bot
  },
  {
    title: "Automatisation Avancée",
    description: "Optimisation des processus avec apprentissage continu",
    icon: Zap
  },
  {
    title: "Analyse Prédictive",
    description: "Anticipez les tendances grâce à l'intelligence artificielle",
    icon: Sparkles
  },
  {
    title: "Intégration Transparente",
    description: "Déploiement sans friction dans vos systèmes existants",
    icon: Check
  }
];

export function Solutions() {
  return (
    <section className="py-24 min-h-screen flex items-center relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-7xl font-bold text-blue-200 mb-6"
          >
            Transformer vos Idées en{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Solutions Intelligentes
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-blue-400/80 max-w-3xl mx-auto"
          >
            Découvrez la puissance de l&apos;IA pour innover et élever votre entreprise vers de nouveaux sommets.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Section with Enhanced Effects */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[600px]"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-3xl opacity-80 blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-blue-700/10 rounded-2xl" />
            <div className="relative h-full rounded-2xl overflow-hidden border border-blue-500/20 bg-blue-950/20 backdrop-blur-xl group">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              >
                <source src="/path-to-your-video.mp4" type="video/mp4" />
              </video>
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Floating elements */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.2, 1, 0.2],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Solutions List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 h-[600px] flex flex-col justify-between"
          >
            <div className="space-y-6">
              {solutionsList.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur" />
                  <div className="relative p-6 rounded-xl border border-blue-500/20 bg-blue-950/20 backdrop-blur-xl 
                    hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-2.5
                        group-hover:scale-110 transition-transform duration-200">
                        <solution.icon className="w-full h-full text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-blue-200 mb-1">
                          {solution.title}
                        </h3>
                        <p className="text-blue-400/80">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 
                text-white rounded-xl px-8 py-4 hover:shadow-lg hover:shadow-blue-500/30 
                transition-all duration-200 hover:scale-105 border border-blue-400/20"
            >
              <span>Découvrir nos solutions</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}