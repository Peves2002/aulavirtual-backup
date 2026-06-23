'use client'

import { Navbar } from "@/marketing/components/site/Navbar";
import { Hero } from "@/marketing/components/site/Hero";
import { StatsBar } from "@/marketing/components/site/StatsBar";
import { Marquee } from "@/marketing/components/site/Marquee";
import { Courses } from "@/marketing/components/site/Courses";
import { Methodology } from "@/marketing/components/site/Methodology";
import { SoftwareShowcase } from "@/marketing/components/site/SoftwareShowcase";
import { WhyUs } from "@/marketing/components/site/WhyUs";
import { Testimonials } from "@/marketing/components/site/Testimonials";
import { Certification } from "@/marketing/components/site/Certification";
import { Pricing } from "@/marketing/components/site/Pricing";
import { Faq } from "@/marketing/components/site/Faq";
import { Footer } from "@/marketing/components/site/Footer";
import { FinalCTA } from "@/marketing/components/site/FinalCTA";
import { BackToTop, LoadingScreen, ScrollProgress, WhatsAppButton } from "@/marketing/components/site/Floating";

const Index = () => (
  <div className="relative bg-white">
    <LoadingScreen />
    <ScrollProgress />
    <Navbar />
    <main>
      <Hero />
      <WhyUs />
      <Courses />
      <StatsBar />
      <Marquee />
      <Methodology />
      <SoftwareShowcase />
      <Testimonials />
      <Certification />
      <Pricing />
      <Faq />
      <FinalCTA />
    </main>
    <Footer />
    <WhatsAppButton />
    <BackToTop />
  </div>
);

export default Index;
