"use client";

import { motion } from "framer-motion";
import { Brain, Shield, TrendingUp, Settings, Users, Sparkles, HeadphonesIcon } from "lucide-react";

const benefits = [
  {
    title: "Solutions IA sur mesure",
    description: "Notre équipe d'experts conçoit des solutions IA personnalisées qui s'intègrent parfaitement à vos processus existants.",
    icon: Brain,
    metric: "100+ solutions déployées"
  },
  {
    title: "Technologie de pointe",
    description: "Nous exploitons les derniers modèles de langage et outils d'automatisation pour garder votre entreprise compétitive.",
    icon: Sparkles,
    metric: "15+ modèles IA intégrés"
  },
  {
    title: "Sécurité maximale",
    description: "Protection robuste de vos données avec une évolutivité transparente pour accompagner votre croissance.",
    icon: Shield,
    metric: "99.9% disponibilité"
  },
  {
    title: "Support 24/7",
    description: "Une équipe dédiée disponible en permanence pour assurer le bon fonctionnement de vos solutions.",
    icon: HeadphonesIcon,
    metric: "24/7 support"
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-6">
            Pourquoi Choisir Agentia ?
          </h2>
          <p className="text-xl text-blue-400/80 max-w-3xl mx-auto">
            Innovez et optimisez votre entreprise grâce à nos solutions IA sur mesure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur" />
              <div className="relative p-6 rounded-xl border border-blue-500/20 bg-blue-950/20 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-3">
                    <benefit.icon className="w-full h-full text-white" />
                  </div>
                  <span className="text-sm font-medium text-blue-400">
                    {benefit.metric}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-blue-200 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-blue-400/80">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;