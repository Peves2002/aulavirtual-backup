'use client'

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/51955833613"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-primary hover:bg-accent text-white px-5 py-4 rounded-full shadow-lg glow-orange-strong hover:shadow-xl transition-all group"
    >
      <motion.div
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.div>
      <span className="hidden sm:inline font-bold text-sm pr-1">
        ¡Chatea con nosotros!
      </span>

      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping opacity-75" />
    </motion.a>
  );
}