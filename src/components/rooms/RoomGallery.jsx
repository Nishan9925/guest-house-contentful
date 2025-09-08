'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CloseIcon, NextArrowIcon, PrevArrowIcon } from '../Icons';
import Masonry from 'react-masonry-css';

function RoomGallery({ images = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileImageLoaded, setMobileImageLoaded] = useState(false);
  const [modalImageLoaded, setModalImageLoaded] = useState(false);

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

  // Swipe handling (mobile)
  const startX = useRef(0);
  const startY = useRef(0);
  const moved = useRef(false);
  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    moved.current = false;
  };
  const handleTouchMove = () => {
    moved.current = true;
  };
  const handleTouchEnd = (e) => {
    if (!moved.current || !e.changedTouches || e.changedTouches.length === 0) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    const dy = e.changedTouches[0].clientY - startY.current;
    const horizontalThreshold = 40;
    const verticalAllowance = 80;
    if (Math.abs(dx) > horizontalThreshold && Math.abs(dy) < verticalAllowance) {
      if (dx < 0) {
        showNext();
      } else {
        showPrev();
      }
    }
  };

  useEffect(() => {
    setMobileImageLoaded(false);
    setModalImageLoaded(false);
  }, [currentIndex]);

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
      {/* Mobile carousel below md */}
      {images.length > 0 && (
        <div
          className="relative md:hidden w-full h-64 rounded-lg overflow-hidden mb-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            key={`mobile-${images[currentIndex].url}`}
            src={images[currentIndex].url}
            alt={images[currentIndex].alt || ''}
            fill
            className="object-cover"
            onLoadingComplete={() => setMobileImageLoaded(true)}
            priority
          />
          <button
            type="button"
            onClick={showPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 rounded-full p-2"
          >
            <PrevArrowIcon />
          </button>
          <button
            type="button"
            onClick={showNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 rounded-full p-2"
          >
            <NextArrowIcon />
          </button>
          <div className="absolute bottom-2 right-2 z-10 bg-black/60 text-white text-sm px-2 py-1 rounded">
            {currentIndex + 1}/{images.length}
          </div>
        </div>
      )}

      <div className="hidden md:block md:max-h-[70vh] md:max-w-[1100px] md:overflow-y-auto md:overflow-x-hidden md:mx-auto md:snap-y md:snap-mandatory">
        <Masonry
          breakpointCols={{ default: 4, 1024: 4, 768: 3 }}
          className="flex -ml-2"
          columnClassName="pl-2 space-y-2"
        >
          {images.map((image, index) => (
            <button
              key={image.id || index}
              type="button"
              onClick={() => openModal(index)}
              className="block w-full text-left snap-start"
            >
              <Image
                className="w-full h-auto rounded-lg hover:scale-[1.02] transition-transform duration-300 my-2"
                src={image.url}
                alt={image.alt || ''}
                width={400}
                height={300}
              />
            </button>
          ))}
        </Masonry>
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
            <CloseIcon />
          </button>

          <div className="h-screen w-screen flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="relative flex-1 flex items-center justify-center px-4">
              <button
                type="button"
                onClick={showPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 rounded-full p-3 hover:bg-black/70"
              >
                <PrevArrowIcon />
              </button>

              <div
                className="relative w-full h-[80vh] overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Image
                  key={`modal-${images[currentIndex].url}`}
                  src={images[currentIndex].url}
                  alt={images[currentIndex].alt || ''}
                  fill
                  className="object-contain"
                  onLoadingComplete={() => setModalImageLoaded(true)}
                  draggable={false}
                  priority
                />
              </div>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 rounded-full p-3 hover:bg-black/70"
              >
                <NextArrowIcon />
              </button>
            </div>

            <div className="w-full overflow-x-auto overflow-y-hidden px-4 pb-4">
              <div className="inline-flex min-w-max gap-2">
                {images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative h-16 w-24 shrink-0 rounded border-2 ${idx === currentIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
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


