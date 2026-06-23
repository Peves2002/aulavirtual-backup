'use client'

import { useEffect, type ReactNode } from "react";

import Link from "next/link"

import { motion } from "framer-motion";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BackToTop, ScrollProgress, WhatsAppButton } from "./Floating";

interface Props {
  title: string;
  children: ReactNode;
  breadcrumb: string;
}

export const SubpageLayout = ({ title, children, breadcrumb }: Props) => {
  useEffect(() => {
    document.title = title;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <ScrollProgress />
      <Navbar />
      <Breadcrumbs current={breadcrumb} />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
};

const Breadcrumbs = ({ current }: { current: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="border-b border-gc-gray-light bg-gc-gray-perla/50 backdrop-blur-sm"
  >
    <div className="gc-container-custom py-4 text-xs font-bold flex items-center gap-2 text-gc-gray-medium">
      <Link href="/" className="hover:text-gc-blue-corp transition-colors">Inicio</Link>
      <span className="text-gray-300">/</span>
      <span className="text-gc-black">{current}</span>
    </div>
  </motion.div>
);

export const SectionBadge = ({ children, color = "blue" }: { children: ReactNode; color?: "orange" | "black" | "blue" | "green" }) => {
  const map = {
    orange: "bg-gc-blue-corp/10 text-gc-blue-corp border-gc-blue-corp/20",
    black: "bg-gc-black/10 text-gc-black border-gc-black/20",
    blue: "bg-gc-blue-corp/10 text-gc-blue-corp border-gc-blue-corp/20",
    green: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  };

  
return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase ${map[color as keyof typeof map]}`}>
      {children}
    </span>
  );
};

export const HexBg = () => (
  <div className="absolute inset-0 gc-bg-grid-pattern opacity-100 pointer-events-none" />
);
