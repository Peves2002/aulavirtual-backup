'use client'

import { Navbar } from "@/features/web/landing/components/Navbar";
import { AboutSection } from "@/features/web/landing/components/AboutSection";
import { AchievementsSection } from "@/features/web/landing/components/AchievementsSection";
import { GallerySection } from "@/features/web/landing/components/GallerySection";
import { Footer } from "@/features/web/landing/components/Footer";
import { WhatsAppButton } from "@/features/web/landing/components/WhatsAppButton";

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-background elite-landing">
      <Navbar />
      <main className="pt-20">
        <AboutSection />
        <AchievementsSection />
        <GallerySection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
