import React from "react";

interface PageHeroProps {
  title: React.ReactNode;
  subtitle: string;
  imageSrc: string;
  imagePosition?: string;
}

export function PageHero({ title, subtitle, imageSrc, imagePosition = "center" }: PageHeroProps) {
  return (
    <div className="relative -mt-[5rem] pt-[9rem] pb-20 lg:pt-[11rem] lg:pb-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageSrc}
          alt="Hero Background"
          className="w-full h-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A04]/80 to-[#0A1A04]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 text-center reveal">
        <h1 className="font-display font-bold text-4xl lg:text-5xl lg:leading-[1.1] mb-6 text-white drop-shadow-lg">
          {title}
        </h1>
        <p className="text-lg lg:text-xl text-[#E8F5D0] drop-shadow-md">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
