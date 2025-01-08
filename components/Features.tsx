"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "Accurate Sales Forecasting",
    description: "Predict future sales with precision using our AI-powered analytics engine",
    image: "/dashboard-1.png"
  },
  {
    title: "Visual Sales Pipeline",
    description: "Track and optimize your entire sales process with intuitive visualizations",
    image: "/dashboard-2.png"
  },
  {
    title: "Reporting & Analytics",
    description: "Get deep insights into your sales performance with advanced reporting",
    image: "/dashboard-3.png"
  }
];

export function Features() {
  return (
    <div className="py-24 relative">
      <div className="absolute inset-0 purple-glow opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            Key Features To Boost Your
            <br />
            Sales Performance
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="dark-card rounded-xl overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              <div className="aspect-[16/9] relative">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={800}
                  height={450}
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}