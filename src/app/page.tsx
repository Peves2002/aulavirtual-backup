'use client'

import { Navbar } from "@/features/web/landing/components/Navbar";
import { HeroSection } from "@/features/web/landing/components/HeroSection";
import { AboutSection } from "@/features/web/landing/components/AboutSection";
import { ServicesSection } from "@/features/web/landing/components/ServicesSection";
import { PortfolioSection } from "@/features/web/landing/components/PortfolioSection";
import { AchievementsSection } from "@/features/web/landing/components/AchievementsSection";
import { ClientFocusSection } from "@/features/web/landing/components/ClientFocusSection";
import { AulaVirtualSection } from "@/features/web/landing/components/AulaVirtualSection";
import { CertificateSection } from "@/features/web/landing/components/CertificateSection";
import { ContactSection } from "@/features/web/landing/components/ContactSection";
import { GallerySection } from "@/features/web/landing/components/GallerySection";
import { VRExperienceSection } from "@/features/web/landing/components/VRExperienceSection";
import { Footer } from "@/features/web/landing/components/Footer";
import { WhatsAppButton } from "@/features/web/landing/components/WhatsAppButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background elite-landing">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <AchievementsSection />
        <ClientFocusSection />
        <AulaVirtualSection />
        <VRExperienceSection />
        <CertificateSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
