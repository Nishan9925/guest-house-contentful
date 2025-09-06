import RoomsRepository from '@/app/lib/Rooms';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const dynamicParams = true;

export default async function RoomPage({ params }) {
    console.log("Params", params);
    const slug = params?.slug;
    console.log("Looking for slug:", slug);
    
    try {
        const room = await RoomsRepository.getInstance().getBySlug(slug, {}, false);
        console.log("Room found:", room ? "YES" : "NO");
        if (room) {
            console.log("Room fields:", Object.keys(room.fields || {}));
        }

        if (!room) {
            notFound();
        }

        const fields = room.fields || {};
        const title = fields.name || 'Room';
        const bedType = fields.bedType;
        const description = fields.description || fields.roomDescription || fields.longDescription;
        const images = Array.isArray(fields.images) ? fields.images : [];
        const primaryImage = images[0];
        const imageUrl = primaryImage?.fields?.file?.url ? `https:${primaryImage.fields.file.url}` : null;
        const imageAlt = primaryImage?.fields?.title || title;

        return (
            <section className="w-full max-w-[1100px] mx-auto md:py-20 py-10 px-4">
                <h1 className="text-2xl md:text-4xl font-bold mb-2">{title}</h1>
                {bedType && (
                    <p className="text-white/80 mb-6">{bedType}</p>
                )}
                {imageUrl && (
                    <div className="relative w-full h-[300px] md:h-[420px] rounded overflow-hidden mb-6">
                        <Image src={imageUrl} alt={imageAlt} fill className="object-cover" priority />
                    </div>
                )}
                <div className="prose prose-invert max-w-none">
                    {description
                        ? description.nodeType
                            ? documentToReactComponents(description)
                            : description
                        : null}
                </div>
            </section>
        );
    } catch (error) {
        console.error("Error fetching room:", error);
        notFound();
    }
}