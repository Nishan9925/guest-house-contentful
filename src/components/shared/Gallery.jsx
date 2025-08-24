"use client";
import Image from "next/image";

function Gallery({ data }) {
  const images = [...data, ...data];

  return (
    <section className="relative w-full overflow-hidden m-auto">
      <div className="flex animate-infinite-slider w-max">
        {images.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 relative lg:w-[500px] lg:h-[300px] w-[300px] h-[200px] mr-4 rounded-lg overflow-hidden"
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
