"use client";

import { motion } from "framer-motion";

export function AboutVision() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#120B2E] to-[#0A051E]" />
      <div className="absolute inset-0 grid-overlay opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-600/30 rounded-full filter blur-[128px] pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-pink-600/30 rounded-full filter blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Vision: Empowering Businesses to
            <br />
            Harness the Power of AI
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 blur-xl" />
          <div className="relative dark-card rounded-2xl p-8 md:p-12">
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                At AI Automation Agency, we envision a future where businesses of all sizes seamlessly 
                integrate artificial intelligence into their daily operations. Our mission is to 
                <span className="text-white font-semibold"> democratize AI </span>
                by making it accessible, scalable, and transformative.
              </p>
              
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                Whether you're a medium-sized enterprise or a large corporation, we work as your trusted 
                partner to automate processes, reduce human intervention, and ensure that your operations 
                are smooth, cost-effective, and exceptionally productive.
              </p>

              <p className="text-xl text-gray-400 leading-relaxed">
                AI isn't just a tool for innovation—it's the foundation of the
                <span className="text-white font-semibold"> next industrial revolution</span>. 
                By partnering with us, you take a step toward future-proofing your business, 
                boosting efficiency, and achieving sustainable growth in an increasingly 
                competitive market.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}