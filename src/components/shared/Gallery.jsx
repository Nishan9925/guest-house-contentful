"use client";
import Image from "next/image";

function Gallery({ data }) {
  // Create a proper infinite loop by repeating the data multiple times
  const images = Array.from({ length: 3 }, () => data).flat();
  
  return (
    <section className="relative w-full overflow-hidden m-auto">
      <div className="flex animate-infinite-slider w-max">
        {images.map((item, index) => {
          // Safe access to nested properties
          if (!item || !item.fields || !item.fields.galleryImage || !item.fields.galleryImage.fields || !item.fields.galleryImage.fields.file) {
            return null;
          }
          
          const imageUrl = `https:${item.fields.galleryImage.fields.file.url}`;
          const imageAlt = item.fields.galleryImage.fields.title || `Gallery image ${index + 1}`;

          return (
            <div
              key={`${item.sys.id}-${index}`}
              className="flex-shrink-0 relative lg:w-[500px] lg:h-[300px] w-[300px] h-[200px] mr-4 rounded-lg overflow-hidden"
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Gallery;
