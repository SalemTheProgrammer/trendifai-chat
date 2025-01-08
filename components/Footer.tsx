"use client";

import { Mail, Phone, Linkedin, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0A051E] to-black">
      {/* Pink Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Row 1: Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Transforming Businesses with Intelligent
            <br />
            Automation and AI Solutions
          </h2>
        </motion.div>

        {/* Row 2: Contact Information and Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          {/* Contact Information */}
          <div className="flex flex-col space-y-4 items-center md:items-start mb-8 md:mb-0">
            {/* Email */}
            <Link
              href="mailto:info@aiautomationagency.xyz"
              className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200 group"
            >
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-200">
                <Mail className="w-5 h-5" />
              </div>
              <span>info@aiautomationagency.xyz</span>
            </Link>

            {/* Phone */}
            <Link
              href="tel:02080586160"
              className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200 group"
            >
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-200">
                <Phone className="w-5 h-5" />
              </div>
              <span>020 8058 6160</span>
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            {[
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Instagram, href: "#", label: "Instagram" }
            ].map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="group relative"
                aria-label={social.label}
              >
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-200" />
                <div className="relative p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-200">
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} AI Automation Agency. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}