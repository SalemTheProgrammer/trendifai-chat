"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { X, Bot, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onClose();
      setStep(1);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-4xl transform rounded-2xl bg-blue-950/50 border border-blue-500/20 backdrop-blur-xl p-6 shadow-xl transition-all">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-blue-500/10 
                    transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-blue-400" />
                </button>

                {/* Progress bar */}
                <div className="w-full h-1 bg-blue-900/50 rounded-full mb-8">
                  <motion.div
                    className="h-full bg-blue-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Content */}
                <div className="mt-4">
                  <Dialog.Title className="text-2xl font-bold text-blue-200 mb-4">
                    {step === 1 && "Bienvenue dans la Démo"}
                    {step === 2 && "Explorez nos Solutions"}
                    {step === 3 && "Prêt à Commencer"}
                  </Dialog.Title>
                  
                  <div className="aspect-video rounded-lg overflow-hidden bg-blue-900/20 mb-6">
                    <div className="w-full h-full flex items-center justify-center p-8">
                      {step === 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-blue-400 text-center"
                        >
                          <Bot className="w-16 h-16 mx-auto mb-4" />
                          <p className="text-lg">Découvrez comment notre IA peut transformer votre entreprise</p>
                        </motion.div>
                      )}
                      {/* Add content for steps 2 and 3 */}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 rounded-lg border border-blue-500/20 
                        hover:bg-blue-500/10 text-blue-400 transition-colors duration-200"
                    >
                      Fermer
                    </button>
                    <button
                      onClick={nextStep}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700
                        hover:from-blue-500 hover:to-blue-600 text-white transition-colors duration-200
                        flex items-center gap-2"
                    >
                      {step === totalSteps ? "Terminer" : "Suivant"}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 