"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

function HeroCarousel({ images }) {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Initialize carousel manually without Flowbite to avoid hydration issues
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="relative w-full aspect-[21/9] h-[500px] overflow-hidden bg-gray-200">
        <div className="absolute inset-0 bg-black/50 z-30"></div>
      </div>
    );
  }
  return (
    <div className="relative w-full aspect-[21/9] h-[500px] overflow-hidden">
      <div className="relative h-[500px] overflow-hidden">
        {images.map((asset, index) => (
          <div
            key={asset.sys.id || index}
            className={`absolute inset-0 duration-700 ease-in-out transition-opacity ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={`https:${asset.fields.file.url}`}
              alt={asset.fields.title || `Hero image ${index + 1}`}
              className="absolute block w-full h-full object-cover"
              fill
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Overlay (optional) */}
      <div className="absolute inset-0 bg-black/50 z-30"></div>
    </div>
  );
}

export default HeroCarousel;
