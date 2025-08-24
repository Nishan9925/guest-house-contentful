"use client";
import Image from "next/image";

function Gallery({ data }) {
  const images = [...data, ...data];

  return (
    <section className="w-full overflow-hidden relative">
      <div className="flex gap-4 w-max animate-slide">
        {images.map((item, index) => (
          <div
            key={index}
            className="relative w-[200px] h-[200px] flex-shrink-0 rounded-lg overflow-hidden"
          >
            <Image
              src={`https:${item.fields.galleryImage.fields.file.url}`}
              alt={item.fields.galleryImage.fields.title}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
