"use client";



import { motion } from "framer-motion";

import { Bot, Brain, LineChart, Workflow, Cpu } from "lucide-react";

import Link from "next/link";



const services = [

  {

    title: "AI Agents Development",

    description: "Build intelligent AI agents tailored to your business needs. From customer service bots to advanced decision-making agents, we create solutions that enhance productivity and efficiency.",

    icon: Bot,

    deliverables: [

      "Fully trained AI agents optimized for specific business functions",

      "Integration with platforms like Slack, CRM systems, or proprietary apps",

      "Custom-built knowledge base integration",

      "Continuous performance optimization"

    ],

    timeline: "4-6 weeks",

    gradient: "from-purple-600 to-pink-600"

  },

  {

    title: "Fine-Tuning & Training LLMs",

    description: "Customize pre-trained AI models like GPT to understand and cater to your unique business context.",

    icon: Brain,

    deliverables: [

      "Fine-tuned LLM trained on your proprietary data",

      "Domain-specific capabilities for customer queries",

      "API integration for seamless access",

      "Regular model updates and improvements"

    ],

    timeline: "6-8 weeks",

    gradient: "from-blue-600 to-purple-600",

    popular: true

  },

  {

    title: "Predictive Analytics",

    description: "Harness AI to predict trends, manage risks, and gain insights from your data for proactive decision-making.",

    icon: LineChart,

    deliverables: [

      "Predictive AI models built on your historical data",

      "Real-time dashboard for analytics and insights",

      "Training sessions for your team",

      "Monthly performance reports"

    ],

    timeline: "5-7 weeks",

    gradient: "from-pink-600 to-orange-600"

  },

  {

    title: "Workflow Automation",

    description: "Streamline your repetitive tasks and enhance efficiency with customized workflow automation solutions.",

    icon: Workflow,

    deliverables: [

      "Full workflow audit and process mapping",

      "Custom automation workflows",

      "Integration with existing tools",

      "Performance monitoring dashboard"

    ],

    timeline: "3-5 weeks",

    gradient: "from-purple-600 to-blue-600"

  },

  {

    title: "Custom AI Systems",

    description: "End-to-end automation of complex operations using cutting-edge AI technology tailored to your needs.",

    icon: Cpu,

    deliverables: [

      "Fully customized AI solutions",

      "ERP & CRM integration",

      "Scalable architecture",

      "24/7 monitoring and support"

    ],

    timeline: "6-8 weeks",

    gradient: "from-orange-600 to-pink-600"

  }

];



export function PricingTiers() {

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

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-glow">

            Explore Our Comprehensive<br />AI Service Plans

          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">

            Select from a range of productized AI solutions, or request a customized package 

            tailored to your business goals.

          </p>

        </motion.div>



        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service, index) => (

            <motion.div

              key={service.title}

              initial={{ opacity: 0, y: 20 }}

              whileInView={{ opacity: 1, y: 0 }}

              viewport={{ once: true }}

              transition={{ duration: 0.6, delay: index * 0.1 }}

              className="relative group"

            >

              <div className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-200`} />

              <div className="relative dark-card p-8 rounded-2xl h-full">

                {service.popular && (

                  <div className="absolute -top-4 left-0 right-0 flex justify-center">

                    <span className={`bg-gradient-to-r ${service.gradient} text-white px-4 py-1 rounded-full text-sm font-medium`}>

                      Most Popular

                    </span>

                  </div>

                )}

                

                <div className="flex items-center space-x-4 mb-6">

                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.gradient} p-2.5 flex items-center justify-center`}>

                    <service.icon className="w-full h-full text-white" />

                  </div>

                  <h3 className="text-2xl font-semibold text-white">{service.title}</h3>

                </div>

                

                <p className="text-gray-400 mb-6">{service.description}</p>

                

                <div className="space-y-4 mb-6">

                  <h4 className="text-lg font-semibold text-white">Deliverables:</h4>

                  <ul className="space-y-2">

                    {service.deliverables.map((item, i) => (

                      <li key={i} className="text-gray-400 flex items-start">

                        <span className="text-purple-500 mr-2">•</span>

                        {item}

                      </li>

                    ))}

                  </ul>

                </div>

                

                <div className="space-y-4 mb-8">

                  <div className="flex justify-between items-center">

                    <span className="text-gray-400">Timeline</span>

                    <span className="text-white font-semibold">{service.timeline}</span>

                  </div>

                </div>

                

                <Link

                  href="/contact"

                  className={`w-full flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r ${service.gradient} text-white hover:shadow-lg hover:scale-105`}

                >

                  Get Started

                </Link>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );

} 




























































































































































































































































