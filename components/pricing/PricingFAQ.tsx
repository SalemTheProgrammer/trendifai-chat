"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, bank transfers, and wire transfers. For enterprise solutions, we can also accommodate custom payment terms and schedules."
  },
  {
    question: "Are there any hidden costs or additional fees?",
    answer: "No, our pricing is transparent. The price quoted includes all development, implementation, and initial training costs. However, ongoing maintenance or additional customization requests may incur extra charges, which we'll always discuss upfront."
  },
  {
    question: "Do you offer custom pricing for enterprise solutions?",
    answer: "Yes, we offer tailored pricing for enterprise clients based on their specific needs, scale, and requirements. Contact us for a custom quote."
  },
  {
    question: "What's included in the implementation process?",
    answer: "Our implementation process includes initial consultation, solution design, development, testing, deployment, and staff training. We also provide documentation and ongoing support."
  },
  {
    question: "Do you offer refunds if we're not satisfied?",
    answer: "We work closely with clients throughout the development process to ensure satisfaction. While we don't offer direct refunds, we have a satisfaction guarantee and will work to resolve any issues until you're completely satisfied with the solution."
  },
  {
    question: "How long does implementation typically take?",
    answer: "Implementation timelines vary based on the complexity of the solution and your requirements. Typical projects range from 4-12 weeks, but we'll provide a specific timeline during our initial consultation."
  }
];

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden">
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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about our pricing and services
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="mb-4">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-purple-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-purple-500" />
                    )}
                  </div>
                  {openIndex === index && (
                    <p className="mt-4 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 






























