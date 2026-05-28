import React from 'react'

import { Navbar } from "@/features/web/landing/components/Navbar";
import { Footer } from "@/features/web/landing/components/Footer";
import { WhatsAppButton } from "@/features/web/landing/components/WhatsAppButton";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background elite-landing flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 bg-white">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
