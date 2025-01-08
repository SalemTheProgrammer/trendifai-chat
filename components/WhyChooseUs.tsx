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
    title: "Résultats garantis",
    description: "Optimisation des opérations et amélioration de l'expérience client avec des résultats mesurables.",
    icon: TrendingUp,
    metric: "30% réduction des coûts"
  },
  {
    title: "Experts de confiance",
    description: "Une équipe expérimentée dédiée à fournir des solutions IA éthiques et transparentes.",
    icon: Users,
    metric: "50+ experts IA"
  },
  {
    title: "Support 24/7",
    description: "Accompagnement continu de la stratégie à l'implémentation pour maximiser la valeur de vos solutions IA.",
    icon: HeadphonesIcon,
    metric: "Support illimité"
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950" />
      
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              backgroundColor: 'white',
              borderRadius: '50%',
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Pourquoi choisir notre agence IA ?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Innovez et optimisez votre entreprise grâce à nos solutions IA sur mesure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur" />
              <div className="relative bg-gray-900/60 backdrop-blur-lg rounded-2xl p-8 h-full border border-gray-700 transition-all duration-300 group-hover:-translate-y-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-3">
                    <benefit.icon className="w-full h-full text-white" />
                  </div>
                  <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                    {benefit.metric}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
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