'use client'

import { Navbar } from "@/features/web/landing/components/Navbar";
import { ContactSection } from "@/features/web/landing/components/ContactSection";
import { Footer } from "@/features/web/landing/components/Footer";
import { WhatsAppButton } from "@/features/web/landing/components/WhatsAppButton";

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-background elite-landing">
      <Navbar />
      <main className="pt-20">
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
