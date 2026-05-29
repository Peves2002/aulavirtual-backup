'use client'

import { motion, AnimatePresence } from "framer-motion"

import { ShoppingCart } from "lucide-react"

import { useCart } from "../context/CartContext"

export function FloatingCartButton() {
  const { itemCount, setIsCartDrawerOpen } = useCart();

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.button
          onClick={() => setIsCartDrawerOpen(true)}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-accent hover:bg-[#c96d32] text-white px-5 py-4 rounded-full shadow-lg glow-orange hover:shadow-xl transition-all group cursor-pointer"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-3 -right-3 w-5 h-5 bg-white text-accent text-[10px] font-black rounded-full flex items-center justify-center border-2 border-accent shadow-sm">
              {itemCount}
            </span>
          </div>
          <span className="hidden sm:inline font-bold text-sm pr-1">
            Ver mi carrito
          </span>

          {/* Pulse effect */}
          <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping opacity-75" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
