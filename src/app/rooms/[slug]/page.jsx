import RoomsRepository from '@/app/lib/Rooms';
import AboutRepository from '@/app/lib/About';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import RoomGallery from '@/components/rooms/RoomGallery';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { MarkerIcon } from '@/components/Icons';

export const dynamicParams = true;

export default async function RoomPage({ params }) {
    const slug = params?.slug;

    try {
        const room = await RoomsRepository.getInstance().getBySlug(slug, {}, false);

        if (!room) {
            notFound();
        }

        const fields = room.fields;
        const title = fields.name;
        const bedType = fields.bedType;
        const category = fields.category;
        const sizeSqft = fields.sizeSqft;
        const floorNumber = fields.floorNumber;
        const smokingAllowed = fields.smokingAllowed;
        const description = fields.description || fields.roomDescription || fields.longDescription;
        const images = Array.isArray(fields.images) ? fields.images : [];


        const galleryImages = images.map(img => ({
            url: `https:${img.fields.file.url}`,
            alt: img.fields.title || title,
            id: img.sys.id
        }));


        const getColumnImages = (columnIndex, totalColumns) => {
            return galleryImages.filter((_, index) => index % totalColumns === columnIndex);
        };

        const aboutData = await AboutRepository.getInstance().getModels();
        const lng = aboutData?.[0]?.fields?.guestHouseLocation?.lon;
        const lat = aboutData?.[0]?.fields?.guestHouseLocation?.lat;

        return (
            <section className="w-full max-w-[1200px] mx-auto md:py-20 py-10 px-4">
                <div className='flex flex-col'>
                    <h1 className="text-2xl font-semibold mb-4 text-black">{title}</h1>
                    <MarkerIcon
                        addressTitle={"Building 4, 3rd street, 1st side street., 3612 Chʼiva, Armenia"}
                        lng={lng}
                        lat={lat}
                        fill={"black"}
                        textColor={"text-black"}
                    />
                </div>
                <div>
                    {/* Gallery */}
                    {galleryImages.length > 0 && (
                        <div className="">
                            <RoomGallery images={galleryImages} />
                        </div>
                    )}
                </div>
                <div>
                    {/* Room Description */}
                    {description && (
                        <div className="prose prose-invert max-w-none">
                            <h2 className="text-xl font-semibold mb-4 text-black">Room Description</h2>
                            <div className="text-black">
                                {description.nodeType
                                    ? documentToReactComponents(description)
                                    : description}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        );
    } catch (error) {
        console.error("Error fetching room:", error);
        notFound();
    }
}
