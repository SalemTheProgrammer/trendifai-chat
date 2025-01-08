"use client";



import { motion } from "framer-motion";

import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";

import Link from "next/link";



const contactInfo = [

  {

    icon: Mail,

    label: "Email",

    value: "info@aiautomationagency.xyz",

    href: "mailto:info@aiautomationagency.xyz"

  },

  {

    icon: Phone,

    label: "Phone",

    value: "020 8058 6160",

    href: "tel:+442080586160"

  },

  {

    icon: MapPin,

    label: "Address",

    value: "71-75 Shelton Street, Covent Garden, London, UK",

    href: "https://maps.google.com/?q=71-75+Shelton+Street+Covent+Garden+London"

  }

];



const socialLinks = [

  {

    icon: Linkedin,

    href: "#",

    label: "LinkedIn"

  },

  {

    icon: Twitter,

    href: "#",

    label: "Twitter"

  }

];



export function ContactDetails() {

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

          <h2 className="text-4xl font-bold text-white mb-6">

            Prefer to Reach Out Directly?

          </h2>

          <p className="text-xl text-gray-400">

            Connect with us through any of these channels

          </p>

        </motion.div>



        <div className="grid md:grid-cols-3 gap-8 mb-16">

          {contactInfo.map((item, index) => (

            <motion.div

              key={item.label}

              initial={{ opacity: 0, y: 20 }}

              whileInView={{ opacity: 1, y: 0 }}

              viewport={{ once: true }}

              transition={{ duration: 0.6, delay: index * 0.1 }}

            >

              <Link

                href={item.href}

                target={item.icon === MapPin ? "_blank" : "_self"}

                className="relative group dark-card p-8 rounded-2xl block hover:scale-105 transition-all duration-200"

              >

                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 blur group-hover:opacity-30 transition-opacity" />

                <div className="relative">

                  <item.icon className="w-8 h-8 text-purple-500 mb-4" />

                  <h3 className="text-lg font-semibold text-white mb-2">{item.label}</h3>

                  <p className="text-gray-400">{item.value}</p>

                </div>

              </Link>

            </motion.div>

          ))}

        </div>



        <motion.div

          initial={{ opacity: 0, y: 20 }}

          whileInView={{ opacity: 1, y: 0 }}

          viewport={{ once: true }}

          transition={{ duration: 0.6 }}

          className="flex justify-center space-x-6"

        >

          {socialLinks.map((item) => (

            <Link

              key={item.label}

              href={item.href}

              target="_blank"

              rel="noopener noreferrer"

              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"

            >

              <item.icon className="w-6 h-6 text-white" />

              <span className="sr-only">{item.label}</span>

            </Link>

          ))}

        </motion.div>

      </div>

    </section>

  );

} 


