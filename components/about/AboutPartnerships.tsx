"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "AI Automation Agency transformed our operations completely. The ROI has been incredible.",
    author: "Alex Prindiville",
    role: "CEO, AP Homes",
    rating: 5
  },
  {
    quote: "Their expertise in AI implementation is unmatched. A game-changer for our business.",
    author: "Kenneth Blaber",
    role: "Director, Autoboutique",
    rating: 5
  },
  {
    quote: "The level of customization and support we received was exceptional.",
    author: "Sarah louis",
    role: "CTO, H2H investments",
    rating: 5
  }
];

export function AboutPartnerships() {
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
            Your Trusted AI Partner
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            AI is no longer a luxury; it's a necessity for businesses looking to scale 
            and compete in the modern world.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 blur-xl" />
            <div className="relative dark-card rounded-2xl p-8">
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                At AI Automation Agency, we pride ourselves on working with medium and large 
                businesses as their dedicated AI partners.
              </p>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                From automating day-to-day processes to revolutionizing customer experiences, 
                our solutions are designed to minimize costs, maximize efficiency, and drive 
                unparalleled growth.
              </p>
              <p className="text-xl text-gray-400 leading-relaxed">
                With a focus on transparency, collaboration, and cutting-edge innovation, 
                we empower businesses to focus on what matters most—strategic growth and 
                innovation—while we handle the complexities of AI integration.
              </p>
            </div>
          </motion.div>

          {/* Right Side - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 blur-xl" />
            <div className="relative dark-card rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-white mb-2">30%</div>
                <div className="text-gray-400">Average Cost Reduction</div>
              </div>
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-white mb-2">200+</div>
                <div className="text-gray-400">Successful Implementations</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400">Support & Monitoring</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 blur-xl" />
              <div className="relative dark-card rounded-2xl p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-400 mb-4">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}