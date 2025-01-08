"use client";

import { motion } from "framer-motion";
import { 
  Brain, 
  Shield, 
  TrendingUp, 
  Settings, 
  Users,
  Sparkles,
  HeadphonesIcon
} from "lucide-react";

const benefits = [
  {
    title: "Bespoke AI Solutions",
    description: "Every business is unique, and so are its challenges. Our team of AI experts crafts customized automation and AI solutions that seamlessly integrate with your workflows.",
    icon: Brain,
    metric: "100+ Custom Solutions Delivered"
  },
  {
    title: "Cutting-Edge Technology",
    description: "We leverage the latest advancements in AI, including large language models and automation tools, to deliver state-of-the-art solutions that keep your business ahead.",
    icon: Sparkles,
    metric: "15+ AI Models Integrated"
  },
  {
    title: "Scalable and Secure",
    description: "Our AI solutions are designed to grow with your business. With a focus on robust security protocols, we ensure your data is protected while enabling seamless scalability.",
    icon: Shield,
    metric: "99.9% Uptime Guaranteed"
  },
  {
    title: "Real Results, Proven Success",
    description: "From enhancing customer experiences to streamlining operations, our AI-driven strategies have helped businesses reduce costs and improve productivity significantly.",
    icon: TrendingUp,
    metric: "30% Average Cost Reduction"
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial opacity-20" />
      <div className="absolute inset-0 grid-overlay opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose AI Automation Agency?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We Deliver Results, Not Just Promises
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-200" />
              <div className="relative dark-card p-8 rounded-2xl">
                <div className="flex items-start space-x-4">
                  <benefit.icon className="w-12 h-12 text-purple-500 mt-1" />
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400 mb-4">{benefit.description}</p>
                    <div className="inline-block bg-purple-600/20 px-4 py-2 rounded-full">
                      <p className="text-purple-300 font-semibold">{benefit.metric}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="relative dark-card p-8 rounded-2xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 blur transition-all duration-200" />
            <div className="relative">
              <p className="text-2xl text-gray-300 italic mb-6">
                "The AI solutions provided by the team have transformed our business operations, 
                reducing manual work by 70% and improving customer satisfaction significantly."
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">Sarah Johnson</p>
                  <p className="text-gray-400">CEO, TechCorp Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 






























































































































