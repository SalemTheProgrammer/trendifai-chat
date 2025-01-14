"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mic, X, StopCircle } from "lucide-react";
import { useState, useEffect } from "react";

export function VoiceChatBubble({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");

  const startRecording = () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert("Voice recording is not supported in your browser");
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setIsRecording(true);
        // Simulate transcription
        setTranscription("Écoute en cours...");
      })
      .catch(err => {
        console.error("Error accessing microphone:", err);
        alert("Unable to access microphone");
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    setTranscription("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* ChatGPT-style Voice Interface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative bg-blue-950/90 border border-blue-500/20 
              backdrop-blur-xl rounded-2xl max-w-lg w-full overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-blue-500/20 flex justify-between items-center">
                <span className="text-blue-200 font-medium">Assistant Vocal</span>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-blue-900/50 transition-colors"
                >
                  <X className="w-5 h-5 text-blue-400" />
                </button>
              </div>

              {/* Voice Interface */}
              <div className="p-8 flex flex-col items-center justify-center space-y-6">
                {/* Recording Animation */}
                <div className="relative">
                  <motion.div
                    animate={isRecording ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"
                  />
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`relative z-10 p-6 rounded-full transition-all duration-300 ${
                      isRecording 
                        ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isRecording ? (
                      <StopCircle className="w-8 h-8" />
                    ) : (
                      <Mic className="w-8 h-8" />
                    )}
                  </button>
                </div>

                {/* Voice Waves Animation */}
                {isRecording && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-1"
                  >
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: [15, 30, 15],
                        }}
                        transition={{
                          duration: 0.5 + Math.random() * 0.3,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                        className="w-1 bg-blue-400 rounded-full"
                      />
                    ))}
                  </motion.div>
                )}

                {/* Transcription */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="text-sm text-blue-200/80">
                    {isRecording ? transcription : "Appuyez sur le micro pour parler"}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 