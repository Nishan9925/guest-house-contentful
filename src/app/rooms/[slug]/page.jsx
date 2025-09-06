import RoomsRepository from '@/app/lib/Rooms';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import RoomGallery from '@/components/rooms/Gallery';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const dynamicParams = true;

export default async function RoomPage({ params }) {
    const slug = params?.slug;
    
    try {
        const room = await RoomsRepository.getInstance().getBySlug(slug, {}, false);

        if (!room) {
            notFound();
        }

        const fields = room.fields || {};
        const title = fields.name || 'Room';
        const bedType = fields.bedType;
        const category = fields.category;
        const sizeSqft = fields.sizeSqft;
        const floorNumber = fields.floorNumber;
        const smokingAllowed = fields.smokingAllowed;
        const description = fields.description || fields.roomDescription || fields.longDescription;
        const images = Array.isArray(fields.images) ? fields.images : [];

        // Prepare images for masonry gallery
        const galleryImages = images.map(img => ({
            url: `https:${img.fields.file.url}`,
            alt: img.fields.title || title,
            id: img.sys.id
        }));

        // Split images into 4 columns for masonry layout
        const getColumnImages = (columnIndex, totalColumns) => {
            return galleryImages.filter((_, index) => index % totalColumns === columnIndex);
        };

        return (
            <section className="w-full max-w-[1200px] mx-auto md:py-20 py-10 px-4">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white">{title}</h1>
                    {/* <div className="flex flex-wrap gap-4 mb-6">
                        {bedType && (
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                {bedType}
                            </span>
                        )}
                        {category && (
                            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                                {category}
                            </span>
                        )}
                        {sizeSqft && (
                            <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                                {sizeSqft} sq ft
                            </span>
                        )}
                        {floorNumber && (
                            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                                Floor {floorNumber}
                            </span>
                        )}
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                            smokingAllowed 
                                ? "bg-red-100 text-red-800" 
                                : "bg-gray-100 text-gray-800"
                        }`}>
                            {smokingAllowed ? "Smoking Allowed" : "Non-Smoking"}
                        </span>
                    </div> */}
                </div>

                {/* Gallery */}
                {galleryImages.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-white">Room Gallery</h2>
                        <RoomGallery images={galleryImages} />
                    </div>
                )}

                {/* Room Description */}
                {description && (
                    <div className="prose prose-invert max-w-none">
                        <h2 className="text-xl font-semibold mb-4 text-white">Room Description</h2>
                        <div className="text-gray-300">
                            {description.nodeType
                                ? documentToReactComponents(description)
                                : description}
                        </div>
                    </div>
                )}
            </section>
        );
    } catch (error) {
        console.error("Error fetching room:", error);
        notFound();
    }
}