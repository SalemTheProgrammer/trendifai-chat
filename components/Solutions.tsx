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
    <section className="py-32 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
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
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-400/80 max-w-3xl mx-auto"
          >
            Découvrez la puissance de l&apos;IA pour innover et élever votre entreprise vers de nouveaux sommets.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Workflow Demo - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[600px] flex flex-col"
          >
            <div className="flex-1 flex flex-col rounded-2xl bg-gradient-to-br from-blue-600/10 to-blue-700/10 p-4 sm:p-10 
              border border-blue-500/20 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="bg-blue-900/30 self-end text-balance rounded-2xl rounded-br-none px-2.5 py-2 text-[0.8125rem]">
                <div className="line-clamp-1">lorsque je reçois un nouvel e-mail, étiqueter comme &apos;professionnel&apos; ou &apos;personnel&apos;</div>
              </div>
              
              <div className="mt-2 flex-1 bg-blue-950/30 border-blue-500/20 flex flex-col space-y-4 rounded-2xl border p-6 
                shadow-[0px_0px_39.900001525878906px_-4px_rgba(37,99,235,0.1)]"
              >
                <div className="flex items-center space-x-2">
                  <div className="flex aspect-square w-fit h-fit shrink-0 items-center justify-center rounded-full border p-1.5 bg-blue-900/40 border-blue-500/40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256" className="w-5 h-5 text-blue-400" aria-hidden="true">
                      <path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"></path>
                    </svg>
                  </div>
                  <h3 className="tracking-tight text-blue-200 line-clamp-1 text-sm font-medium">Notifications Quotidiennes à 8h</h3>
                </div>
                
                <div className="flex-1 space-y-2.5">
                  <div className="space-y-2">
                    <div className="text-blue-400/60 text-xs font-medium">CONDITION</div>
                    <p className="text-sm text-blue-300">Quand je reçois un nouvel e-mail</p>
                  </div>
                </div>
                
                <div className="space-y-2.5">
                  <div className="text-blue-400/60 text-xs font-medium">PROCESSUS</div>
                  <ul className="space-y-2">
                    <li className="flex flex-col gap-2 sm:flex-row sm:items-center border-blue-500/20 border-b pb-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-400/60" aria-hidden="true" viewBox="0 0 32 32">
                        <path fill="currentColor" d="M16.58,19.1068l-12.69-8.0757A3,3,0,0,1,7.1109,5.97l9.31,5.9243L24.78,6.0428A3,3,0,0,1,28.22,10.9579Z"></path>
                      </svg>
                      <p className="text-sm text-blue-300 line-clamp-1">Récupérer tous les nouveaux e-mails entrants</p>
                    </li>
                    <li className="flex flex-col gap-2 sm:flex-row sm:items-center border-none pb-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-400/60" aria-hidden="true" viewBox="0 0 32 32">
                        <path fill="currentColor" d="M16.58,19.1068l-12.69-8.0757A3,3,0,0,1,7.1109,5.97l9.31,5.9243L24.78,6.0428A3,3,0,0,1,28.22,10.9579Z"></path>
                      </svg>
                      <p className="text-sm text-blue-300 line-clamp-1">Étiqueter tous les e-mails comme &apos;professionnel&apos; ou &apos;personnel&apos;</p>
                    </li>
                  </ul>
                </div>
                
                <div className="xxs:flex-row flex flex-col items-center justify-end gap-2">
                  <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 border-blue-500/20 bg-blue-950/30 hover:bg-blue-900/30 text-blue-300 border shadow-sm h-8 px-3 text-xs w-full xxs:w-fit rounded">
                    Annuler
                  </button>
                  <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 shadow h-8 px-3 text-xs w-full xxs:w-fit rounded">
                    Sauvegarder et Approuver
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Solutions List - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[600px] flex flex-col"
          >
            <div className="flex-1 space-y-4">
              {solutionsList.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative p-6 rounded-xl border border-blue-500/20 bg-blue-950/20 backdrop-blur-xl 
                    hover:scale-[1.02] transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-2.5
                        group-hover:scale-110 transition-transform duration-200 shadow-lg shadow-blue-500/20"
                      >
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
              transition={{ duration: 0.6 }}
              className="group relative w-full mt-4 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 
                p-1 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                bg-[conic-gradient(from_0deg_at_50%_50%,blue_0deg,purple_120deg,violet_240deg,blue_360deg)]
                animate-spin-slower [--tw-gradient-stops:theme(colors.blue.600),theme(colors.purple.600),theme(colors.blue.600)]"
              />
              <div className="relative flex items-center justify-center gap-2 rounded-lg bg-blue-950/90 px-8 py-4 
                transition-all duration-300 group-hover:bg-blue-950/80"
              >
                <span className="font-semibold text-blue-200 text-lg">
                  Découvrir nos solutions
                </span>
                <ArrowRight className="w-5 h-5 text-blue-200 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}