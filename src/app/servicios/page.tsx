'use client'

import { Navbar } from "@/features/web/landing/components/Navbar";
import { ServicesSection } from "@/features/web/landing/components/ServicesSection";
import { PortfolioSection } from "@/features/web/landing/components/PortfolioSection";
import { VRExperienceSection } from "@/features/web/landing/components/VRExperienceSection";
import { Footer } from "@/features/web/landing/components/Footer";
import { WhatsAppButton } from "@/features/web/landing/components/WhatsAppButton";

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-background elite-landing">
      <Navbar />
      <main className="pt-20">
        <ServicesSection />
        <VRExperienceSection />
        <PortfolioSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
