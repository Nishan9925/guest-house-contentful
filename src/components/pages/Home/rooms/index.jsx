import Link from 'next/link';
import Image from 'next/image';

function RoomsList({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section id='rooms' className="w-full flex-wrap flex justify-center items-center md:py-20 py-10 px-4 gap-4 bg-primary">
      {data.map((room) => {
        const { sys, fields } = room;
        if (!fields?.slug) return null;

        const title = fields.name;
        const img = fields.images[0].fields.file.url;
        const url = `https:${img}`;
        const alt = img?.fields?.title || title;
        const bedType = fields.bedType;
        return (
           <Link key={sys?.id} target='_blank' href={`/rooms/${fields.slug}`} className="max-w-[260px] flex flex-col gap-6">
            <div className="relative w-[260px] h-[260px]">
              {url ? (
                <Image src={url} alt={alt} fill className="object-cover rounded" priority />
              ) : (
                <div className="w-full h-full bg-gray-700 rounded" />
              )}
            </div>
            <div className="flex flex-col align-start gap-2">
              <h2 className="text-black text-lg">{title}</h2>
              <p className='text-black text-sm'>{bedType}</p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

export default RoomsList;
