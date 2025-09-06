'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

function RoomGallery({ images = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((image, index) => (
          <button
            key={image.id || index}
            type="button"
            onClick={() => openModal(index)}
            className="break-inside-avoid block w-full text-left"
          >
            <Image
              className="w-full h-auto rounded-lg hover:scale-[1.02] transition-transform duration-300"
              src={image.url}
              alt={image.alt || ''}
              width={400}
              height={300}
            />
          </button>
        ))}
      </div>

      {isOpen && images[currentIndex] && (
        <div
          className="fixed inset-0 z-[999] bg-black/90"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <button
            type="button"
            aria-label="Close gallery"
            onClick={(e) => { e.stopPropagation(); closeModal(); }}
            className="absolute top-4 right-4 z-20 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 cursor-pointer"
          >
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="h-screen w-screen flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="relative flex-1 flex items-center justify-center px-4">
              <button
                type="button"
                onClick={showPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 rounded-full p-3 hover:bg-black/70"
              >
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="relative w-full h-[80vh]">
                <Image
                  src={images[currentIndex].url}
                  alt={images[currentIndex].alt || ''}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 rounded-full p-3 hover:bg-black/70"
              >
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="w-full overflow-x-auto px-4 pb-4">
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative h-16 w-24 rounded  border-2 ${
                      idx === currentIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img.url} alt={img.alt || ''} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RoomGallery;


