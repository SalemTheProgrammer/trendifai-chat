"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-blue-200 mb-4">Agentia</h3>
            <p className="text-blue-400/80 mb-4">
              Solutions d&apos;Intelligence Artificielle pour l&apos;Entreprise de Demain
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <button
                  key={index}
                  className="w-8 h-8 rounded-lg bg-blue-950/50 flex items-center justify-center 
                    hover:bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-200"
                >
                  <Icon className="w-4 h-4 text-blue-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-blue-200 mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              {['Solutions', 'Services', 'À Propos', 'Contact'].map((item) => (
                <li key={item}>
                  <button className="text-blue-400/80 hover:text-blue-400">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-blue-200 mb-4">Contact</h3>
            <ul className="space-y-3">
              {[
                { icon: Mail, text: 'contact@agentia.ai' },
                { icon: Phone, text: '+33 1 23 45 67 89' },
                { icon: MapPin, text: 'Paris, France' }
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400/80">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-blue-200 mb-4">Newsletter</h3>
            <p className="text-blue-400/80 mb-4">
              Restez informé des dernières innovations en IA
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 rounded-lg border border-blue-500/20 bg-blue-950/20 
                  backdrop-blur-xl text-blue-200 placeholder-blue-400/50 focus:outline-none 
                  focus:border-blue-500/50"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 
                  text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 
                  transition-all duration-200"
              >
                S&apos;abonner
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-blue-500/20 text-center">
          <p className="text-blue-400/80">
            © {new Date().getFullYear()} Agentia. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}