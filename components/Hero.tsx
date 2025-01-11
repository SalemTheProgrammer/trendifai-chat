"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { DemoModal } from "./DemoModal";

export default function AgentiaHero() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8">
            Solutions d&apos;
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Intelligence Artificielle
            </span>
            <br />
            pour l&apos;Entreprise de Demain
          </h1>
          
          <p className="text-xl text-blue-200/80 mb-12 max-w-3xl mx-auto">
            Transformez votre entreprise grâce à nos solutions d&apos;IA sur mesure.
            De l&apos;automatisation à l&apos;analyse prédictive, innovez avec Agentia.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowDemo(true)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl
                hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
            >
              Voir la Démo
            </button>

            <button className="px-8 py-3 bg-blue-950/50 hover:bg-blue-900/50 text-blue-400 rounded-xl
              transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50"
            >
              En savoir plus
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />
    </>
  );
}