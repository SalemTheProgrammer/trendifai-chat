"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface AddContactModalProps {
  onClose: () => void;
  onAdd: () => void;
}

export function AddContactModal({ onClose, onAdd }: AddContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([formData]);

      if (error) throw error;
      
      toast.success('Contact ajouté avec succès');
      onAdd();
      onClose();
    } catch (err) {
      toast.error('Erreur lors de l\'ajout du contact');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-blue-950/80 border border-blue-500/20 rounded-xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-blue-200">Ajouter un Contact</h3>
          <button onClick={onClose} className="text-blue-400 hover:text-blue-300">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
        </form>
      </motion.div>
    </motion.div>
  );
} 