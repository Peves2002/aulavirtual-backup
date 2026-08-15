"use client";

import React, { useState, useEffect } from "react";

export default function HeroCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <>
      {images.map((img, index) => (
        <img
          key={img}
          src={img}
          alt={`Hero Image ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          } group-hover:scale-110`}
          style={{ transitionProperty: 'opacity, transform', transitionDuration: '1000ms' }}
        />
      ))}
    </>
  );
}
