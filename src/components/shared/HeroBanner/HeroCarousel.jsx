"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import "flowbite";

// Fix the Hydration problem and ensure Flowbite initializes properly and the gallery animation properly"

function HeroCarousel({ images }) {
  // const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // setMounted(true);
    // Flowbite auto-inits from data attributes
  }, []);
  // if(!mounted) return null;
  return (
    <div
      id="hero-carousel"
      className="relative w-full aspect-[21/9] h-[500px] overflow-hidden"
      data-carousel="slide"
      data-carousel-interval="3000"
    >
      <div className="relative h-[500px] overflow-hidden rounded-lg">
        {images.map((asset, index) => (
          <div
            key={asset.sys.id || index}
            data-carousel-item={index === 0 ? "active" : ""}
            className="hidden absolute inset-0 duration-700 ease-in-out"
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
