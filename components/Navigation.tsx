"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-[#0A051E]/40 backdrop-blur-xl border border-white/10 rounded-full px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-sm transform rotate-45" />
              </div>
              <span className="text-xl font-semibold text-white">AI Agency</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link href="/about" className="nav-button-ghost nav-button">
                About
              </Link>
              <Link href="/services" className="nav-button-ghost nav-button">
                Services
              </Link>
              <Link href="/pricing" className="nav-button-ghost nav-button">
                Pricing
              </Link>
              <Link href="/contact" className="nav-button-ghost nav-button">
                Contact
              </Link>
            </div>

            {/* Get Started Button - Desktop */}
            <div className="hidden lg:flex items-center">
              <Link
                href="https://calendly.com/themetaversecompany/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-6 py-2 font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-20 left-0 right-0 bg-[#0A051E]/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/about"
                  className="text-white hover:text-purple-400 transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="text-white hover:text-purple-400 transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/pricing"
                  className="text-white hover:text-purple-400 transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/contact"
                  className="text-white hover:text-purple-400 transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="https://calendly.com/themetaversecompany/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-6 py-3 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Get Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}